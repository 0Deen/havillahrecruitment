"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function SafetyPage() {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const [reportSent, setReportSent] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [report, setReport] = useState({ description: "", contact: "" });

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.trim()) return;
    setVerifying(true);
    setResult(null);
    try {
      const res = await fetch(`/api/applications?reference=${encodeURIComponent(ref.trim())}`);
      const data = await res.json();
      if (data.found) {
        setResult(`Found: ${data.application.category || "Application"} — status: ${data.application.status}.`);
      } else {
        setResult("We couldn't confirm this reference. If you believe this is a genuine MK Connection Limited opportunity, contact us directly before proceeding.");
      }
    } catch {
      setResult("We couldn't check that right now. Please contact us directly to verify.");
    } finally {
      setVerifying(false);
    }
  }

  async function submitReport(e: React.FormEvent) {
    e.preventDefault();
    setReportSubmitting(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      if (res.ok) setReportSent(true);
    } catch (err) {
      console.error("Report submit failed:", err);
    } finally {
      setReportSubmitting(false);
    }
  }

  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Your safety comes first</h1>
      <p className="mt-3 max-w-lg text-sm text-slate">
        Legitimate recruitment never asks you to pay unofficial individuals or hand over documents outside
        our official channels. If something feels wrong, stop and contact us directly.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="flex items-center gap-2 font-display text-lg text-ink">
            <ShieldCheck size={18} className="text-amber" /> Recognise legitimate recruitment
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-slate">
            <li>We never ask for payment to unofficial individuals for a job offer.</li>
            <li>All official communication comes through {siteConfig.whatsapp} or {siteConfig.email}.</li>
            <li>Contracts and job details are provided in writing before you travel.</li>
            <li>You should never surrender your original passport to a recruiter.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="flex items-center gap-2 font-display text-lg text-ink">
            <ShieldAlert size={18} className="text-amber" /> Warning signs
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-slate">
            <li>Requests for payment via personal mobile money accounts.</li>
            <li>Pressure to decide immediately or "the offer expires today."</li>
            <li>Communication only through unofficial numbers or personal social accounts.</li>
            <li>A job offer with no written contract.</li>
          </ul>
        </div>
      </div>

      <div id="verify" className="mt-14 scroll-mt-28 rounded-2xl border border-line bg-sand/40 p-7">
        <h2 className="font-display text-xl text-ink">Verify an opportunity</h2>
        <p className="mt-2 text-sm text-slate">Enter an application reference number to check its status.</p>
        <form onSubmit={verify} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="e.g. MKC-2026-004821"
            className="flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus:border-amber"
          />
          <button type="submit" disabled={verifying} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white disabled:opacity-60">
            {verifying ? "Checking…" : "Verify"}
          </button>
        </form>
        {result && <p className="mt-3 text-sm text-amber-deep">{result}</p>}
      </div>

      <div id="report" className="mt-10 scroll-mt-28 rounded-2xl border border-line bg-white p-7">
        <h2 className="font-display text-xl text-ink">Report a recruitment scam</h2>
        <p className="mt-2 text-sm text-slate">
          Tell us what happened — fake jobs, fake recruiters, suspicious payment requests, or impersonation.
        </p>
        {reportSent ? (
          <p className="mt-4 text-sm text-amber-deep">Thank you — your report has been received.</p>
        ) : (
          <form onSubmit={submitReport} className="mt-4 space-y-3">
            <textarea
              rows={4}
              value={report.description}
              onChange={(e) => setReport((r) => ({ ...r, description: e.target.value }))}
              placeholder="Describe what happened"
              className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-amber"
            />
            <input
              value={report.contact}
              onChange={(e) => setReport((r) => ({ ...r, contact: e.target.value }))}
              placeholder="Your phone or email (optional)"
              className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-amber"
            />
            <button type="submit" disabled={reportSubmitting} className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60">
              {reportSubmitting ? "Submitting…" : "Submit report"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
