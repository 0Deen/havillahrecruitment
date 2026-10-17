/**
 * Sends a WhatsApp notification to the Ajira Majuu team using Twilio's
 * WhatsApp API.
 *
 * WHY TWILIO AND NOT JUST "WhatsApp": the floating WhatsApp button on this
 * site (wa.me links) only lets a VISITOR start a chat with you — there's no
 * way for a plain wa.me link to push a message TO you automatically. To
 * receive an automatic WhatsApp notification when someone applies or chats,
 * the server needs to send a WhatsApp message on your behalf, which requires
 * a real WhatsApp Business API account. Twilio's is the fastest to set up:
 *
 *   1. Create a free Twilio account: https://www.twilio.com/try-twilio
 *   2. In the console, open Messaging > Try it out > Send a WhatsApp message
 *      — this gives you a sandbox number and a join code.
 *   3. From the WhatsApp number you want notifications to land on
 *      (+254115614253), send the join code to the sandbox number once.
 *   4. Copy your Account SID and Auth Token from the Twilio console into
 *      TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN (set these in Vercel's
 *      environment variables, never commit them to the repo).
 *   5. Leave TWILIO_WHATSAPP_FROM as the sandbox number shown in step 2
 *      until you apply for a production WhatsApp sender.
 *
 * Until those env vars are set, this function logs what it WOULD have sent
 * and returns false — it never pretends a message went out when it didn't.
 */
export async function notifyAjiraMajuuWhatsApp(message: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.AJIRA_MAJUU_WHATSAPP_TO;

  if (!sid || !token || !from || !to) {
    console.log(
      "[whatsapp] Not configured yet — would have sent:",
      message.slice(0, 200)
    );
    return false;
  }

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ From: from, To: to, Body: message }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("[whatsapp] Twilio rejected the message:", res.status, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[whatsapp] Failed to send WhatsApp notification:", err);
    return false;
  }
}

/** Short, readable message for a new application/contact-form lead. */
export function formatLeadWhatsAppMessage(opts: {
  name?: string;
  phone?: string;
  email?: string;
  preferredCountry?: string;
  preferredJob?: string;
  summary?: string;
}): string {
  const lines = [
    "🔔 New Ajira Majuu lead",
    opts.name ? `Name: ${opts.name}` : null,
    opts.phone ? `Phone: ${opts.phone}` : null,
    opts.email ? `Email: ${opts.email}` : null,
    opts.preferredCountry ? `Country: ${opts.preferredCountry}` : null,
    opts.preferredJob ? `Job: ${opts.preferredJob}` : null,
    opts.summary ? `Message: ${opts.summary}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

/** Lightweight ping sent the moment someone starts chatting, before a full lead is captured. */
export function formatChatStartedWhatsAppMessage(firstMessage: string): string {
  return `💬 Someone just started chatting on ajiramajuu.com:\n"${firstMessage.slice(0, 180)}"`;
}

/**
 * Visitor-facing wa.me link builder — this is the OTHER direction from
 * notifyAjiraMajuuWhatsApp above: it opens the visitor's own WhatsApp app
 * so THEY message Ajira Majuu, with the message pre-filled for context.
 * Pure string building, safe to import from client components.
 */
export const AJIRA_MAJUU_WHATSAPP_NUMBER = "254115614253";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${AJIRA_MAJUU_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function destinationWhatsAppMessage(countryName: string): string {
  return `Hi Ajira Majuu, I would like to know about employment opportunities in ${countryName}.`;
}

export function jobWhatsAppMessage(jobTitle: string, countryName: string): string {
  return `Hi Ajira Majuu, I am interested in the ${jobTitle} opportunity in ${countryName}.`;
}

export function generalWhatsAppMessage(): string {
  return "Hi Ajira Majuu, I would like information about overseas employment opportunities.";
}

export function applicationFollowUpWhatsAppMessage(reference: string): string {
  return `Hi Ajira Majuu, I just submitted an application (ref: ${reference}). I'd like to follow up.`;
}

export function employerWhatsAppMessage(): string {
  return "Hi Ajira Majuu, I represent an employer and would like to discuss recruitment support.";
}

/**
 * Picks the right pre-filled WhatsApp message for the page the visitor is
 * on, using centralized job/destination data — no per-page hardcoding.
 * Pure function, safe for client components.
 */
export function whatsAppMessageForPath(
  pathname: string,
  lookup: {
    job?: { title: string; country: string };
    destination?: { name: string };
  }
): string {
  if (lookup.job) return jobWhatsAppMessage(lookup.job.title, lookup.job.country);
  if (lookup.destination) return destinationWhatsAppMessage(lookup.destination.name);
  if (pathname.startsWith("/for-employers")) return employerWhatsAppMessage();
  return generalWhatsAppMessage();
}
