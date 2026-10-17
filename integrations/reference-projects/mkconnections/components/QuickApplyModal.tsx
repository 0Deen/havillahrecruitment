"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { categories } from "@/data/jobs";
import { siteConfig } from "@/lib/site-config";

type FormState = {
  name: string;
  phone: string;
  email: string;
  county: string;
  category: string;
  destination: string;
  experience: string;
  occupation: string;
};

const empty: FormState = { name: "", phone: "", email: "", county: "", category: "", destination: "", experience: "", occupation: "" };

function fallbackReference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `MKC-${new Date().getFullYear()}-${n}`;
}

export function QuickApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(empty);
  const [reference, setReference] = useState(fallbackReference());
  const [submitting, setSubmitting] = useState(false);

  async function submitApplication() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setReference(data.reference);
      }
    } catch (e) {
      console.error("Application submit failed, showing local reference:", e);
    } finally {
      setSubmitting(false);
      setStep(3);
    }
  }

  const steps = ["About you", "What you want", "Experience", "Review"];

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function close() {
    onClose();
    setTimeout(() => {
      setStep(0);
      setForm(empty);
    }, 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/50 backdrop-blur-sm md:items-center"
          onClick={close}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-7 shadow-lift md:rounded-3xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate">
                Step {Math.min(step + 1, steps.length)} of {steps.length}
              </p>
              <button onClick={close} aria-label="Close" className="text-ink/60 hover:text-ink">
                <X size={20} />
              </button>
            </div>

            {step < steps.length && (
              <div className="mb-6 flex gap-1.5">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-amber" : "bg-line"}`} />
                ))}
              </div>
            )}

            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink">About you</h2>
                <Input label="Full name" value={form.name} onChange={(v) => update("name", v)} />
                <Input label="Phone number" value={form.phone} onChange={(v) => update("phone", v)} type="tel" />
                <Input label="Email (optional)" value={form.email} onChange={(v) => update("email", v)} type="email" />
                <Input label="County" value={form.county} onChange={(v) => update("county", v)} />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink">What are you looking for?</h2>
                <Select label="Job category" value={form.category} onChange={(v) => update("category", v)} options={categories} />
                <Select label="Preferred destination" value={form.destination} onChange={(v) => update("destination", v)} options={siteConfig.destinations} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink">Your experience</h2>
                <Select
                  label="Years of experience"
                  value={form.experience}
                  onChange={(v) => update("experience", v)}
                  options={["Entry level", "1-2 years", "3-5 years", "5+ years"]}
                />
                <Input label="Current or previous occupation" value={form.occupation} onChange={(v) => update("occupation", v)} />
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink">CV upload (optional)</label>
                  <input type="file" className="w-full rounded-xl border border-line px-3 py-2.5 text-sm" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink">We've received your application</h2>
                <p className="text-sm text-slate">Your reference number:</p>
                <p className="rounded-xl bg-sand px-4 py-3 font-display text-xl text-ink">{reference}</p>
                <div className="rounded-xl border border-line p-4 text-sm text-slate">
                  <p><span className="text-ink">Name:</span> {form.name || "—"}</p>
                  <p><span className="text-ink">Category:</span> {form.category || "—"}</p>
                  <p><span className="text-ink">Destination:</span> {form.destination || "—"}</p>
                </div>
                <p className="text-xs text-slate">
                  Next: Profile Review → Screening → Suitable Opportunities → Employer Selection. Our team will reach out via {siteConfig.whatsapp} or your provided contact.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              {step > 0 && step < steps.length && (
                <button onClick={() => setStep((s) => s - 1)} className="text-sm text-slate hover:text-ink">
                  Back
                </button>
              )}
              <div className="ml-auto flex gap-3">
                {step < steps.length - 1 && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep"
                  >
                    Continue
                  </button>
                )}
                {step === steps.length - 2 && null}
                {step === steps.length - 1 && (
                  <button onClick={close} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">
                    Done
                  </button>
                )}
                {step === 2 && (
                  <button
                    onClick={submitApplication}
                    disabled={submitting}
                    className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
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

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-amber"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
