import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/* ---------------------------------------------------------------------
   POST /api/apply
   Handles FOUR form types from the same endpoint, told apart by `formType`:

     1) formType: "application" (or omitted, for backwards compatibility
        with the existing Apply Now form)
        { fullName, phone, email, role }

     2) formType: "medical"
        { fullName, phone, email?, testType, date, time, notes? }

     3) formType: "contact"
        { fullName, email, message, reason? }

     4) formType: "track"
        { fullName, idNumber }

   Each of the first three now does TWO things:
     - emails YOU (DESTINATION_EMAIL) with the submission details
     - emails the APPLICANT a short confirmation that it was received

   "track" only has an ID number, no applicant email to confirm to, so it
   still just notifies you.

   SETUP REQUIRED in Vercel → Project → Settings → Environment Variables:
     RESEND_API_KEY=your_resend_api_key
--------------------------------------------------------------------- */

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINATION_EMAIL = "nicks@nicksrecruitmentagency.com";
const FROM_EMAIL = "noreply@nicksrecruitmentagency.com"; // now on your verified domain

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formType = body?.formType ?? "application";

    if (formType === "medical") {
      return await handleMedicalBooking(body);
    }

    if (formType === "contact") {
      return await handleContact(body);
    }

    if (formType === "track") {
      return await handleTrackingRequest(body);
    }

    return await handleApplication(body);
  } catch (err) {
    console.error("Form email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------------------
   Job application
----------------------------------------------------------------------- */
async function handleApplication(body: any) {
  const { fullName, phone, email, role } = body;

  if (!fullName || !phone || !email || !role) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 1) Notify you
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: DESTINATION_EMAIL,
    replyTo: email,
    subject: `New application: ${fullName} — ${role}`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #111;">
        <h2 style="margin-bottom: 4px;">New candidate application</h2>
        <p style="color: #555; margin-top: 0;">Submitted via the Apply Now page</p>
        <table style="border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Full name</td><td style="padding: 6px 0;">${fullName}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Phone</td><td style="padding: 6px 0;">${phone}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Email</td><td style="padding: 6px 0;">${email}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Role</td><td style="padding: 6px 0;">${role}</td></tr>
        </table>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send application email" },
      { status: 500 }
    );
  }

  // 2) Confirm to the applicant (best-effort — don't fail the request if this errors)
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `We've received your application — ${role}`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #111;">
        <p>Hi ${fullName},</p>
        <p>Thanks for applying for the <strong>${role}</strong> role. Your application has been received and our team is reviewing it. We'll be in touch if there's a match.</p>
        <p>Nick's Recruitment Agency<br/>Where Ambition Meets Opportunity.</p>
      </div>
    `,
  }).catch((e) => console.error("Applicant confirmation failed:", e));

  return NextResponse.json({ success: true });
}

/* -----------------------------------------------------------------------
   Medical booking
----------------------------------------------------------------------- */
async function handleMedicalBooking(body: any) {
  const { fullName, phone, email, testType, date, time, notes } = body;

  if (!fullName || !phone || !testType || !date || !time) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: DESTINATION_EMAIL,
    replyTo: email || undefined,
    subject: `New medical booking: ${fullName} — ${testType}`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #111;">
        <h2 style="margin-bottom: 4px;">New medical booking</h2>
        <p style="color: #555; margin-top: 0;">Submitted via the medical screening booking flow</p>
        <table style="border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Full name</td><td style="padding: 6px 0;">${fullName}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Phone</td><td style="padding: 6px 0;">${phone}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Email</td><td style="padding: 6px 0;">${email || "—"}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Test / screening</td><td style="padding: 6px 0;">${testType}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Date</td><td style="padding: 6px 0;">${date}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Time</td><td style="padding: 6px 0;">${time}</td></tr>
          ${notes ? `<tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Notes</td><td style="padding: 6px 0;">${notes}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send booking email" },
      { status: 500 }
    );
  }

  if (email) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Booking received — ${testType}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #111;">
          <p>Hi ${fullName},</p>
          <p>Your booking for <strong>${testType}</strong> on ${date} at ${time} has been received. We'll confirm shortly.</p>
          <p>Nick's Recruitment Agency</p>
        </div>
      `,
    }).catch((e) => console.error("Applicant confirmation failed:", e));
  }

  return NextResponse.json({ success: true });
}

/* -----------------------------------------------------------------------
   Contact form
----------------------------------------------------------------------- */
async function handleContact(body: any) {
  const { fullName, email, message, reason } = body;

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: DESTINATION_EMAIL,
    replyTo: email,
    subject: `New contact message: ${fullName}${reason ? ` — ${reason}` : ""}`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #111;">
        <h2 style="margin-bottom: 4px;">New contact message</h2>
        <p style="color: #555; margin-top: 0;">Submitted via the Contact Us page</p>
        <table style="border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Full name</td><td style="padding: 6px 0;">${fullName}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Email</td><td style="padding: 6px 0;">${email}</td></tr>
          ${reason ? `<tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Reason</td><td style="padding: 6px 0;">${reason}</td></tr>` : ""}
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 6px 0;">${message}</td></tr>
        </table>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send contact email" },
      { status: 500 }
    );
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `We've received your message`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #111;">
        <p>Hi ${fullName},</p>
        <p>Thanks for reaching out — we've received your message and someone from our team will get back to you shortly.</p>
        <p>Nick's Recruitment Agency</p>
      </div>
    `,
  }).catch((e) => console.error("Applicant confirmation failed:", e));

  return NextResponse.json({ success: true });
}

/* -----------------------------------------------------------------------
   Tracking request — no applicant email collected, so this still only
   notifies you.
----------------------------------------------------------------------- */
async function handleTrackingRequest(body: any) {
  const { fullName, idNumber } = body;

  if (!fullName || !idNumber) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: DESTINATION_EMAIL,
    subject: `Tracking request: ${fullName} (ID: ${idNumber})`,
    html: `
      <div style="font-family: sans-serif; font-size: 15px; color: #111;">
        <h2 style="margin-bottom: 4px;">New tracking request</h2>
        <p style="color: #555; margin-top: 0;">Someone wants their application status confirmed — submitted via the Track Application page</p>
        <table style="border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Full name</td><td style="padding: 6px 0;">${fullName}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">ID number</td><td style="padding: 6px 0;">${idNumber}</td></tr>
        </table>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send tracking request email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
