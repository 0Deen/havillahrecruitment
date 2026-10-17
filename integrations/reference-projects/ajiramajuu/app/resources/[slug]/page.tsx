import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { ApplyLink, WhatsAppLink } from "@/components/app/Bits";
import JsonLd from "@/components/app/JsonLd";
import { RESOURCES, getResource } from "@/data/content";
import { SITE_URL } from "@/lib/site";
import { generalWhatsAppMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return RESOURCES.filter((r) => r.status === "published").map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug);
  if (!r) return { title: "Guide not found", robots: { index: false } };
  return {
    title: r.title,
    description: `${r.summary} A guide from Ajira Majuu, a private overseas recruitment agency in Kenya.`,
    alternates: { canonical: `/resources/${r.slug}` },
    openGraph: { title: `${r.title} — Ajira Majuu`, description: r.summary, url: `${SITE_URL}/resources/${r.slug}`, type: "article" },
  };
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug);
  if (!r) notFound();
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: r.title }]} />
      <PageHero eyebrow={r.category} title={r.title} intro={r.summary} />
      <article className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
        {r.sections.map((s) => (
          <section key={s.heading} className="mb-3 rounded-[26px] bg-white p-5 shadow-sm">
            <h2 className="font-display text-xl font-bold text-brand-purple">{s.heading}</h2>
            {s.body.length === 1 ? (
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{s.body[0]}</p>
            ) : (
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-slate-700">{s.body.map((b) => <li key={b}>{b}</li>)}</ul>
            )}
          </section>
        ))}
        <div className="mt-5 rounded-[26px] bg-brand-purple/5 p-5">
          <h2 className="text-sm font-bold text-ink">Next steps</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {r.related.map((l) => <Link key={l.href} href={l.href} className="min-h-[44px] rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-purple shadow-sm">{l.label}</Link>)}
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <ApplyLink href="/apply" source={`resource-${r.slug}`} className="flex min-h-[50px] flex-1 items-center justify-center rounded-full bg-brand-orange font-bold text-[#2A0F4F]">Apply now</ApplyLink>
            <WhatsAppLink message={generalWhatsAppMessage()} source={`resource-${r.slug}`} className="flex-1" />
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-400">Last updated {r.updatedAt}. General guidance — not legal advice.</p>
      </article>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: r.title, dateModified: r.updatedAt, author: { "@type": "Organization", name: "Ajira Majuu" }, publisher: { "@type": "Organization", name: "Ajira Majuu" } }} />
      <Footer />
    </main>
  );
}
