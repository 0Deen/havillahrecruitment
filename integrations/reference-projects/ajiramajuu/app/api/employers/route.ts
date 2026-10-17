import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { sendEmployerEmails } from "@/lib/resend";
import { isRateLimited } from "@/lib/rateLimit";
import { isValidPhone } from "@/lib/applications";
import type { EmployerRequestInput } from "@/lib/applicationEmail";

export const runtime = "nodejs";

const KEYS: (keyof EmployerRequestInput)[] = [
  "company", "contactPerson", "phone", "email", "country", "jobCategory", "workers",
  "experience", "startDate", "accommodation", "food", "salary", "notes",
];

export async function POST(req: NextRequest) {
  try {
    const ip = (req.headers.get("x-forwarded-for") ?? "anonymous").split(",")[0].trim();
    if (isRateLimited(`employer:${ip}`)) {
      return NextResponse.json({ ok: false, error: "Too many attempts. Please wait a minute." }, { status: 429 });
    }
    const body = (await req.json()) as Record<string, unknown>;
    if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true, reference: "EMP-RECEIVED" });

    const r = {} as EmployerRequestInput;
    for (const k of KEYS) {
      const v = body[k];
      r[k] = typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, k === "notes" ? 1500 : 160) : "";
    }
    const fieldErrors: Record<string, string> = {};
    if (r.company.length < 2) fieldErrors.company = "Enter your company or household name.";
    if (r.contactPerson.length < 2) fieldErrors.contactPerson = "Enter a contact person.";
    if (!r.phone && !r.email) fieldErrors.phone = "Provide a phone number or email.";
    if (r.phone && !isValidPhone(r.phone)) fieldErrors.phone = "Enter a valid phone number including country code.";
    if (r.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r.email)) fieldErrors.email = "Enter a valid email.";
    if (!r.country) fieldErrors.country = "Select a country.";
    if (!r.jobCategory) fieldErrors.jobCategory = "Describe the job category.";
    if (Object.keys(fieldErrors).length) {
      return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
    }

    const b = randomBytes(5);
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const reference = `EMP-${new Date().getFullYear()}-${Array.from(b as Uint8Array, (x: number) => alphabet[x % alphabet.length]).join("")}`;
    const sent = await sendEmployerEmails(r, reference);
    if (!sent.team) {
      return NextResponse.json({ ok: false, error: "We couldn't deliver your request just now. Please email or call us directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    console.error("[api/employers] Error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
