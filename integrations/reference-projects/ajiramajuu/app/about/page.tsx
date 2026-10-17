import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero, SectionHead } from "@/components/app/Cards";
import { ApplyLink, WhatsAppLink } from "@/components/app/Bits";
import { destinations } from "@/data/jobs";
import { COMPANY } from "@/lib/site";
import { generalWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Ajira Majuu — Private Overseas Recruitment Agency in Kenya",
  description: "Ajira Majuu is a private overseas recruitment agency in Kenya connecting Kenyan talent to global opportunities in the Gulf. Learn what we do, who we serve and how recruitment works.",
  alternates: { canonical: "/about" },
};

const BLOCKS = [
  { h: "Who we are", p: `${COMPANY.name} is an independent, ${COMPANY.legalDescriptor.toLowerCase()}, based at ${COMPANY.address}. We are a private business — not a government agency, programme or portal.` },
  { h: "What we do", p: "We connect Kenyan job seekers with overseas employment opportunities, guide them through screening, documentation and preparation, and coordinate with employers." },
  { h: "Who we serve", p: "Kenyan candidates looking for work abroad, and employers, companies and households who need to recruit workers." },
  { h: "Candidate support", p: "Our team answers questions by phone, WhatsApp and email, explains each step, and tells you what your specific opportunity needs — so you aren’t left guessing." },
  { h: "Training and medical checks", p: "Where a role or destination requires training or medical checks, our team explains the steps when you reach that stage. Some roles list a separate training salary and after-training salary." },
  { h: "Pre-departure support", p: "Before travel we brief and prepare candidates, including what to carry and what to expect." },
  { h: "Employer relationships", p: "We work with employers on sourcing, screening, matching and coordination. Candidate availability is confirmed case by case." },
  { h: "Why candidates use us", p: "A clear process, clear contact details, transparent job information, and a reference number for every application. No account needed to apply." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero eyebrow="About us" title={COMPANY.legalDescriptor} intro={COMPANY.tagline}>
        <ApplyLink href="/apply" source="about" className="btn-secondary">Apply now</ApplyLink>
        <WhatsAppLink message={generalWhatsAppMessage()} source="about" />
      </PageHero>
      <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {BLOCKS.map((b) => (
            <div key={b.h} className="rounded-[26px] bg-white p-5 shadow-sm">
              <h2 className="font-display text-lg font-bold text-brand-purple">{b.h}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{b.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <SectionHead title="Countries we serve" />
          <div className="flex flex-wrap gap-2">
            {destinations.map((d) => <Link key={d.slug} href={`/destinations/${d.slug}`} className="min-h-[44px] rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-purple shadow-sm">{d.flag} {d.name}</Link>)}
          </div>
        </div>
        <p className="mt-8 rounded-2xl bg-brand-purple/5 p-4 text-xs leading-relaxed text-slate-600">We do not guarantee jobs, visas or outcomes. Roles, salaries and conditions depend on verified employers and are set out in your employment contract.</p>
      </section>
      <Footer />
    </main>
  );
}
