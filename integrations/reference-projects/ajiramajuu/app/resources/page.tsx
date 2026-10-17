import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import Icon from "@/components/app/Icon";
import { RESOURCES } from "@/data/content";

export const metadata: Metadata = {
  title: "Candidate Resource Centre — Working Abroad Guides",
  description: "Practical guides for Kenyans working abroad: passports and documents, interviews, employment contracts, recruitment safety and pre-departure preparation.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const list = RESOURCES.filter((r) => r.status === "published");
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
      <PageHero eyebrow="Candidate resource centre" title="Guides for working abroad" intro="Short, practical guides — written to be useful, not to sell." />
      <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((r) => (
            <Link key={r.slug} href={`/resources/${r.slug}`} className="group flex flex-col rounded-[26px] bg-white p-5 shadow-sm transition hover:shadow-glass-lg">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">{r.category}</span>
              <h2 className="mt-1 font-display text-lg font-bold leading-snug text-ink">{r.title}</h2>
              <p className="mt-1.5 flex-1 text-sm text-slate-600">{r.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">Read guide <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/faq" className="rounded-[26px] bg-brand-purple/5 p-5 text-sm font-semibold text-brand-purple">Frequently asked questions →</Link>
          <Link href="/recruitment-safety" className="rounded-[26px] bg-brand-orange/15 p-5 text-sm font-semibold text-brand-purple">Recruitment safety →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
