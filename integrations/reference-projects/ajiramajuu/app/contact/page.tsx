import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { ContactForm } from "@/components/app/Forms";
import { ContactLink, WhatsAppLink } from "@/components/app/Bits";
import Icon from "@/components/app/Icon";
import JsonLd from "@/components/app/JsonLd";
import { COMPANY, SITE_URL } from "@/lib/site";
import { generalWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Ajira Majuu — Nairobi, Kenya",
  description: `Contact Ajira Majuu, a private overseas recruitment agency in Kenya. Call or WhatsApp ${COMPANY.phoneDisplay}, email ${COMPANY.primaryEmail}, or visit us at ${COMPANY.address}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapQ = encodeURIComponent(`${COMPANY.address}, Kenya`);
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero eyebrow={COMPANY.legalDescriptor} title="Talk to Ajira Majuu" intro="Call, WhatsApp, email or send an enquiry. Use only these official channels." />
      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <ContactLink kind="phone" source="contact-page" className="flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-3xl bg-white text-[13px] font-bold text-brand-purple shadow-sm active:scale-95"><Icon name="phone" className="h-6 w-6" /> Call us</ContactLink>
            <WhatsAppLink message={generalWhatsAppMessage()} label="WhatsApp us" source="contact-page" className="!min-h-[84px] !flex-col !rounded-3xl" />
            <ContactLink kind="email" source="contact-page" className="col-span-2 flex min-h-[60px] items-center justify-center gap-2 rounded-3xl bg-white text-[13px] font-bold text-brand-purple shadow-sm active:scale-95"><Icon name="mail" /> Email us</ContactLink>
          </div>
          <dl className="space-y-3 rounded-[26px] bg-white p-5 text-sm shadow-sm">
            <div><dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Phone / WhatsApp</dt><dd className="mt-0.5 font-semibold text-ink"><a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a></dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Email</dt><dd className="mt-0.5 font-semibold text-ink"><a href={`mailto:${COMPANY.primaryEmail}`}>{COMPANY.primaryEmail}</a><br /><a href={`mailto:${COMPANY.secondaryEmail}`} className="text-slate-600">{COMPANY.secondaryEmail}</a></dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Office</dt><dd className="mt-0.5 font-semibold text-ink">{COMPANY.address}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Website</dt><dd className="mt-0.5 font-semibold text-ink">{COMPANY.website}</dd></div>
          </dl>
          <a href={`https://www.google.com/maps/search/?api=1&query=${mapQ}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-brand-purple/25 bg-white text-sm font-semibold text-brand-purple active:scale-95"><Icon name="pin" className="h-5 w-5" /> Get directions</a>
          <p className="rounded-2xl bg-brand-orange/10 p-4 text-xs leading-relaxed text-slate-700">Ajira Majuu will never ask you to send money to an individual. If anyone claims otherwise, contact us here first. <a href="/recruitment-safety" className="font-semibold text-brand-purple underline">Read the safety guide</a>.</p>
        </div>
        <div>
          <h2 className="mb-3 font-display text-2xl font-bold text-brand-purple">Send an enquiry</h2>
          <ContactForm />
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${SITE_URL}/contact`, name: "Contact Ajira Majuu" }} />
      <Footer />
    </main>
  );
}
