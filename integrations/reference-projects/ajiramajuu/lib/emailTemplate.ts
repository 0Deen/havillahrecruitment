import { LeadData } from "./types";

function esc(v?: string) {
  if (!v) return "—";
  return v.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const priorityColors: Record<string, string> = {
  HIGH: "#DC2626",
  MEDIUM: "#F5A623",
  LOW: "#6B7280",
  SUPPORT: "#2563EB",
  EMPLOYER: "#059669",
  GENERAL: "#6B7280",
};

export function buildLeadEmailHtml(lead: LeadData): string {
  const color = priorityColors[lead.intent] ?? "#6B7280";
  const transcriptRows = lead.transcript
    .map(
      (m) => `
      <tr>
        <td style="padding:6px 10px;font-size:12px;color:${
          m.role === "user" ? "#4B1E8C" : "#374151"
        };font-weight:${m.role === "user" ? "700" : "400"};vertical-align:top;width:70px;">
          ${m.role === "user" ? "Visitor" : "Assistant"}
        </td>
        <td style="padding:6px 10px;font-size:13px;color:#111827;">${esc(m.content)}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family: -apple-system, Inter, Arial, sans-serif; background:#F3F0FA; padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E9E3F7;">
      <div style="background:linear-gradient(135deg,#4B1E8C,#3A1568);padding:24px 28px;">
        <div style="color:#F5A623;font-size:12px;letter-spacing:2px;font-weight:700;">AJIRA MAJUU</div>
        <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:4px;">New Applicant Lead</div>
        ${lead.reference ? `<div style="color:#FBC55A;font-size:13px;font-weight:700;margin-top:4px;letter-spacing:0.5px;">Reference: ${esc(lead.reference)}</div>` : ""}
        <div style="margin-top:12px;">
          <span style="display:inline-block;background:${color};color:#fff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">
            ${lead.intent} PRIORITY · SCORE ${lead.leadScore}
          </span>
        </div>
      </div>

      <div style="padding:24px 28px;">
        <h3 style="margin:0 0 10px 0;color:#4B1E8C;font-size:15px;">Applicant Information</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;width:140px;">Name</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.name)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Phone</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.phone)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Email</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.email)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Preferred Country</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.preferredCountry)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Preferred Job</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.preferredJob)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Experience</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.experience)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Passport</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.passportStatus)}</td></tr>
          <tr><td style="padding:4px 0;color:#6B7280;font-size:13px;">Language</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${esc(lead.language)}</td></tr>
        </table>

        <h3 style="margin:0 0 8px 0;color:#4B1E8C;font-size:15px;">Conversation Summary</h3>
        <p style="font-size:13px;color:#111827;line-height:1.5;background:#F9F7FE;padding:12px 14px;border-radius:10px;border:1px solid #E9E3F7;">
          ${esc(lead.summary)}
        </p>

        <h3 style="margin:20px 0 8px 0;color:#4B1E8C;font-size:15px;">Conversation Transcript</h3>
        <table style="width:100%;border-collapse:collapse;background:#FAFAFA;border-radius:10px;overflow:hidden;">
          ${transcriptRows}
        </table>

        <div style="margin-top:24px;text-align:center;">
          <a href="tel:${esc(lead.phone)}" style="display:inline-block;background:#4B1E8C;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:700;">
            Call Applicant
          </a>
        </div>

        <div style="margin-top:16px;color:#9CA3AF;font-size:11px;text-align:center;">
          Session ${esc(lead.sessionId)} · ${esc(lead.timestamp)}
        </div>
      </div>
    </div>
  </div>`;
}

/** Candidate-facing confirmation email — kept short, warm, and honest about next steps. */
export function buildCandidateConfirmationHtml(lead: LeadData): string {
  return `
  <div style="font-family: -apple-system, Inter, Arial, sans-serif; background:#F3F0FA; padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E9E3F7;">
      <div style="background:linear-gradient(135deg,#4B1E8C,#3A1568);padding:24px 28px;">
        <div style="color:#F5A623;font-size:12px;letter-spacing:2px;font-weight:700;">AJIRA MAJUU</div>
        <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:4px;">Application Received</div>
      </div>
      <div style="padding:24px 28px;">
        <p style="font-size:14px;color:#111827;line-height:1.6;">
          Hi ${esc(lead.name)},
        </p>
        <p style="font-size:14px;color:#111827;line-height:1.6;">
          Thank you for applying with Ajira Majuu. Your application has been successfully received.
        </p>
        <div style="background:#F6F1EA;border-radius:12px;padding:14px 18px;margin:16px 0;">
          <div style="font-size:12px;color:#6B6058;">Reference number</div>
          <div style="font-size:16px;font-weight:700;color:#2B1B10;">${esc(lead.reference)}</div>
          ${lead.preferredCountry ? `<div style="font-size:12px;color:#6B6058;margin-top:8px;">Destination</div><div style="font-size:14px;font-weight:600;color:#2B1B10;">${esc(lead.preferredCountry)}</div>` : ""}
          ${lead.preferredJob ? `<div style="font-size:12px;color:#6B6058;margin-top:8px;">Opportunity</div><div style="font-size:14px;font-weight:600;color:#2B1B10;">${esc(lead.preferredJob)}</div>` : ""}
        </div>
        <p style="font-size:14px;color:#111827;line-height:1.6;">
          Our recruitment team will review your information and contact you using the details you provided.
          Keep your reference number — it's the quickest way for our team to find your application if you
          reach out in the meantime.
        </p>
        <div style="margin-top:20px;">
          <a href="https://wa.me/254115614253" style="display:inline-block;background:#4B1E8C;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:700;margin-right:8px;">
            Chat on WhatsApp
          </a>
          <a href="mailto:ajiramajuuh@gmail.com" style="display:inline-block;background:#F5A623;color:#2B1B10;padding:10px 20px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:700;">
            Email Us
          </a>
        </div>
        <p style="font-size:12px;color:#9CA3AF;margin-top:20px;">
          Submitting this application does not guarantee employment. Ajira Majuu — Twiga Towers, Murang'a Road, Nairobi.
        </p>
      </div>
    </div>
  </div>`;
}
