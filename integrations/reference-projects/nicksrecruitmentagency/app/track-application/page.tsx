"use client";

import { useState, FormEvent } from "react";
import {
  FileCheck2,
  ClipboardList,
  HeartPulse,
  Plane,
  Luggage,
  Loader2,
  CheckCircle2,
} from "lucide-react";

/* ---------------------------------------------------------------------
   Track Application — dark hero + form card (matching the Contact Us
   layout), a name + ID number field that emails a tracking request to
   the team via /api/apply (formType: "track"), and a visual stage
   timeline underneath showing candidates what the process looks like.

   Note: there's no live status database wired up here, so instead of
   faking a "current stage" we're honest about it — submitting sends a
   real request to the team, who confirm status directly.
--------------------------------------------------------------------- */

const stages = [
  { label: "Application Received", icon: ClipboardList },
  { label: "Document Verification", icon: FileCheck2 },
  { label: "Medical Clearance", icon: HeartPulse },
  { label: "Visa Processing", icon: Plane },
  { label: "Ready to Travel", icon: Luggage },
];

export default function TrackApplicationPage() {
  const [values, setValues] = useState({ fullName: "", idNumber: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "track", ...values }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-sand-50">
      {/* --- Dark hero, matching the Contact Us layout --- */}
      <div className="bg-navy-950">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              Track Application
            </h1>
            <p className="mt-4 max-w-sm text-sand-200/70">
              Enter your name and ID number below and our team will confirm
              exactly where your application stands. We typically respond
              within 48 hours.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 size={24} />
                </span>
                <h3 className="font-display text-xl font-semibold text-navy-900">
                  Tracking request sent
                </h3>
                <p className="text-sm text-navy-700/70">
                  Thanks {values.fullName.split(" ")[0] || ""} — we&rsquo;ve
                  received your ID number and a team member will confirm your
                  current status shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-navy-900">
                  Check your status
                </h2>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-800">
                    Full name
                  </label>
                  <input
                    required
                    value={values.fullName}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, fullName: e.target.value }))
                    }
                    placeholder="e.g. Jane Wanjiru"
                    className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-700/40 outline-none transition focus:border-navy-900/40 focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-800">
                    ID number
                  </label>
                  <input
                    required
                    value={values.idNumber}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, idNumber: e.target.value }))
                    }
                    placeholder="e.g. 12345678"
                    className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-700/40 outline-none transition focus:border-navy-900/40 focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    "Track"
                  )}
                </button>

                {status === "error" && (
                  <p className="text-center text-sm font-medium text-red-600">
                    Something went wrong. Please try again, or WhatsApp us on
                    +254 746 030545.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* --- Stage timeline: what the process looks like end to end --- */}
      <div className="container-page py-20">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-navy-900">
          What to expect
        </h2>
        <p className="mt-2 max-w-xl text-navy-700/70">
          Every application moves through these five stages. Once we confirm
          your status, we&rsquo;ll tell you exactly where you are on this
          path.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-5">
          {stages.map(({ label, icon: Icon }, i) => (
            <div key={label} className="relative flex flex-col items-center text-center">
              {i < stages.length - 1 && (
                <span className="absolute left-1/2 top-6 hidden h-px w-full bg-navy-900/15 sm:block" />
              )}
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy-900/15 bg-white text-navy-700">
                <Icon size={20} />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-navy-900/40">
                Step {i + 1}
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-navy-900">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
