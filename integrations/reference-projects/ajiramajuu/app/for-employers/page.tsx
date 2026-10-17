import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { EmployerForm } from "@/components/app/Forms";
import { WhatsAppLink } from "@/components/app/Bits";
import { EMPLOYER_SERVICES } from "@/data/content";
import { employerWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "For Employers — Recruit Kenyan Workers",
  description: "Employers, companies and households: Ajira Majuu, a private overseas recruitment agency in Kenya, supports candidate sourcing, screening, matching, documentation and pre-departure preparation.",
  alternates: { canonical: "/for-employers" },
};

export default function EmployersPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "For employers" }]} />
      <PageHero eyebrow="For employers" title="Recruit Kenyan workers with a private agency" intro="Tell us what you need. We confirm candidate availability case by case — never in advance.">
        <WhatsAppLink message={employerWhatsAppMessage()} label="WhatsApp our team" source="employers" />
      </PageHero>
      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          {EMPLOYER_SERVICES.map((s) => (
            <div key={s.title} className="rounded-[24px] bg-white p-4 shadow-sm">
              <h2 className="font-display text-base font-bold text-brand-purple">{s.title}</h2>
              <p className="mt-0.5 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
        <div id="request">
          <h2 className="mb-3 font-display text-2xl font-bold text-brand-purple">Request recruitment support</h2>
          <EmployerForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
