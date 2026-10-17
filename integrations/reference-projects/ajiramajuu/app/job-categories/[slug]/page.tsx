import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOB_CATEGORY_PAGES } from "../data";
import { getActiveJobs } from "@/data/jobs";
import JsonLd from "@/components/app/JsonLd";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return JOB_CATEGORY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = JOB_CATEGORY_PAGES.find((p) => p.slug === params.slug);
  if (!page) return {};
  return {
    title: `${page.title} | Ajira Majuu`,
    description: `${page.intro} Apply through Ajira Majuu, a Kenyan overseas recruitment agency serving Gulf and international opportunities.`,
    alternates: { canonical: `/job-categories/${page.slug}` },
  };
}

export default function JobCategoryPage({ params }: { params: { slug: string } }) {
  const page = JOB_CATEGORY_PAGES.find((p) => p.slug === params.slug);
  if (!page) notFound();
  const jobs = getActiveJobs().filter((job) => {
    const t = `${job.title} ${job.category ?? ""}`.toLowerCase();
    const slug = page.slug.replace("-jobs", "").replaceAll("-", " ");
    return t.includes(slug) || (slug === "hotel" && /hotel|hospitality/i.test(t));
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-0">
      <JsonLd data={[{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: page.title,
        description: page.intro,
        url: `${SITE_URL}/job-categories/${page.slug}`,
        isPartOf: { "@type": "WebSite", name: "Ajira Majuu", url: SITE_URL },
      }]} />
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-purple">Ajira · Kazi · Overseas Opportunities</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-ink">{page.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{page.intro}</p>
      </div>
      <div className="mt-8 rounded-3xl border border-brand-purple/10 bg-brand-purple/[0.035] p-6">
        <h2 className="font-display text-2xl font-bold text-ink">Current {page.title.replace(" for Kenyans", "").replace(" Abroad", "").toLowerCase()}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Ajira Majuu shows vacancy details as supplied for each opportunity. Availability, salary, employer terms and requirements should always be confirmed before making arrangements.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {jobs.length ? jobs.map((job) => <Link key={job.slug} href={`/jobs/${job.slug}`} className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md"><span className="font-bold text-ink">{job.title}</span><span className="mt-1 block text-sm text-slate-500">{job.country}</span></Link>) : <Link href="/jobs" className="rounded-2xl bg-white p-4 font-bold text-brand-purple shadow-sm">Browse all current jobs →</Link>}
        </div>
      </div>
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div><h2 className="font-bold text-ink">Apply directly</h2><p className="mt-2 text-sm leading-6 text-slate-600">Open a live vacancy, review its requirements and submit your application through the official Ajira Majuu application flow.</p></div>
        <div><h2 className="font-bold text-ink">Kenya → Global</h2><p className="mt-2 text-sm leading-6 text-slate-600">Ajira Majuu connects Kenyan candidates with overseas opportunities across Gulf and international destinations.</p></div>
        <div><h2 className="font-bold text-ink">Recruitment safety</h2><p className="mt-2 text-sm leading-6 text-slate-600">Never rely on forwarded job messages alone. Confirm the vacancy, employer terms and official communication channels before paying or sending sensitive documents.</p></div>
      </section>
      <div className="mt-10 flex flex-wrap gap-3"><Link href="/jobs" className="rounded-full bg-brand-purple px-5 py-3 text-sm font-bold text-white">View all jobs</Link><Link href="/recruitment-agency-kenya" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-ink">About Ajira Majuu</Link><Link href="/contact" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-ink">Contact recruitment</Link></div>
    </main>
  );
}
