"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Briefcase, CheckCircle2, FileText, Loader2,
  Plane, ShieldCheck, Upload, User, Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Field configuration — add / remove fields here, the form adapts.    */
/* ------------------------------------------------------------------ */

type Val = string | string[] | boolean;
type Data = Record<string, Val>;
type F = {
  k: string; label: string;
  type: "text" | "tel" | "email" | "date" | "number" | "select" | "textarea" | "multi" | "pills" | "file" | "check";
  opts?: string[]; req?: boolean; span?: 2; hint?: string; accept?: string;
  show?: (d: Data) => boolean;
};

const DESTINATIONS = ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman"];
const CATEGORIES = [
  "Housemaid / domestic worker", "Housekeeping / cleaner", "Driver (private, heavy or PSV)", "Security guard",
  "Nanny / caregiver", "Nurse / healthcare", "Hotel & restaurant (waiter, cook, chef, barista)",
  "Construction / general labourer", "Technician (electrician, plumber, AC, mechanic)",
  "Retail / sales", "Warehouse / logistics", "Beauty / salon / spa", "Office / admin / customer service", "Other",
];
const COUNTIES = ["Mombasa", "Nairobi", "Kisumu", "Nakuru", "Kilifi", "Kwale", "Eldoret", "Machakos", "Kiambu", "Other"];
const YES_NO = ["Yes", "No"];

const STEPS: { title: string; blurb: string; icon: typeof User; fields: F[] }[] = [
  {
    title: "About you", blurb: "Use your name exactly as it appears on your passport or ID.", icon: User,
    fields: [
      { k: "fullName", label: "Full name", type: "text", req: true, span: 2 },
      { k: "gender", label: "Gender", type: "pills", opts: ["Female", "Male"], req: true },
      { k: "dob", label: "Date of birth", type: "date", req: true },
      { k: "nationalId", label: "National ID number", type: "text", req: true },
      { k: "marital", label: "Marital status", type: "select", opts: ["Single", "Married", "Divorced", "Widowed"], req: true },
      { k: "phone", label: "Phone number", type: "tel", req: true, hint: "e.g. 0712 345 678" },
      { k: "whatsapp", label: "WhatsApp number", type: "tel", hint: "Leave blank if the same as phone" },
      { k: "email", label: "Email (optional)", type: "email" },
      { k: "county", label: "County", type: "select", opts: COUNTIES, req: true },
      { k: "town", label: "Town / estate", type: "text" },
      { k: "kinName", label: "Next of kin: full name", type: "text", req: true },
      { k: "kinRel", label: "Relationship", type: "text", req: true },
      { k: "kinPhone", label: "Next of kin: phone", type: "tel", req: true },
    ],
  },
  {
    title: "The job you want", blurb: "Tell us what you are looking for. You can pick more than one country.", icon: Briefcase,
    fields: [
      { k: "category", label: "Job category", type: "select", opts: CATEGORIES, req: true, span: 2 },
      { k: "position", label: "Specific position or title", type: "text", hint: "e.g. Salon stylist, forklift operator" },
      { k: "destinations", label: "Preferred countries", type: "multi", opts: [...DESTINATIONS, "Any Gulf country"], req: true, span: 2 },
      { k: "salary", label: "Expected monthly salary (optional)", type: "text", hint: "e.g. SAR 1,200 or open to offers" },
      { k: "available", label: "Available to start from", type: "date", req: true },
      { k: "contract", label: "Contract length you can commit to", type: "select", opts: ["1 year", "2 years", "3 years or more", "Flexible"], req: true },
      { k: "livein", label: "Comfortable with employer-provided accommodation?", type: "pills", opts: YES_NO, req: true },
    ],
  },
  {
    title: "Experience & skills", blurb: "Employers choose candidates from this. Be honest and specific.", icon: Briefcase,
    fields: [
      { k: "education", label: "Highest education", type: "select", opts: ["Primary", "KCPE", "KCSE", "Certificate", "Diploma", "Degree", "Other"], req: true },
      { k: "years", label: "Years of work experience", type: "select", opts: ["None (first job)", "Under 1 year", "1–2 years", "3–5 years", "6–10 years", "Over 10 years"], req: true },
      { k: "lastJob", label: "Current or last job title", type: "text", show: (d) => d.years !== "None (first job)" },
      { k: "lastEmployer", label: "Current or last employer", type: "text", show: (d) => d.years !== "None (first job)" },
      { k: "gulfBefore", label: "Have you worked abroad before?", type: "pills", opts: YES_NO, req: true },
      { k: "gulfWhere", label: "Which country and for how long?", type: "text", span: 2, show: (d) => d.gulfBefore === "Yes" },
      { k: "languages", label: "Languages you speak", type: "multi", opts: ["English", "Kiswahili", "Arabic", "Hindi / Urdu", "Other"], req: true, span: 2 },
      { k: "englishLevel", label: "English level", type: "select", opts: ["Basic", "Good", "Fluent"], req: true },
      { k: "driving", label: "Driving licence class", type: "select", opts: ["None", "A", "B", "C", "D", "E", "Other"] },
      { k: "skills", label: "Skills, training and certificates", type: "textarea", span: 2, hint: "e.g. cooking, first aid, welding, childcare, computer skills" },
    ],
  },
  {
    title: "Documents & travel", blurb: "A passport is needed before any employer can move forward.", icon: FileText,
    fields: [
      { k: "passport", label: "Passport status", type: "select", opts: ["I have a valid passport", "My passport is expired", "I have applied", "I do not have one"], req: true },
      { k: "passportNo", label: "Passport number", type: "text", show: (d) => d.passport === "I have a valid passport" },
      { k: "passportExp", label: "Passport expiry date", type: "date", show: (d) => d.passport === "I have a valid passport" },
      { k: "goodConduct", label: "Certificate of Good Conduct", type: "select", opts: ["Yes, I have one", "Applied", "No"], req: true },
      { k: "medical", label: "Any medical condition we should know about?", type: "pills", opts: ["No", "Yes"], req: true },
      { k: "medicalNote", label: "Please explain briefly", type: "textarea", span: 2, show: (d) => d.medical === "Yes" },
      { k: "cv", label: "CV (PDF or Word, max 5 MB)", type: "file", accept: ".pdf,.doc,.docx", hint: "Optional. We can help you create one." },
      { k: "photo", label: "Passport-size photo (JPG or PNG)", type: "file", accept: ".jpg,.jpeg,.png" },
      { k: "passportCopy", label: "Passport bio page (photo or PDF)", type: "file", accept: ".jpg,.jpeg,.png,.pdf" },
    ],
  },
  {
    title: "Review & submit", blurb: "Check everything, then confirm. You can go back and edit any step.", icon: ShieldCheck,
    fields: [
      { k: "agreeTruth", label: "I confirm that the information I have given is true and complete.", type: "check", req: true, span: 2 },
      { k: "agreeData", label: "I agree that MK Connection Limited may use and share my details with verified employers for recruitment.", type: "check", req: true, span: 2 },
      { k: "agreeFees", label: "I understand that I should never pay anyone for a job offer before an employer has confirmed it in writing, and I will report any such request.", type: "check", req: true, span: 2 },
    ],
  },
];

const ALL_FIELDS = STEPS.flatMap((s) => s.fields).filter((f) => f.type !== "check");
const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#10233f] outline-none transition placeholder:text-slate-400 focus:border-[#2f2aa5] focus:ring-2 focus:ring-[#2f2aa5]/20";

/* ------------------------------------------------------------------ */

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState("");
  const [fail, setFail] = useState("");
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => { top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [step, ref]);

  const set = (k: string, v: Val) => { setD((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: "" })); };
  const visible = (f: F) => !f.show || f.show(d);

  const validate = (i: number) => {
    const e: Record<string, string> = {};
    STEPS[i].fields.filter(visible).forEach((f) => {
      const v = f.type === "file" ? files[f.k] : d[f.k];
      const empty = v === undefined || v === "" || v === false || (Array.isArray(v) && !v.length);
      if (f.req && empty) e[f.k] = f.type === "check" ? "Please tick this box to continue." : "This field is required.";
      else if (f.type === "tel" && v && String(v).replace(/\D/g, "").length < 9) e[f.k] = "Enter a valid phone number.";
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(String(v))) e[f.k] = "Enter a valid email address.";
    });
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => validate(step) && setStep((s) => s + 1);

  const submit = async () => {
    if (!validate(step)) return;
    setBusy(true); setFail("");
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(d));
      Object.entries(files).forEach(([k, f]) => fd.append(k, f));
      const res = await fetch("/api/applications", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setRef(json.ref);
    } catch (err) {
      setFail(err instanceof Error ? err.message : "Could not send your application. Please try again.");
    } finally { setBusy(false); }
  };

  const show = (f: F) => {
    const v = f.type === "file" ? files[f.k]?.name : d[f.k];
    return Array.isArray(v) ? v.join(", ") : typeof v === "string" ? v : "";
  };

  /* ---------------- success screen ---------------- */
  if (ref)
    return (
      <main className="container-content py-16 md:py-24">
        <div ref={top} className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-[0_30px_60px_-30px_rgba(47,42,165,0.4)] md:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 size={32} /></span>
          <h1 className="mt-6 font-display text-3xl text-[#10233f]">Application received</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Thank you, {String(d.fullName).split(" ")[0]}. Our team will review your details and contact you on {String(d.phone)}.
          </p>
          <p className="mt-6 rounded-2xl bg-[#f3f2ff] px-4 py-3 text-sm text-[#2f2aa5]">
            Your reference number: <strong className="tracking-wider">{ref}</strong>
          </p>
          <p className="mt-4 text-xs text-slate-500">Keep this number. Remember: you never pay for a job offer before it is confirmed in writing.</p>
          <Link href="/" className="mt-8 inline-flex rounded-full bg-[#2f2aa5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#25218a]">Back to home</Link>
        </div>
      </main>
    );

  const S = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <main className="container-content py-10 md:py-16">
      <div ref={top} className="scroll-mt-24" />

      <header className="mx-auto max-w-3xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f2aa5]"><Plane size={16} /> Application form</p>
        <h1 className="mt-2 font-display text-3xl text-[#10233f] md:text-4xl">Apply for work in the Gulf</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">No account needed. It takes about 8 minutes. A team member will contact you after you submit.</p>
      </header>

      {/* stepper (real sequence, so numbers are meaningful) */}
      <ol className="mx-auto mt-8 flex max-w-3xl items-center" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              disabled={i > step}
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                i < step ? "bg-[#2f2aa5] text-white" : i === step ? "bg-[#d9772b] text-white ring-4 ring-[#d9772b]/20" : "bg-slate-200 text-slate-500"
              }`}
            >
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </button>
            {i < STEPS.length - 1 && <span className={`mx-2 h-0.5 flex-1 rounded ${i < step ? "bg-[#2f2aa5]" : "bg-slate-200"}`} />}
          </li>
        ))}
      </ol>

      <section className="mx-auto mt-6 max-w-3xl rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_30px_60px_-34px_rgba(47,42,165,0.35)] md:p-9">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f3f2ff] text-[#2f2aa5]"><S.icon size={20} /></span>
          <div>
            <p className="text-xs font-semibold text-slate-500">Step {step + 1} of {STEPS.length}</p>
            <h2 className="font-display text-2xl text-[#10233f]">{S.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{S.blurb}</p>
          </div>
        </div>

        {/* honeypot for bots */}
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" onChange={(e) => set("website", e.target.value)} />

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {S.fields.filter(visible).map((f) => (
            <div key={f.k} className={f.span === 2 ? "sm:col-span-2" : ""}>
              {f.type === "check" ? (
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm leading-6 text-slate-700 has-[:checked]:border-[#2f2aa5] has-[:checked]:bg-[#f3f2ff]">
                  <input type="checkbox" checked={!!d[f.k]} onChange={(e) => set(f.k, e.target.checked)} className="mt-1 h-4 w-4 accent-[#2f2aa5]" />
                  {f.label}
                </label>
              ) : (
                <>
                  <label htmlFor={f.k} className="mb-1.5 block text-[13px] font-semibold text-[#10233f]">
                    {f.label}{f.req && <span className="text-[#c8202f]"> *</span>}
                  </label>

                  {["text", "tel", "email", "date", "number"].includes(f.type) && (
                    <input id={f.k} type={f.type} value={(d[f.k] as string) ?? ""} placeholder={f.hint} onChange={(e) => set(f.k, e.target.value)} className={inputCls} />
                  )}
                  {f.type === "textarea" && (
                    <textarea id={f.k} rows={4} value={(d[f.k] as string) ?? ""} placeholder={f.hint} onChange={(e) => set(f.k, e.target.value)} className={inputCls} />
                  )}
                  {f.type === "select" && (
                    <select id={f.k} value={(d[f.k] as string) ?? ""} onChange={(e) => set(f.k, e.target.value)} className={inputCls}>
                      <option value="">Select…</option>
                      {f.opts?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  )}
                  {f.type === "pills" && (
                    <div className="flex flex-wrap gap-2">
                      {f.opts?.map((o) => (
                        <button key={o} type="button" aria-pressed={d[f.k] === o} onClick={() => set(f.k, o)}
                          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${d[f.k] === o ? "border-[#2f2aa5] bg-[#2f2aa5] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#2f2aa5]"}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                  {f.type === "multi" && (
                    <div className="flex flex-wrap gap-2">
                      {f.opts?.map((o) => {
                        const cur = (d[f.k] as string[]) ?? [];
                        const on = cur.includes(o);
                        return (
                          <button key={o} type="button" aria-pressed={on} onClick={() => set(f.k, on ? cur.filter((x) => x !== o) : [...cur, o])}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-[#d9772b] bg-[#d9772b] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#d9772b]"}`}>
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {f.type === "file" && (
                    <label htmlFor={f.k} className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm text-slate-600 transition hover:border-[#2f2aa5] hover:bg-[#f3f2ff]">
                      <Upload size={18} className="text-[#2f2aa5]" />
                      <span className="truncate">{files[f.k]?.name ?? "Choose a file"}</span>
                      <input id={f.k} type="file" accept={f.accept} className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) return setErrors((p) => ({ ...p, [f.k]: "File is larger than 5 MB." }));
                          setFiles((p) => ({ ...p, [f.k]: file })); setErrors((p) => ({ ...p, [f.k]: "" }));
                        }} />
                    </label>
                  )}
                  {f.hint && f.type === "file" && <p className="mt-1 text-xs text-slate-500">{f.hint}</p>}
                </>
              )}
              {errors[f.k] && <p role="alert" className="mt-1.5 text-xs font-medium text-[#c8202f]">{errors[f.k]}</p>}
            </div>
          ))}
        </div>

        {/* review summary on the last step */}
        {last && (
          <div className="mt-2 mb-6 divide-y divide-slate-100 rounded-2xl bg-slate-50 p-2 text-sm">
            {ALL_FIELDS.filter((f) => show(f)).map((f) => (
              <div key={f.k} className="flex flex-col gap-0.5 px-3 py-2.5 sm:flex-row sm:gap-4">
                <span className="w-56 shrink-0 text-slate-500">{f.label.replace(" (optional)", "")}</span>
                <span className="font-medium text-[#10233f]">{show(f)}</span>
              </div>
            ))}
          </div>
        )}

        {fail && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#c8202f]">{fail} You can also reach us from the <Link href="/contact" className="underline">contact page</Link>.</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:invisible">
            <ArrowLeft size={16} /> Back
          </button>
          {last ? (
            <button type="button" onClick={submit} disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-[#d9772b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_26px_-10px_rgba(217,119,43,0.8)] transition hover:brightness-110 disabled:opacity-60">
              {busy ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Submit application <CheckCircle2 size={16} /></>}
            </button>
          ) : (
            <button type="button" onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-[#2f2aa5] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_26px_-10px_rgba(47,42,165,0.8)] transition hover:bg-[#25218a]">
              Continue <ArrowRight size={16} />
            </button>
          )}
        </div>
      </section>

      <p className="mx-auto mt-6 flex max-w-3xl items-center gap-2 text-xs text-slate-500"><Users size={14} /> Your details are only shared with verified employers. Need help filling this in? <Link href="/contact" className="font-semibold text-[#2f2aa5] underline">Talk to our team</Link>.</p>
    </main>
  );
}