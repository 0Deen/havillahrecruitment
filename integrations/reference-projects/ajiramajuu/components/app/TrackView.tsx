"use client";
import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires one analytics event on mount. Renders nothing. */
export default function TrackView({ event, props }: { event: AnalyticsEvent; props?: Record<string, string | number | boolean> }) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}
