"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", category: "General enquiry", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch (err) {
      console.error("Contact submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Contact MK Connection Limited</h1>
      <p className="mt-3 max-w-lg text-sm text-slate">
        Reach us directly for recruitment enquiries, employer requests, or support with an existing application.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <InfoRow icon={<Phone size={18} className="text-amber" />} label={`WhatsApp / Phone — ${siteConfig.contactPerson}`} value={siteConfig.whatsapp} href={siteConfig.whatsappLink} />
          <InfoRow icon={<Mail size={18} className="text-amber" />} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <InfoRow icon={<MapPin size={18} className="text-amber" />} label="Office" value={siteConfig.address} />

          <div className="rounded-2xl border border-line bg-sand/40 p-5">
            <p className="text-sm font-medium text-ink">Working hours</p>
            <p className="mt-1 text-sm text-slate">Monday – Friday, 8:00 AM – 5:00 PM (EAT)</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
            <iframe
              title="MK Connection Limited office location"
              src={siteConfig.mapEmbed}
              width="100%"
              height="260"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-line bg-white p-7">
            <h2 className="font-display text-xl text-ink">Message sent</h2>
            <p className="mt-2 text-sm text-slate">Thank you — a member of our team will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
              <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
            </div>
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-amber"
              >
                <option>General enquiry</option>
                <option>Job seeker support</option>
                <option>Employer recruitment request</option>
                <option>Report suspicious activity</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-amber"
              />
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60">
              {submitting ? "Sending…" : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block transition hover:border-amber">{content}</a> : content;
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
