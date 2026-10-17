import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { ContactLink, WhatsAppLink } from "@/components/app/Bits";
import Icon from "@/components/app/Icon";
import { SAFETY_TIPS } from "@/data/content";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recruitment Safety — Avoid Overseas Job Scams",
  description: "How to spot legitimate communication from Ajira Majuu, why contracts matter, what to protect, and how to report suspicious messages. Use only official Ajira Majuu channels.",
  alternates: { canonical: "/recruitment-safety" },
};

export default function SafetyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Recruitment safety" }]} />
      <PageHero eyebrow="Safety & fraud awareness" title="Protect yourself when applying for jobs abroad" intro="Verify before you pay, share or travel. Ajira Majuu never asks you to send money through an unofficial individual." />
      <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
        <div className="rounded-[26px] border-2 border-brand-orange bg-brand-orange/10 p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Icon name="shield" className="h-6 w-6 text-brand-purple" /> Our official channels</h2>
          <ul className="mt-3 space-y-1.5 text-[15px] text-slate-800">
            <li><strong>Phone / WhatsApp:</strong> <ContactLink kind="phone" source="safety" className="font-semibold text-brand-purple underline" /></li>
            <li><strong>Email:</strong> <ContactLink kind="email" source="safety" className="font-semibold text-brand-purple underline" /> · {COMPANY.secondaryEmail}</li>
            <li><strong>Office:</strong> {COMPANY.address}</li>
            <li><strong>Website:</strong> {COMPANY.website}</li>
          </ul>
          <p className="mt-3 text-xs text-slate-600">If a message comes from any other number, account or email, check with us before acting on it.</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SAFETY_TIPS.map((t, i) => (
            <div key={t.title} className="rounded-[26px] bg-white p-5 shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 font-display text-base font-bold text-ink">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[26px] bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg font-bold text-ink">Someone asked you for money?</h2>
          <p className="mt-1 text-sm text-slate-600">Don’t pay yet. Tell us what you were asked for and by whom, and we’ll help you check.</p>
          <WhatsAppLink message="Hi Ajira Majuu, I want to verify a message/request I received about a job." label="Verify on WhatsApp" source="safety" className="mt-3 w-full sm:w-auto" />
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-400">This page offers general guidance, not legal advice.</p>
      </section>
      <Footer />
    </main>
  );
}
