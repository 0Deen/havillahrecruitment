import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { ApplyLink, WhatsAppLink } from "@/components/app/Bits";
import JsonLd from "@/components/app/JsonLd";
import { HOW_IT_WORKS } from "@/data/content";
import { generalWhatsAppMessage } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How Overseas Recruitment Works — 10 Steps",
  description: "From finding a job to deployment: how Ajira Majuu, a private overseas recruitment agency in Kenya, takes you through application, screening, documentation, medical checks, training and pre-departure.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "How it works" }]} />
      <PageHero eyebrow="The process" title="From application to deployment" intro="Ten clear steps. You apply with no account, and our team stays in touch throughout." />
      <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
        <ol className="relative space-y-3">
          <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-gradient-to-b from-brand-purple via-brand-orange to-brand-purple/20" />
          {HOW_IT_WORKS.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 rounded-[26px] bg-white p-4 shadow-sm">
              <span className="relative z-10 flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-brand-purple font-display text-lg font-bold text-white ring-4 ring-[#F4F0FA]">{i + 1}</span>
              <div className="pt-0.5">
                <h2 className="font-display text-lg font-bold text-ink">{s.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ApplyLink href="/apply" source="how-it-works" className="flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-brand-orange text-[15px] font-bold text-[#2A0F4F]">Start your application</ApplyLink>
          <WhatsAppLink message={generalWhatsAppMessage()} source="how-it-works" className="flex-1" />
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "HowTo", name: "How overseas recruitment works with Ajira Majuu", url: `${SITE_URL}/how-it-works`, step: HOW_IT_WORKS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })) }} />
      <Footer />
    </main>
  );
}
