import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/* ---------------------------------------------------------------------
   POST /api/inbound
   Fires whenever someone emails <anything>@in.nicksrecruitmentagency.com
   (Resend sends an `email.received` webhook event here).

   Does two things:
     1) Forwards a copy of the email to your real inbox (DESTINATION_EMAIL)
     2) Auto-replies to whoever sent it, confirming receipt

   SETUP REQUIRED:
     - RESEND_API_KEY env var in Vercel (same one used by /api/apply)
     - Webhook registered in Resend → Webhooks → Add Webhook
         URL: https://nicksrecruitmentagency.com/api/inbound
         Event: email.received (only)
--------------------------------------------------------------------- */

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINATION_EMAIL = "nicks@nicksrecruitmentagency.com";
const FROM_EMAIL = "noreply@nicksrecruitmentagency.com";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    if (event.type !== "email.received") {
      // Ignore anything else (shouldn't happen since we only subscribed
      // to email.received, but harmless if it does)
      return NextResponse.json({});
    }

    const { email_id, from, subject, to } = event.data;

    // The webhook payload only has metadata — fetch the actual body/attachments
    const fullEmail = await resend.emails.get(email_id);

    // 1) Forward a copy to your real inbox
    await resend.emails.send({
      from: FROM_EMAIL,
      to: DESTINATION_EMAIL,
      replyTo: from,
      subject: `[Received] ${subject}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #111;">
          <p><strong>From:</strong> ${from}</p>
          <p><strong>To:</strong> ${to?.join(", ") || "—"}</p>
          <hr/>
          ${fullEmail.data?.html || fullEmail.data?.text || "(no body found)"}
        </div>
      `,
    });

    // 2) Auto-reply to the sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: from,
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #111;">
          <p>Hi,</p>
          <p>Thanks for reaching out — your message "<em>${subject}</em>" has been received and someone from our team will get back to you shortly.</p>
          <p>Nick's Recruitment Agency<br/>Where Ambition Meets Opportunity.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inbound email handler error:", err);
    return NextResponse.json({ error: "Failed to process inbound email" }, { status: 500 });
  }
}
