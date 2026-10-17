"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const empty = { company: "", country: "", contactPerson: "", email: "", phone: "", positions: "", numberNeeded: "", details: "" };

export default function ForEmployersPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(empty);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch (err) {
      console.error("Employer lead submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  }

  function update(key: keyof typeof empty, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="container-content py-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="font-display text-3xl text-ink md:text-4xl">Great talent. Without borders.</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
            MK Connection Limited helps international employers source, screen and place qualified Kenyan workers —
            with documentation and pre-departure support handled end to end.
          </p>

          <div className="mt-8 space-y-3">
            {["Tell us what you need", "We source talent", "We screen candidates", "You review & interview", "We handle placement"].map((s, i) => (
              <div key={s} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-sm font-medium text-ink">{i + 1}</span>
                <span className="text-sm text-ink">{s}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate">
            Prefer to talk directly? WhatsApp us at {siteConfig.whatsapp} or email {siteConfig.email}.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-line bg-white p-7">
            <h2 className="font-display text-xl text-ink">Request received</h2>
            <p className="mt-2 text-sm text-slate">Our recruitment team will contact you to discuss your requirements.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-xl text-ink">Request recruitment services</h2>
            <Field label="Company name" value={form.company} onChange={(v) => update("company", v)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Country" value={form.country} onChange={(v) => update("country", v)} />
              <Field label="Contact person" value={form.contactPerson} onChange={(v) => update("contactPerson", v)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
              <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Position(s) needed" value={form.positions} onChange={(v) => update("positions", v)} />
              <Field label="Number of workers" type="number" value={form.numberNeeded} onChange={(v) => update("numberNeeded", v)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">Additional details</label>
              <textarea
                rows={3}
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-amber"
              />
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60">
              {submitting ? "Submitting…" : "Request Recruitment Services"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-amber"
      />
    </div>
  );
}
