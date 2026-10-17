"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, CheckCircle2, Loader2, MessageCircle, User, Phone, Mail, Cake, Globe2,
  MapPin, Briefcase, BadgeCheck, Upload, ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { countryJobs, dependentDropdownData, getJobsForCountry, getOtherOpportunities } from "@/data/country-jobs";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Pre-selected from the card/job the visitor tapped — still editable. */
  initialCountry?: string;
  initialJob?: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  age: string;
  nationality: string;
  currentLocation: string;
  country: string;
  job: string;
  years: string;
  passportStatus: string;
  message: string;
  consent: boolean;
};

const empty = (country = "", job = ""): FormState => ({
  name: "", phone: "", email: "", age: "", nationality: "Kenyan", currentLocation: "",
  country, job, years: "", passportStatus: "", message: "", consent: false,
});

function findCategory(jobTitle: string) {
  return countryJobs.find((j) => j.title === jobTitle)?.category ?? "";
}

export function CountryApplyModal({ open, onClose, initialCountry, initialJob }: Props) {
  const [form, setForm] = useState<FormState>(() => empty(initialCountry, initialJob));
  const [cvName, setCvName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");

  // re-sync whenever a different job/country is tapped while the sheet is closed
  useEffect(() => {
    if (open) setForm(empty(initialCountry, initialJob));
  }, [open, initialCountry, initialJob]);

  const groups = useMemo(() => dependentDropdownData(), []);
  const jobOptions = useMemo(() => {
    const g = groups.find((g) => g.country === form.country);
    return g?.jobs ?? [];
  }, [groups, form.country]);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (form.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a valid phone number";
    if (!form.country) e.country = "Choose a country";
    if (!form.job) e.job = "Choose a job";
    if (!form.passportStatus) e.passportStatus = "Required";
    if (!form.consent) e.consent = "Please confirm to continue";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          county: form.currentLocation,
          currentLocation: form.currentLocation,
          category: findCategory(form.job),
          destination: form.country,
          experience: form.years,
          occupation: form.job,
          jobTitle: form.job,
          age: form.age,
          nationality: form.nationality,
          passportStatus: form.passportStatus,
          message: form.message,
          cvFileName: cvName,
          source: "jobs-by-country",
        }),
      });
      const data = await res.json().catch(() => ({}));
      setReference(data.reference || data.ref || `MKC-${new Date().getFullYear()}-PENDING`);
    } catch {
      setReference(`MKC-${new Date().getFullYear()}-PENDING`);
    } finally {
      setSubmitting(false);
    }
  }

  function close() {
    onClose();
    setTimeout(() => {
      setReference("");
      setCvName("");
      setForm(empty());
    }, 300);
  }

  const whatsappHref = `https://wa.me/254727469473?text=${encodeURIComponent(
    `Hello MK Connection, I just applied for ${form.job || "a role"} in ${form.country || "the Gulf"}. My reference is ${reference}.`
  )}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="jbc fixed inset-0 z-[95] flex items-end justify-center bg-[#232F45]/45 backdrop-blur-sm md:items-center md:p-4"
          onClick={close}
        >
          <motion.div
            initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] border border-[#E2D9CE] bg-white-soft p-6 shadow-jbc-lg sm:p-8 md:rounded-[28px]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sand-600">Apply now</p>
                <h2 className="font-display text-xl text-navy-900">
                  {reference ? "You're all set" : form.job ? form.job : "Start your application"}
                </h2>
              </div>
              <button onClick={close} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-100 text-navy-900 transition hover:bg-sand-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {reference ? (
              <div className="space-y-4">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-jbc-success/15 text-jbc-success">
                  <CheckCircle2 size={30} />
                </span>
                <p className="text-center text-sm leading-6 text-jbc-muted">
                  Application received. We will contact you on WhatsApp.
                </p>
                <div className="rounded-2xl bg-cream-100 px-4 py-3 text-center">
                  <p className="text-[11px] text-jbc-muted">Reference number</p>
                  <p className="font-display text-lg tracking-wide text-navy-900">{reference}</p>
                </div>
                <a
                  href={whatsappHref} target="_blank" rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-jbc-success px-6 py-3.5 text-sm font-semibold text-white shadow-jbc transition hover:brightness-110"
                >
                  <MessageCircle size={17} /> Message us on WhatsApp
                </a>
                <button onClick={close} className="w-full rounded-full border border-navy-900/15 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-100">
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field icon={User} label="Full name" required error={errors.name}>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
                  </Field>
                  <Field icon={Phone} label="Phone / WhatsApp" required error={errors.phone}>
                    <input value={form.phone} onChange={(e) => set("phone", e.target.value)} type="tel" placeholder="07xx xxx xxx" className={inputCls} />
                  </Field>
                  <Field icon={Mail} label="Email (optional)">
                    <input value={form.email} onChange={(e) => set("email", e.target.value)} type="email" className={inputCls} />
                  </Field>
                  <Field icon={Cake} label="Age">
                    <input value={form.age} onChange={(e) => set("age", e.target.value)} inputMode="numeric" className={inputCls} />
                  </Field>
                  <Field icon={Globe2} label="Nationality">
                    <input value={form.nationality} onChange={(e) => set("nationality", e.target.value)} className={inputCls} />
                  </Field>
                  <Field icon={MapPin} label="Current location">
                    <input value={form.currentLocation} onChange={(e) => set("currentLocation", e.target.value)} placeholder="e.g. Mombasa" className={inputCls} />
                  </Field>
                </div>

                <div className="h-px w-full jbc-slats" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field icon={Globe2} label="Country" required error={errors.country}>
                    <select value={form.country} onChange={(e) => set("country", e.target.value)} className={inputCls}>
                      <option value="">Select a country…</option>
                      {groups.map((g) => <option key={g.country} value={g.country}>{g.country}</option>)}
                    </select>
                  </Field>
                  <Field icon={Briefcase} label="Job" required error={errors.job}>
                    <select value={form.job} onChange={(e) => set("job", e.target.value)} disabled={!form.country} className={inputCls}>
                      <option value="">{form.country ? "Select a job…" : "Choose a country first"}</option>
                      {jobOptions.map((j) => <option key={j} value={j}>{j}</option>)}
                    </select>
                  </Field>
                  <Field icon={BadgeCheck} label="Years of experience">
                    <select value={form.years} onChange={(e) => set("years", e.target.value)} className={inputCls}>
                      <option value="">Select…</option>
                      {["Entry level", "1-2 years", "3-5 years", "5+ years"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field icon={ShieldCheck} label="Passport status" required error={errors.passportStatus}>
                    <select value={form.passportStatus} onChange={(e) => set("passportStatus", e.target.value)} className={inputCls}>
                      <option value="">Select…</option>
                      <option value="Have a valid passport">Have a valid passport</option>
                      <option value="Applying for one">Applying for one</option>
                    </select>
                  </Field>
                </div>

                <Field icon={Upload} label="Upload CV / ID (optional)">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-sand-500/60 bg-cream-100 px-4 py-3 text-sm text-jbc-muted transition hover:border-sand-500">
                    <Upload size={16} className="text-sand-600" />
                    <span className="truncate">{cvName || "Choose a file"}</span>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")} />
                  </label>
                  {cvName && <p className="mt-1 text-[11px] text-jbc-muted">We'll ask our team to collect this on WhatsApp after you submit.</p>}
                </Field>

                <Field icon={MessageCircle} label="Short message (optional)">
                  <textarea rows={2} value={form.message} onChange={(e) => set("message", e.target.value)} className={inputCls} />
                </Field>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-cream-300 bg-cream-100 p-4 text-xs leading-5 text-jbc-muted">
                  <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 accent-navy-900" />
                  I confirm my details are accurate and agree that MK Connection may share them with verified employers for this role.
                </label>
                {errors.consent && <p className="text-xs font-medium text-jbc-error">{errors.consent}</p>}

                <button
                  onClick={submit} disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-cream-100 shadow-jbc transition hover:bg-navy-700 disabled:opacity-60"
                >
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Apply for this job"}
                </button>
                <p className="text-center text-[11px] text-jbc-muted">No login needed. A team member reaches out on WhatsApp.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl border border-cream-300 bg-white-soft px-3.5 py-2.5 text-sm text-navy-900 outline-none transition placeholder:text-jbc-muted/60";

function Field({
  icon: Icon, label, required, error, children,
}: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-navy-900">
        <Icon size={13} className="text-sand-600" /> {label}{required && <span className="text-jbc-error"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] font-medium text-jbc-error">{error}</p>}
    </div>
  );
}

// re-exported so pages can show "other" roles without importing the data file directly
export { getJobsForCountry, getOtherOpportunities };
