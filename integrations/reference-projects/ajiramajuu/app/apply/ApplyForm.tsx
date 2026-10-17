"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { destinations, getJobsByCountrySlug } from "@/data/jobs";
import {
  DOCUMENT_SLOTS,
  EMPTY_APPLICATION,
  OPTIONS,
  STEP_FIELDS,
  UPLOAD_RULES,
  validateApplication,
  validateFileMeta,
  type ApplicationInput,
  type DocumentSlotKey,
  type FieldErrors,
} from "@/lib/applications";
import { buildWhatsAppUrl, applicationFollowUpWhatsAppMessage } from "@/lib/whatsapp";
import { COMPANY } from "@/lib/site";
import { track } from "@/lib/analytics";
import Icon from "@/components/app/Icon";

type Status = "idle" | "sending" | "sent" | "error";

const STEPS = ["Personal details", "Job preference", "Experience", "Documents", "Review"] as const;
const DRAFT_KEY = "ajm-apply-draft";

type Files = Partial<Record<DocumentSlotKey, File>>;

export default function ApplyForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fileErrors, setFileErrors] = useState<Partial<Record<DocumentSlotKey, string>>>({});
  const [files, setFiles] = useState<Files>({});
  const [form, setForm] = useState<ApplicationInput>(EMPTY_APPLICATION);
  const startedAt = useRef<number>(Date.now());
  const tracked = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  // --- prefill: ?country=Qatar&job=House%20Drivers (from job, destination, chat) + saved draft
  useEffect(() => {
    let base = { ...EMPTY_APPLICATION };
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) base = { ...base, ...(JSON.parse(raw) as Partial<ApplicationInput>) };
    } catch {
      /* ignore */
    }
    const c = params.get("country");
    const j = params.get("job");
    if (c) {
      const d = destinations.find((x) => x.name.toLowerCase() === c.toLowerCase() || x.slug === c.toLowerCase());
      if (d) base.preferredCountry = d.name;
    }
    if (j) base.preferredJob = j;
    setForm(base);
    startedAt.current = Date.now();
  }, [params]);

  // --- keep a draft for this browser tab only (never files, never passport number)
  useEffect(() => {
    if (status === "sent") return;
    try {
      const { passportNumber: _p, consentAccuracy: _a, consentPrivacy: _c, ...safe } = form;
      void _p; void _a; void _c;
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(safe));
    } catch {
      /* ignore */
    }
  }, [form, status]);

  const update = useCallback(<K extends keyof ApplicationInput>(key: K, value: ApplicationInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
    if (!tracked.current) {
      tracked.current = true;
      track("application_started");
    }
  }, []);

  const countryJobs = useMemo(() => {
    const d = destinations.find((x) => x.name === form.preferredCountry);
    return d ? getJobsByCountrySlug(d.slug) : [];
  }, [form.preferredCountry]);

  const hasValidPassport = form.passportStatus === OPTIONS.passport[0];

  function validateStep(i: number): boolean {
    const all = validateApplication(form);
    const mine: FieldErrors = {};
    STEP_FIELDS[i]?.forEach((k) => {
      if (all[k]) mine[k] = all[k];
    });
    setErrors((prev) => ({ ...prev, ...mine }));
    return Object.keys(mine).length === 0;
  }

  function go(next: number) {
    setStep(next);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  function onContinue() {
    if (validateStep(step)) go(step + 1);
    else setTimeout(() => document.querySelector<HTMLElement>("[data-error='true']")?.scrollIntoView({ behavior: "smooth", block: "center" }), 30);
  }

  function onPickFile(key: DocumentSlotKey, file?: File) {
    if (!file) return;
    const err = validateFileMeta(file.name, file.type, file.size);
    if (err) {
      setFileErrors((e) => ({ ...e, [key]: err }));
      return;
    }
    const total = Object.entries(files).reduce((n, [k, f]) => (k === key ? n : n + (f?.size ?? 0)), 0) + file.size;
    if (total > UPLOAD_RULES.maxTotalBytes) {
      setFileErrors((e) => ({ ...e, [key]: "Total upload size is limited to 4 MB. Try a smaller file." }));
      return;
    }
    setFileErrors((e) => ({ ...e, [key]: undefined }));
    setFiles((f) => ({ ...f, [key]: file }));
  }

  async function submit() {
    // full validation again; jump back to the first step with a problem
    const all = validateApplication(form);
    const firstBad = STEP_FIELDS.findIndex((fields) => fields.some((k) => all[k]));
    if (firstBad !== -1) {
      setErrors(all);
      go(firstBad);
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const fd = new FormData();
      (Object.keys(form) as (keyof ApplicationInput)[]).forEach((k) => fd.append(k, String(form[k])));
      DOCUMENT_SLOTS.forEach((s) => {
        const f = files[s.key];
        if (f) fd.append(`doc_${s.key}`, f, f.name);
      });
      fd.append("website", ""); // honeypot — real users leave it empty
      fd.append("startedAt", String(startedAt.current));

      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
          const bad = STEP_FIELDS.findIndex((fields) => fields.some((k) => data.fieldErrors[k]));
          if (bad !== -1) go(bad);
        }
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReference(data.reference || "");
      setEmailSent(Boolean(data.confirmationEmailSent));
      setStatus("sent");
      track("application_completed", { destination: form.preferredCountry });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setServerError("Connection problem. Check your internet and try again — your details are still here.");
      setStatus("error");
    }
  }

  /* ------------------------------------------------------------ success */
  if (status === "sent") {
    return (
      <div ref={topRef} className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-glass">
        <div className="bg-gradient-to-br from-brand-purple to-brand-purple-deep px-6 pb-8 pt-10 text-center text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-[#2A0F4F] shadow-lg"><Icon name="check" className="h-8 w-8" strokeWidth={2.5} /></div>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange-light">Step 6 · Submitted</p>
          <h2 className="mt-1 font-display text-3xl font-bold">Application received</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/85">
            Thank you for applying with Ajira Majuu. Your application has been successfully received. Our recruitment team will review your information and contact you using the details you provided.
          </p>
        </div>
        <div className="px-6 py-6 text-center">
          <p className="text-xs text-slate-500">Your reference number</p>
          <p className="mt-1 select-all font-display text-3xl font-bold tracking-wide text-brand-purple">{reference}</p>
          <p className="mx-auto mt-2 max-w-xs text-xs text-slate-500">
            Save this number and quote it when you contact us. {emailSent ? "A confirmation has been sent to your email." : form.email ? "" : "No email was provided, so no email confirmation was sent."}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={buildWhatsAppUrl(applicationFollowUpWhatsAppMessage(reference))} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_clicked", { source: "application-success" })} className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-bold text-white shadow-md">
              <Icon name="chat" /> Chat on WhatsApp
            </a>
            <Link href="/jobs" className="btn-secondary min-h-[52px]">Return to Jobs</Link>
            <Link href="/contact" className="btn-secondary min-h-[52px]">Contact Ajira Majuu</Link>
          </div>
          <p className="mx-auto mt-6 max-w-xs text-[11px] text-slate-400">Submitting an application does not guarantee employment. We’ll never ask you to send money through an unofficial individual.</p>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- form */
  const pct = ((step + 1) / (STEPS.length + 1)) * 100;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* progress */}
      <div className="rounded-[24px] border border-white/70 bg-white/85 p-4 shadow-glass backdrop-blur">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">Step {step + 1} of 6</p>
          <p className="text-xs font-semibold text-slate-500">{STEPS[step]}</p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuemin={1} aria-valuemax={6} aria-valuenow={step + 1} aria-label="Application progress">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-orange transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <ol className="mt-3 flex items-center justify-between">
          {[...STEPS, "Done"].map((label, i) => (
            <li key={label} className="flex flex-1 flex-col items-center">
              <button
                type="button"
                disabled={i >= step || i > 4}
                onClick={() => go(i)}
                aria-label={`Go to ${label}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${i < step ? "bg-brand-purple text-white" : i === step ? "bg-brand-orange text-[#2A0F4F] ring-4 ring-brand-orange/25" : "bg-slate-200 text-slate-500"}`}
              >
                {i < step ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 space-y-5 rounded-[28px] border border-white/70 bg-white p-5 shadow-glass sm:p-7">
        {/* honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" name="website" /></label></div>

        {step === 0 && (
          <Section title="Personal information" note="Takes about a minute. No account, no password.">
            <Text label="Full name" required value={form.fullName} error={errors.fullName} onChange={(v) => update("fullName", v)} autoComplete="name" placeholder="As on your ID" />
            <Text label="Phone number" required type="tel" inputMode="tel" value={form.phone} error={errors.phone} onChange={(v) => { update("phone", v); }} autoComplete="tel" placeholder="+254 7XX XXX XXX" />
            <Text label="WhatsApp number" type="tel" inputMode="tel" value={form.whatsapp} error={errors.whatsapp} onChange={(v) => update("whatsapp", v)} placeholder="Leave empty if same as phone" />
            {form.phone && !form.whatsapp && (
              <button type="button" onClick={() => update("whatsapp", form.phone)} className="-mt-2 text-xs font-semibold text-brand-purple underline">My WhatsApp is the same as my phone</button>
            )}
            <Text label="Email (optional)" type="email" inputMode="email" value={form.email} error={errors.email} onChange={(v) => update("email", v)} autoComplete="email" placeholder="you@example.com" hint="We’ll send a confirmation if you add one." />
            <Text label="Date of birth" required type="date" value={form.dateOfBirth} error={errors.dateOfBirth} onChange={(v) => update("dateOfBirth", v)} autoComplete="bday" />
            <Chips label="Gender" required value={form.gender} error={errors.gender} options={OPTIONS.gender} onChange={(v) => update("gender", v)} />
            <div className="grid grid-cols-2 gap-3">
              <Text label="County" required value={form.county} error={errors.county} onChange={(v) => update("county", v)} placeholder="e.g. Nairobi" />
              <Text label="Town / City" required value={form.town} error={errors.town} onChange={(v) => update("town", v)} placeholder="e.g. Ruaka" />
            </div>
            <Text label="Nationality" required value={form.nationality} error={errors.nationality} onChange={(v) => update("nationality", v)} />
          </Section>
        )}

        {step === 1 && (
          <>
            <Section title="Where and what work?">
              <Field label="Preferred destination" required error={errors.preferredCountry}>
                <div className="grid grid-cols-2 gap-2">
                  {destinations.filter((d) => d.active).map((d) => (
                    <button key={d.slug} type="button" aria-pressed={form.preferredCountry === d.name} onClick={() => { update("preferredCountry", d.name); update("preferredJob", ""); }}
                      className={`flex min-h-[52px] items-center gap-2 rounded-2xl border px-3 text-left text-[13.5px] font-semibold transition active:scale-[0.97] ${form.preferredCountry === d.name ? "border-brand-purple bg-brand-purple text-white" : "border-slate-200 bg-white text-ink"}`}>
                      <span className="text-lg">{d.flag}</span> <span className="leading-tight">{d.name}</span>
                    </button>
                  ))}
                </div>
              </Field>
              {countryJobs.length > 0 ? (
                <Select label="Preferred job" required value={form.preferredJob} error={errors.preferredJob} onChange={(v) => update("preferredJob", v)} options={[...countryJobs.map((j) => j.title), "Other / not listed"]} />
              ) : (
                <Text label="Preferred job" required value={form.preferredJob} error={errors.preferredJob} onChange={(v) => update("preferredJob", v)} placeholder="e.g. Caregiver, Driver, House help" hint={form.preferredCountry ? `No structured ${form.preferredCountry} listing yet — tell us the role and our team will confirm availability.` : undefined} />
              )}
              <Text label="Alternative job (optional)" value={form.alternativeJob} onChange={(v) => update("alternativeJob", v)} placeholder="A second choice" />
              <Select label="Employment category" value={form.employmentCategory} onChange={(v) => update("employmentCategory", v)} options={OPTIONS.category} />
              <Select label="Years of experience" required value={form.yearsExperience} error={errors.yearsExperience} onChange={(v) => update("yearsExperience", v)} options={OPTIONS.experience} />
              <Text label="Current occupation" value={form.currentOccupation} onChange={(v) => update("currentOccupation", v)} placeholder="What do you do now?" />
            </Section>
            <Section title="A few quick questions">
              <YesNo label="Are you currently employed?" value={form.currentlyEmployed} onChange={(v) => update("currentlyEmployed", v)} />
              <YesNo label="Are you willing to relocate?" value={form.willingToRelocate} onChange={(v) => update("willingToRelocate", v)} />
              <YesNo label="Are you available for interviews?" value={form.availableForInterview} onChange={(v) => update("availableForInterview", v)} />
              <YesNo label="Do you have overseas work experience?" value={form.overseasExperience} onChange={(v) => update("overseasExperience", v)} />
              <YesNo label="Willing to complete required medical checks?" value={form.willingMedical} onChange={(v) => update("willingMedical", v)} />
              <YesNo label="Willing to complete required training?" value={form.willingTraining} onChange={(v) => update("willingTraining", v)} />
              <Select label="Preferred start date" required value={form.startDate} error={errors.startDate} onChange={(v) => update("startDate", v)} options={OPTIONS.startDate} />
            </Section>
          </>
        )}

        {step === 2 && (
          <>
            <Section title="Professional experience" note="Everything on this page is optional — add what you can.">
              <Text label="Previous job title" value={form.previousJobTitle} onChange={(v) => update("previousJobTitle", v)} />
              <Text label="Employer" value={form.previousEmployer} onChange={(v) => update("previousEmployer", v)} />
              <Area label="Main responsibilities" value={form.responsibilities} onChange={(v) => update("responsibilities", v)} />
              <Area label="Skills" value={form.skills} onChange={(v) => update("skills", v)} rows={2} placeholder="e.g. cooking, driving, childcare" />
              <Text label="Languages spoken" value={form.languages} onChange={(v) => update("languages", v)} placeholder="e.g. English, Kiswahili" />
              <Select label="Highest education level" value={form.education} onChange={(v) => update("education", v)} options={OPTIONS.education} />
              <Text label="Professional certificates" value={form.certificates} onChange={(v) => update("certificates", v)} placeholder="e.g. Driving licence, First aid" />
            </Section>
            <Section title="Emergency contact" note="Someone we can reach if we can’t reach you.">
              <Text label="Contact name" value={form.emergencyName} onChange={(v) => update("emergencyName", v)} />
              <Text label="Relationship" value={form.emergencyRelationship} onChange={(v) => update("emergencyRelationship", v)} placeholder="e.g. Mother, Brother" />
              <Text label="Contact phone" type="tel" inputMode="tel" value={form.emergencyPhone} error={errors.emergencyPhone} onChange={(v) => update("emergencyPhone", v)} />
            </Section>
          </>
        )}

        {step === 3 && (
          <>
            <Section title="Passport" note="You can still apply if you don’t have a passport yet.">
              <Select label="Passport status" required value={form.passportStatus} error={errors.passportStatus} onChange={(v) => update("passportStatus", v)} options={OPTIONS.passport} />
              {hasValidPassport ? (
                <>
                  <Text label="Passport number (optional)" value={form.passportNumber} onChange={(v) => update("passportNumber", v)} autoComplete="off" hint="Only add it if you’re comfortable. Our team can also collect it later through an official step." />
                  <Text label="Passport expiry date" type="date" value={form.passportExpiry} error={errors.passportExpiry} onChange={(v) => update("passportExpiry", v)} />
                </>
              ) : form.passportStatus ? (
                <YesNo label="Are you able to obtain a passport?" value={form.canObtainPassport} onChange={(v) => update("canObtainPassport", v)} />
              ) : null}
            </Section>
            <Section title="Documents" note={`All optional — upload only what you have. ${UPLOAD_RULES.humanReadable}.`}>
              {DOCUMENT_SLOTS.map((slot) => {
                const file = files[slot.key];
                const err = fileErrors[slot.key];
                return (
                  <div key={slot.key} className={`rounded-2xl border p-3 ${err ? "border-red-300 bg-red-50/40" : "border-slate-200"}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple"><Icon name={file ? "check" : "file"} /></span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-semibold text-ink">{slot.label}</p>
                        <p className="truncate text-xs text-slate-500">{file ? `${file.name} · ${(file.size / 1024).toFixed(0)} KB` : slot.hint}</p>
                      </div>
                      {file ? (
                        <button type="button" onClick={() => setFiles((f) => { const n = { ...f }; delete n[slot.key]; return n; })} aria-label={`Remove ${slot.label}`} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-[18px] w-[18px]" /></button>
                      ) : (
                        <label className="flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full bg-brand-purple px-4 text-xs font-semibold text-white active:scale-95">
                          <Icon name="upload" className="h-4 w-4" /> Add
                          <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={(e) => { onPickFile(slot.key, e.target.files?.[0]); e.target.value = ""; }} />
                        </label>
                      )}
                    </div>
                    {err && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{err}</p>}
                  </div>
                );
              })}
              <p className="rounded-2xl bg-brand-purple/5 p-3 text-xs leading-relaxed text-slate-600">
                <strong className="text-ink">Privacy:</strong> documents are sent securely to the Ajira Majuu recruitment team only, to process your application. You don’t need to upload anything now — our team will tell you exactly what your role needs.
              </p>
            </Section>
          </>
        )}

        {step === 4 && (
          <Section title="Review and submit" note="Check your details. Tap Edit to change anything.">
            <ReviewGroup title="Personal" onEdit={() => go(0)} rows={[["Name", form.fullName], ["Phone", form.phone], ["WhatsApp", form.whatsapp || form.phone], ["Email", form.email], ["Date of birth", form.dateOfBirth], ["Gender", form.gender], ["Location", `${form.town}, ${form.county}`], ["Nationality", form.nationality]]} />
            <ReviewGroup title="Job" onEdit={() => go(1)} rows={[["Destination", form.preferredCountry], ["Job", form.preferredJob], ["Alternative", form.alternativeJob], ["Experience", form.yearsExperience], ["Start", form.startDate]]} />
            <ReviewGroup title="Experience" onEdit={() => go(2)} rows={[["Previous job", form.previousJobTitle], ["Languages", form.languages], ["Education", form.education], ["Emergency contact", [form.emergencyName, form.emergencyPhone].filter(Boolean).join(" · ")]]} />
            <ReviewGroup title="Documents" onEdit={() => go(3)} rows={[["Passport", form.passportStatus], ["Files", Object.values(files).map((f) => f?.name).filter(Boolean).join(", ")]]} />

            <Check checked={form.consentAccuracy} error={errors.consentAccuracy} onChange={(v) => update("consentAccuracy", v)}>
              I confirm that the information provided is accurate to the best of my knowledge and I understand that submission of this application does not guarantee employment.
            </Check>
            <Check checked={form.consentPrivacy} error={errors.consentPrivacy} onChange={(v) => update("consentPrivacy", v)}>
              I agree that Ajira Majuu may use my details and documents to process my application and contact me, as described in the{" "}
              <Link href="/privacy-policy" className="font-semibold text-brand-purple underline" target="_blank">Privacy Policy</Link>.
            </Check>
            {status === "error" && serverError && (
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {serverError}{" "}
                <a href={buildWhatsAppUrl("Hi Ajira Majuu, I had trouble submitting my application online.")} className="font-semibold underline" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
              </p>
            )}
          </Section>
        )}
      </div>

      {/* sticky thumb-zone controls — sit above the mobile tab bar */}
      <div className="sticky bottom-[calc(96px_+_env(safe-area-inset-bottom))] z-30 mt-4 lg:bottom-4">
        <div className="flex items-center gap-3 rounded-[24px] border border-white/70 bg-white/90 p-2.5 shadow-glass backdrop-blur-xl">
          <button type="button" onClick={() => go(Math.max(0, step - 1))} disabled={step === 0 || status === "sending"} className="flex h-[52px] min-w-[96px] items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 disabled:opacity-40 active:scale-95">
            <Icon name="left" className="h-4 w-4" /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={onContinue} className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-brand-purple text-[15px] font-bold text-white shadow-md active:scale-[0.98]">
              Continue <Icon name="right" className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={status === "sending"} className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange text-[15px] font-bold text-[#2A0F4F] shadow-md disabled:opacity-60 active:scale-[0.98]">
              {status === "sending" ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2A0F4F]/30 border-t-[#2A0F4F]" /> Submitting…</>) : (<>Submit application <Icon name="send" className="h-4 w-4" /></>)}
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-400">Need help? <a href={COMPANY.phoneHref} className="font-semibold text-brand-purple">{COMPANY.phoneDisplay}</a></p>
    </div>
  );
}

/* ------------------------------------------------------------- pieces */

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-display text-xl font-bold text-ink">{title}</legend>
      {note && <p className="-mt-2 text-xs text-slate-500">{note}</p>}
      {children}
    </fieldset>
  );
}

function Field({ label, required, error, hint, children }: { label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div data-error={error ? "true" : undefined}>
      <span className="text-[12.5px] font-semibold text-slate-700">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p role="alert" className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function Text({ label, required, error, hint, value, onChange, type = "text", ...rest }: {
  label: string; required?: boolean; error?: string; hint?: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; autoComplete?: string; inputMode?: "text" | "tel" | "email";
}) {
  return (
    <label className="block">
      <Field label={label} required={required} error={error} hint={hint}>
        <input className={`input ${error ? "!border-red-400" : ""}`} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} required={required} {...rest} />
      </Field>
    </label>
  );
}

function Area({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <label className="block">
      <Field label={label}>
        <textarea className="input" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={1000} />
      </Field>
    </label>
  );
}

function Select({ label, required, error, value, onChange, options }: { label: string; required?: boolean; error?: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <label className="block">
      <Field label={label} required={required} error={error}>
        <select className={`input ${error ? "!border-red-400" : ""}`} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} required={required}>
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
    </label>
  );
}

function Chips({ label, required, error, value, onChange, options }: { label: string; required?: boolean; error?: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <Field label={label} required={required} error={error}>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(o)} className={`min-h-[48px] rounded-full border px-5 text-sm font-semibold transition active:scale-95 ${value === o ? "border-brand-purple bg-brand-purple text-white" : "border-slate-200 bg-white text-slate-700"}`}>{o}</button>
        ))}
      </div>
    </Field>
  );
}

function YesNo({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
      <span className="text-[13.5px] font-medium text-slate-700">{label}</span>
      <div className="flex flex-none gap-1.5" role="radiogroup" aria-label={label}>
        {OPTIONS.yesNo.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(o)} className={`h-11 min-w-[56px] rounded-full px-4 text-sm font-semibold transition active:scale-95 ${value === o ? "bg-brand-purple text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function Check({ checked, error, onChange, children }: { checked: boolean; error?: string; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <div data-error={error ? "true" : undefined}>
      <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-[13px] leading-relaxed text-slate-700 ${error ? "border-red-300 bg-red-50/40" : "border-slate-200"}`}>
        <input type="checkbox" className="mt-0.5 h-5 w-5 flex-none accent-[#4B1E8C]" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>{children}</span>
      </label>
      {error && <p role="alert" className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function ReviewGroup({ title, rows, onEdit }: { title: string; rows: [string, string][]; onEdit: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-purple">{title}</h3>
        <button type="button" onClick={onEdit} className="min-h-[36px] px-2 text-xs font-semibold text-brand-purple underline">Edit</button>
      </div>
      <dl className="space-y-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-[13px]">
            <dt className="flex-none text-slate-500">{k}</dt>
            <dd className="min-w-0 break-words text-right font-medium text-ink">{v || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
