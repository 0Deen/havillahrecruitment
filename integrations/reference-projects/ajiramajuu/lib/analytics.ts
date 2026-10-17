"use client";

// Privacy-conscious analytics hook. It never sends names, phone numbers,
// emails or document details — only event names and coarse, non-personal
// properties (job slug, destination slug, source). Wire a provider by
// defining window.__ajmAnalytics (e.g. Plausible / GA) — until then events
// are dispatched as DOM CustomEvents and are otherwise a no-op.

export type AnalyticsEvent =
  | "job_viewed"
  | "apply_clicked"
  | "application_started"
  | "application_completed"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "destination_viewed"
  | "search_performed"
  | "job_filter_used"
  | "contact_form_submitted"
  | "employer_enquiry_submitted"
  | "assistant_opened"
  | "assistant_message"
  | "assistant_escalated";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    __ajmAnalytics?: (event: AnalyticsEvent, props?: Props) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === "undefined") return;
  try {
    window.__ajmAnalytics?.(event, props);
    window.dispatchEvent(new CustomEvent("ajm:analytics", { detail: { event, props } }));
  } catch {
    /* analytics must never break the UI */
  }
}
