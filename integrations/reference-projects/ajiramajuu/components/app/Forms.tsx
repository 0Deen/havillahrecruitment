"use client";

import { useRef, useState } from "react";
import { destinations } from "@/data/jobs";
import { isValidPhone } from "@/lib/applications";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import Icon from "./Icon";

type Errs = Record<string, string>;

function Fld({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-semibold text-slate-700">{label} {required && <span className="text-red-500" aria-hidden="true">*</span>}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p role="alert" className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </label>
  );
}

function Done({ title, reference, body }: { title: string; reference?: string; body: string }) {
  return (
    <div className="rounded-[26px] bg-white p-7 text-center shadow-glass">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-[#2A0F4F]"><Icon name="check" className="h-7 w-7" strokeWidth={2.5} /></div>
      <h3 className="mt-4 font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{body}</p>
      {reference && <p className="mt-4 font-display text-2xl font-bold tracking-wide text-brand-purple">{reference}</p>}
    </div>
  );
}

/** General enquiry → existing /api/leads (email + optional WhatsApp alert). */
export function ContactForm() {
  const [v, setV] = useState({ name: "", phone: "", email: "", message: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [ref, setRef] = useState("");
  const started = useRef(Date.now());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Errs = {};
    if (v.name.trim().length < 2) er.name = "Enter your name.";
    if (!v.phone.trim() && !v.email.trim()) er.phone = "Add a phone number or email so we can reply.";
    if (v.phone.trim() && !isValidPhone(v.phone)) er.phone = "Enter a valid phone number, e.g. +254 7XX XXX XXX.";
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) er.email = "Enter a valid email.";
    if (v.message.trim().length < 5) er.message = "Tell us how we can help.";
    setErrs(er);
    if (Object.keys(er).length) return;
    if (Date.now() - started.current < 3000) return;
    setState("sending");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: v.name, phone: v.phone, email: v.email, message: v.message }) });
      const data = await res.json();
      if (!res.ok || !data.ok) { setMsg(data.error || "Something went wrong."); setState("error"); return; }
      setRef(data.reference || "");
      setState("sent");
      track("contact_form_submitted");
    } catch { setMsg("Connection problem. Please try again or message us on WhatsApp."); setState("error"); }
  }

  if (state === "sent") return <Done title="Enquiry received" reference={ref} body="Thank you — our team will reply using the details you gave. Quote this reference if you contact us again." />;

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-[26px] bg-white p-5 shadow-glass sm:p-6">
      <Fld label="Full name" required error={errs.name}><input className="input" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} autoComplete="name" /></Fld>
      <Fld label="Phone / WhatsApp" error={errs.phone}><input className="input" type="tel" inputMode="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} autoComplete="tel" placeholder="+254 7XX XXX XXX" /></Fld>
      <Fld label="Email (optional)" error={errs.email}><input className="input" type="email" inputMode="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} autoComplete="email" /></Fld>
      <Fld label="How can we help?" required error={errs.message}><textarea className="input" rows={4} maxLength={500} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} /></Fld>
      {state === "error" && <p role="alert" className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{msg} <a className="font-semibold underline" href={buildWhatsAppUrl("Hi Ajira Majuu, I tried to send an enquiry from your website.")}>WhatsApp us</a></p>}
      <button type="submit" disabled={state === "sending"} className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-purple text-[15px] font-bold text-white shadow-md disabled:opacity-60 active:scale-[0.98]">
        {state === "sending" ? "Sending…" : <>Send enquiry <Icon name="send" className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

/** Employer manpower request → /api/employers. */
export function EmployerForm() {
  const [v, setV] = useState({ company: "", contactPerson: "", phone: "", email: "", country: "", jobCategory: "", workers: "", experience: "", startDate: "", accommodation: "", food: "", salary: "", notes: "", website: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [ref, setRef] = useState("");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Errs = {};
    if (v.company.trim().length < 2) er.company = "Enter your company or household name.";
    if (v.contactPerson.trim().length < 2) er.contactPerson = "Enter a contact person.";
    if (!v.phone.trim() && !v.email.trim()) er.phone = "Provide a phone number or email.";
    if (v.phone.trim() && !isValidPhone(v.phone)) er.phone = "Include the country code, e.g. +974…";
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) er.email = "Enter a valid email.";
    if (!v.country) er.country = "Select a country.";
    if (!v.jobCategory.trim()) er.jobCategory = "Describe the job category.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/employers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      const data = await res.json();
      if (!res.ok || !data.ok) { if (data.fieldErrors) setErrs(data.fieldErrors); setMsg(data.error || "Something went wrong."); setState("error"); return; }
      setRef(data.reference || ""); setState("sent"); track("employer_enquiry_submitted");
    } catch { setMsg("Connection problem. Please email or call us."); setState("error"); }
  }

  if (state === "sent") return <Done title="Request received" reference={ref} body="Thank you. Our team will contact you. Candidate availability is confirmed case by case — this request doesn’t itself guarantee availability." />;

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-[26px] bg-white p-5 shadow-glass sm:p-6">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} name="website" /></div>
      <Fld label="Company / household" required error={errs.company}><input className="input" value={v.company} onChange={set("company")} autoComplete="organization" /></Fld>
      <Fld label="Contact person" required error={errs.contactPerson}><input className="input" value={v.contactPerson} onChange={set("contactPerson")} autoComplete="name" /></Fld>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fld label="Phone / WhatsApp" error={errs.phone}><input className="input" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} placeholder="+974…" /></Fld>
        <Fld label="Email" error={errs.email}><input className="input" type="email" inputMode="email" value={v.email} onChange={set("email")} autoComplete="email" /></Fld>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fld label="Country" required error={errs.country}>
          <select className="input" value={v.country} onChange={set("country")}><option value="">Select…</option>{destinations.map((d) => <option key={d.slug}>{d.name}</option>)}<option>Other</option></select>
        </Fld>
        <Fld label="Job category" required error={errs.jobCategory}><input className="input" value={v.jobCategory} onChange={set("jobCategory")} placeholder="e.g. Driver, Caregiver" /></Fld>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fld label="Number of workers"><input className="input" type="number" inputMode="numeric" min={1} value={v.workers} onChange={set("workers")} /></Fld>
        <Fld label="Required experience"><input className="input" value={v.experience} onChange={set("experience")} placeholder="e.g. 2+ years" /></Fld>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fld label="Desired start date"><input className="input" type="date" value={v.startDate} onChange={set("startDate")} /></Fld>
        <Fld label="Salary offered"><input className="input" value={v.salary} onChange={set("salary")} placeholder="Amount and currency" /></Fld>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fld label="Accommodation provided?"><select className="input" value={v.accommodation} onChange={set("accommodation")}><option value="">Select…</option><option>Yes</option><option>No</option><option>To be discussed</option></select></Fld>
        <Fld label="Food provided?"><select className="input" value={v.food} onChange={set("food")}><option value="">Select…</option><option>Yes</option><option>No</option><option>To be discussed</option></select></Fld>
      </div>
      <Fld label="Other requirements"><textarea className="input" rows={3} maxLength={1500} value={v.notes} onChange={set("notes")} /></Fld>
      {state === "error" && <p role="alert" className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{msg}</p>}
      <button type="submit" disabled={state === "sending"} className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-orange text-[15px] font-bold text-[#2A0F4F] shadow-md disabled:opacity-60 active:scale-[0.98]">
        {state === "sending" ? "Sending…" : <>Request recruitment support <Icon name="send" className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
