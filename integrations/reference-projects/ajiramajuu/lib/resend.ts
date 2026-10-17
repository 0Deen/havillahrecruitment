import { Resend } from "resend";
import { LeadData } from "./types";
import { notificationRecipients, RESEND_FROM_EMAIL } from "./emailConfig";
import { buildLeadEmailHtml, buildCandidateConfirmationHtml } from "./emailTemplate";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured on the server.");
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

/**
 * Sends a lead notification email to the Ajira Majuu recruitment team.
 * Failures are caught and logged server-side; they never bubble up to the chat UI.
 */
export async function notifyAjiraMajuuLead(lead: LeadData): Promise<boolean> {
  try {
    const to = notificationRecipients();
    const from = RESEND_FROM_EMAIL;

    const client = getResendClient();
    const subjectPriority = lead.intent === "HIGH" ? "🔴 HIGH" : lead.intent;

    const { data, error } = await client.emails.send({
      from,
      to,
      subject: `New Ajira Majuu Lead (${subjectPriority}) — ${lead.name ?? "Unnamed visitor"}`,
      html: buildLeadEmailHtml(lead),
    });

    if (error) {
      // Resend's SDK returns errors in this `error` object rather than
      // throwing — logging the full thing (not just a generic message) is
      // what actually tells you *why* a send failed: an unverified `from`
      // domain, an invalid recipient, a suspended API key, etc.
      console.error("[resend] Send rejected by Resend:", JSON.stringify(error));
      return false;
    }

    console.log(`[resend] Lead email sent (id: ${data?.id}) to ${to.join(", ")}`);
    return true;
  } catch (err) {
    console.error("[resend] Failed to send lead notification:", err);
    return false;
  }
}

/**
 * Sends a confirmation email to the candidate themselves, when they
 * supplied an email address. Best-effort, like the team notification —
 * failing to send this never blocks the visitor's success screen.
 */
export async function notifyCandidateConfirmation(lead: LeadData): Promise<boolean> {
  try {
    if (!lead.email) return false;

    const from = RESEND_FROM_EMAIL;

    const client = getResendClient();
    const { data, error } = await client.emails.send({
      from,
      to: [lead.email],
      subject: "Your Ajira Majuu application has been received",
      html: buildCandidateConfirmationHtml(lead),
    });

    if (error) {
      console.error("[resend] Candidate confirmation rejected by Resend:", JSON.stringify(error));
      return false;
    }

    console.log(`[resend] Candidate confirmation sent (id: ${data?.id}) to ${lead.email}`);
    return true;
  } catch (err) {
    console.error("[resend] Failed to send candidate confirmation:", err);
    return false;
  }
}

/* ------------------------------------------------------------------ *
 * Application + employer emails (added; the lead/chat emails above are
 * unchanged). Same env vars: RESEND_API_KEY, RESEND_FROM_EMAIL,
 * AJIRA_MAJUU_NOTIFICATION_EMAIL. Keys stay server-side.
 * ------------------------------------------------------------------ */
import {
  buildApplicationTeamEmail,
  buildApplicationCandidateEmail,
  buildEmployerEmail,
  buildEmployerConfirmationEmail,
  type EmployerRequestInput,
} from "./applicationEmail";
import type { ApplicationInput } from "./applications";

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

function teamRecipients(): string[] {
  return notificationRecipients();
}

export async function sendApplicationEmails(opts: {
  application: ApplicationInput;
  reference: string;
  documentNames: string[];
  attachments: EmailAttachment[];
}): Promise<{ team: boolean; candidate: boolean }> {
  const from = RESEND_FROM_EMAIL;
  const to = teamRecipients();
  const submittedAt = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" });
  const result = { team: false, candidate: false };
  if (!from || to.length === 0 || !process.env.RESEND_API_KEY) {
    console.error("[resend] Application email skipped — missing RESEND_API_KEY, RESEND_FROM_EMAIL or AJIRA_MAJUU_NOTIFICATION_EMAIL.");
    return result;
  }
  const client = getResendClient();
  const { application: a, reference } = opts;

  try {
    const { error } = await client.emails.send({
      from,
      to,
      replyTo: a.email || undefined,
      subject: `NEW APPLICATION RECEIVED — ${reference} — ${a.fullName} (${a.preferredCountry}, ${a.preferredJob})`,
      html: buildApplicationTeamEmail(a, reference, opts.documentNames, submittedAt),
      attachments: opts.attachments,
    });
    if (error) console.error("[resend] Team application email rejected:", JSON.stringify(error));
    else result.team = true;
  } catch (err) {
    console.error("[resend] Team application email failed:", err);
  }

  if (a.email) {
    try {
      const { error } = await client.emails.send({
        from,
        to: [a.email],
        subject: "Your Ajira Majuu application has been received",
        html: buildApplicationCandidateEmail(a, reference),
      });
      if (error) console.error("[resend] Candidate confirmation rejected:", JSON.stringify(error));
      else result.candidate = true;
    } catch (err) {
      console.error("[resend] Candidate confirmation failed:", err);
    }
  }
  return result;
}

export async function sendEmployerEmails(r: EmployerRequestInput, reference: string): Promise<{ team: boolean; employer: boolean }> {
  const from = RESEND_FROM_EMAIL;
  const to = teamRecipients();
  const result = { team: false, employer: false };
  if (!from || to.length === 0 || !process.env.RESEND_API_KEY) {
    console.error("[resend] Employer email skipped — missing env vars.");
    return result;
  }
  const client = getResendClient();
  const submittedAt = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" });
  try {
    const { error } = await client.emails.send({
      from, to, replyTo: r.email || undefined,
      subject: `NEW EMPLOYER REQUEST — ${reference} — ${r.company}`,
      html: buildEmployerEmail(r, reference, submittedAt),
    });
    if (error) console.error("[resend] Employer team email rejected:", JSON.stringify(error));
    else result.team = true;
  } catch (err) {
    console.error("[resend] Employer team email failed:", err);
  }
  if (r.email) {
    try {
      const { error } = await client.emails.send({
        from, to: [r.email],
        subject: "Ajira Majuu has received your recruitment request",
        html: buildEmployerConfirmationEmail(r, reference),
      });
      if (!error) result.employer = true;
    } catch (err) {
      console.error("[resend] Employer confirmation failed:", err);
    }
  }
  return result;
}
