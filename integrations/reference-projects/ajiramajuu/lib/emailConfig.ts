/** Server-only email configuration. Secrets must be supplied as deployment env vars. */
export const AJIRA_NOTIFICATION_EMAIL = "deen@ajiramajuu.com";
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "notifications@ajiramajuu.com";

export function notificationRecipients(): string[] {
  const configured = (process.env.AJIRA_MAJUU_NOTIFICATION_EMAIL || AJIRA_NOTIFICATION_EMAIL)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.length ? configured : [AJIRA_NOTIFICATION_EMAIL];
}
