import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import {
  DOCUMENT_SLOTS,
  UPLOAD_RULES,
  generateApplicationReference,
  matchesMagicBytes,
  sanitizeApplication,
  validateApplication,
  validateFileMeta,
} from "@/lib/applications";
import { applicationStore } from "@/lib/applicationStore";
import { sendApplicationEmails, type EmailAttachment } from "@/lib/resend";
import { notifyAjiraMajuuWhatsApp, formatLeadWhatsAppMessage } from "@/lib/whatsapp";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

function clientIp(req: NextRequest) {
  return (req.headers.get("x-forwarded-for") ?? "anonymous").split(",")[0].trim();
}

export async function POST(req: NextRequest) {
  try {
    // --- abuse protection -------------------------------------------------
    if (isRateLimited(`apply:${clientIp(req)}`)) {
      return NextResponse.json({ ok: false, error: "Too many attempts. Please wait a minute and try again." }, { status: 429 });
    }
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json({ ok: false, error: "Request blocked." }, { status: 403 });
    }
    if (!(req.headers.get("content-type") ?? "").includes("multipart/form-data")) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const form = await req.formData();

    // honeypot (hidden field humans never fill) + minimum fill time (bots submit instantly)
    if (String(form.get("website") ?? "").length > 0) {
      return NextResponse.json({ ok: true, reference: "AJM-RECEIVED" }); // silently drop
    }
    const startedAt = Number(form.get("startedAt") ?? 0);
    if (startedAt && Date.now() - startedAt < 8_000) {
      return NextResponse.json({ ok: false, error: "Please take a moment to review your details, then submit again." }, { status: 400 });
    }

    // --- server-side validation (the only validation that is trusted) ------
    const raw: Record<string, unknown> = {};
    form.forEach((value, key) => {
      if (typeof value === "string") raw[key] = value;
    });
    const application = sanitizeApplication(raw);
    const errors = validateApplication(application);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors: errors }, { status: 400 });
    }

    // --- uploads: type, size, magic bytes -----------------------------------
    const attachments: EmailAttachment[] = [];
    const documentNames: string[] = [];
    let total = 0;
    for (const slot of DOCUMENT_SLOTS) {
      const file = form.get(`doc_${slot.key}`);
      if (!(file instanceof File) || file.size === 0) continue;
      const metaError = validateFileMeta(file.name, file.type, file.size);
      if (metaError) {
        return NextResponse.json({ ok: false, error: `${slot.label}: ${metaError}` }, { status: 400 });
      }
      total += file.size;
      if (total > UPLOAD_RULES.maxTotalBytes) {
        return NextResponse.json({ ok: false, error: "Your documents are too large in total (4 MB maximum)." }, { status: 400 });
      }
      const buf = Buffer.from(await file.arrayBuffer());
      if (!matchesMagicBytes(new Uint8Array(buf.subarray(0, 8)), file.type)) {
        return NextResponse.json({ ok: false, error: `${slot.label}: the file content doesn't match its type.` }, { status: 400 });
      }
      const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 80);
      const filename = `${slot.key}-${safeName}`;
      attachments.push({ filename, content: buf });
      documentNames.push(filename);
    }

    // --- record + notify ----------------------------------------------------
    const reference = generateApplicationReference(randomBytes(8));
    const now = new Date().toISOString();
    await applicationStore.save({
      applicationId: reference,
      candidate: application,
      destination: application.preferredCountry,
      job: application.preferredJob,
      status: "SUBMITTED",
      documentNames,
      createdAt: now,
      updatedAt: now,
    });

    const [emails] = await Promise.all([
      sendApplicationEmails({ application, reference, documentNames, attachments }),
      notifyAjiraMajuuWhatsApp(
        formatLeadWhatsAppMessage({
          name: application.fullName,
          phone: application.phone,
          email: application.email,
          preferredCountry: application.preferredCountry,
          preferredJob: application.preferredJob,
          summary: `New application ${reference}`,
        })
      ).catch(() => false),
    ]);

    if (!emails.team) {
      // Nothing reached the recruitment team — don't tell the candidate it worked.
      return NextResponse.json(
        { ok: false, error: "We couldn't deliver your application just now. Please try again, or message us on WhatsApp." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, reference, confirmationEmailSent: emails.candidate });
  } catch (err) {
    console.error("[api/apply] Error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again shortly." }, { status: 500 });
  }
}
