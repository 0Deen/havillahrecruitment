import type { ApplicationInput } from "./applications";
import { COMPANY, SITE_URL } from "./site";

function esc(v?: string | boolean) {
  if (v === undefined || v === "" || v === false) return "—";
  if (v === true) return "Yes";
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const row = (k: string, v?: string | boolean) =>
  `<tr><td style="padding:7px 12px;font-size:12px;color:#6B7280;width:38%;vertical-align:top;border-bottom:1px solid #F1EDF8;">${k}</td><td style="padding:7px 12px;font-size:13px;color:#111827;font-weight:600;border-bottom:1px solid #F1EDF8;">${esc(v)}</td></tr>`;

const section = (title: string, rows: string) =>
  `<div style="margin-top:18px;"><div style="font-size:11px;letter-spacing:1.5px;color:#4B1E8C;font-weight:700;padding:0 12px 6px;">${title}</div><table style="width:100%;border-collapse:collapse;">${rows}</table></div>`;

const shell = (inner: string) => `
<div style="font-family:-apple-system,Inter,Arial,sans-serif;background:#F3F0FA;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E9E3F7;">${inner}</div>
</div>`;

const header = (eyebrow: string, title: string, ref?: string) => `
<div style="background:linear-gradient(135deg,#4B1E8C,#3A1568);padding:24px 28px;">
  <div style="color:#F5A623;font-size:12px;letter-spacing:2px;font-weight:700;">AJIRA MAJUU</div>
  <div style="color:#fff;font-size:20px;font-weight:700;margin-top:4px;">${title}</div>
  <div style="color:#D9CCF0;font-size:12px;margin-top:2px;">${eyebrow}</div>
  ${ref ? `<div style="color:#FBC55A;font-size:14px;font-weight:700;margin-top:10px;letter-spacing:.5px;">Reference: ${esc(ref)}</div>` : ""}
</div>`;

export function buildApplicationTeamEmail(a: ApplicationInput, reference: string, documentNames: string[], submittedAt: string): string {
  const waDigits = (a.whatsapp || a.phone).replace(/[^\d]/g, "");
  return shell(`
  ${header("Website application · no account", "NEW APPLICATION RECEIVED", reference)}
  <div style="padding:20px 16px 24px;">
    ${section("SUMMARY",
      row("Application reference", reference) + row("Candidate", a.fullName) + row("Phone", a.phone) + row("WhatsApp", a.whatsapp || a.phone) +
      row("Email", a.email) + row("Destination", a.preferredCountry) + row("Position", a.preferredJob) + row("Experience", a.yearsExperience) + row("Application date", submittedAt))}
    <div style="padding:14px 12px 0;"><a href="https://wa.me/${waDigits}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:999px;">Reply on WhatsApp</a></div>
    ${section("PERSONAL", row("Date of birth", a.dateOfBirth) + row("Gender", a.gender) + row("County", a.county) + row("Town / City", a.town) + row("Nationality", a.nationality))}
    ${section("JOB PREFERENCE", row("Alternative job", a.alternativeJob) + row("Category", a.employmentCategory) + row("Current occupation", a.currentOccupation))}
    ${section("EMPLOYMENT QUESTIONS", row("Currently employed", a.currentlyEmployed) + row("Willing to relocate", a.willingToRelocate) + row("Available for interviews", a.availableForInterview) + row("Overseas work experience", a.overseasExperience) + row("Willing to complete medical checks", a.willingMedical) + row("Willing to complete training", a.willingTraining) + row("Preferred start", a.startDate))}
    ${section("EXPERIENCE", row("Previous job title", a.previousJobTitle) + row("Employer", a.previousEmployer) + row("Responsibilities", a.responsibilities) + row("Skills", a.skills) + row("Languages", a.languages) + row("Education", a.education) + row("Certificates", a.certificates))}
    ${section("DOCUMENTATION", row("Passport status", a.passportStatus) + row("Passport number", a.passportNumber) + row("Passport expiry", a.passportExpiry) + row("Can obtain passport", a.canObtainPassport) + row("Attached files", documentNames.join(", ")))}
    ${section("EMERGENCY CONTACT", row("Name", a.emergencyName) + row("Relationship", a.emergencyRelationship) + row("Phone", a.emergencyPhone))}
    ${section("CONSENT", row("Confirmed accuracy", a.consentAccuracy) + row("Agreed to privacy notice", a.consentPrivacy))}
    <p style="padding:16px 12px 0;font-size:11px;color:#9CA3AF;">Contains personal data. Handle per the privacy policy; do not forward outside the recruitment team.</p>
  </div>`);
}

export function buildApplicationCandidateEmail(a: ApplicationInput, reference: string): string {
  return shell(`
  ${header(COMPANY.legalDescriptor, "Your application has been received", reference)}
  <div style="padding:24px 28px;font-size:14px;color:#111827;line-height:1.6;">
    <p>Hello ${esc(a.fullName.split(" ")[0])},</p>
    <p>Thank you for applying with ${COMPANY.name}. Your application has been successfully received. Our recruitment team will review your information and contact you using the details you provided.</p>
    <table style="width:100%;border-collapse:collapse;margin:14px 0;">
      ${row("Reference number", reference)}${row("Selected job", a.preferredJob)}${row("Destination", a.preferredCountry)}
    </table>
    <p><strong>What happens next</strong><br/>1. Our team reviews your application.<br/>2. We contact you by phone or WhatsApp.<br/>3. If your profile fits a current opportunity we guide you through the next steps.</p>
    <p>Submitting an application does not guarantee employment. Please quote your reference number whenever you contact us.</p>
    <p style="margin-top:18px;"><a href="https://wa.me/${COMPANY.whatsappNumber}" style="background:#4B1E8C;color:#fff;text-decoration:none;font-weight:700;padding:10px 18px;border-radius:999px;font-size:13px;">WhatsApp ${COMPANY.phoneDisplay}</a></p>
    <p style="font-size:12px;color:#6B7280;margin-top:18px;">Official email: ${COMPANY.primaryEmail} · Website: <a href="${SITE_URL}" style="color:#4B1E8C;">${COMPANY.website}</a><br/>${COMPANY.name} is a ${COMPANY.legalDescriptor.toLowerCase()}. We will never ask you to send money through an unofficial individual — if in doubt, verify with us first.</p>
  </div>`);
}

export interface EmployerRequestInput {
  company: string; contactPerson: string; phone: string; email: string; country: string; jobCategory: string;
  workers: string; experience: string; startDate: string; accommodation: string; food: string; salary: string; notes: string;
}

export function buildEmployerEmail(r: EmployerRequestInput, reference: string, submittedAt: string): string {
  return shell(`
  ${header("For employers", "NEW EMPLOYER REQUEST", reference)}
  <div style="padding:20px 16px 24px;">
  ${section("EMPLOYER", row("Company", r.company) + row("Contact person", r.contactPerson) + row("Phone", r.phone) + row("Email", r.email) + row("Submitted", submittedAt))}
  ${section("REQUIREMENT", row("Country", r.country) + row("Job category", r.jobCategory) + row("Number of workers", r.workers) + row("Required experience", r.experience) + row("Desired start date", r.startDate) + row("Accommodation", r.accommodation) + row("Food", r.food) + row("Salary offered", r.salary) + row("Other requirements", r.notes))}
  </div>`);
}

export function buildEmployerConfirmationEmail(r: EmployerRequestInput, reference: string): string {
  return shell(`
  ${header(COMPANY.legalDescriptor, "Request received", reference)}
  <div style="padding:24px 28px;font-size:14px;color:#111827;line-height:1.6;">
    <p>Hello ${esc(r.contactPerson)},</p>
    <p>Thank you for contacting ${COMPANY.name}. We have received your recruitment request for ${esc(r.company)} and a member of our team will be in touch. Candidate availability is confirmed case by case — this request does not itself guarantee availability.</p>
    <p>Reference: <strong>${esc(reference)}</strong><br/>Contact: ${COMPANY.primaryEmail} · ${COMPANY.phoneDisplay}</p>
  </div>`);
}
