import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/app/JsonLd";
import Icon from "@/components/app/Icon";
import { Accordion, ApplyLink, ContactLink, StickyApplyBar, WhatsAppLink } from "@/components/app/Bits";
import { Crumbs, JobCard, SectionHead } from "@/components/app/Cards";
import TrackView from "@/components/app/TrackView";
import { getActiveJobs, getDestinationBySlug, getJobBySlug, getJobsByCountrySlug, jobApplyHref } from "@/data/jobs";
import { RECRUITMENT_PROCESS } from "@/data/jobs";
import { COMPANY, SITE_URL } from "@/lib/site";
import { jobWhatsAppMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return getActiveJobs().map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = getJobBySlug(params.slug);
  if (!job || job.status !== "active") return { title: "Job not found", robots: { index: false } };
  const title = `${job.title} Jobs in ${job.country} for Kenyans`;
  const description = `${job.title} opportunity in ${job.country} with Ajira Majuu, a private overseas recruitment agency in Kenya. Salary: ${job.salary}. Apply directly — no account required.`;
  return {
    title,
    description,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { title: `${job.title} Jobs in ${job.country} — Ajira Majuu`, description, url: `${SITE_URL}/jobs/${job.slug}`, type: "article", images: [{ url: job.image, alt: `${job.title} — ${job.country}` }] },
    twitter: { card: "summary_large_image", title: `${job.title} — ${job.country} | Ajira Majuu`, description, images: [job.image] },
  };
}

const UNKNOWN = "Contact Ajira Majuu for current details.";

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job || job.status !== "active") notFound();

  const destination = getDestinationBySlug(job.countrySlug);
  const related = getJobsByCountrySlug(job.countrySlug).filter((j) => j.slug !== job.slug);
  const waMsg = jobWhatsAppMessage(job.title, job.country);
  const applyUrl = jobApplyHref(job);

  const facts: [string, string][] = [
    ["Country", job.country],
    ["Category", job.category],
    ["Salary", job.salary],
    ["Experience", job.experience ?? UNKNOWN],
    ["Location", "Confirmed by the recruitment team"],
    ["Status", "Open — confirm current availability"],
  ];

  const faqs = [
    { q: "Do I need an account to apply?", a: "No. Apply directly with your details. There is no login, signup or password." },
    { q: "What happens after I apply?", a: "You receive a reference number. Our team reviews your application and contacts you by phone or WhatsApp. Submitting does not guarantee employment." },
    { q: "Is the salary guaranteed?", a: "The salary shown is the figure Ajira Majuu has confirmed for this opportunity. Your employment contract sets your final terms — read it carefully before signing." },
    { q: "What documents do I need?", a: "It depends on the role. The application form lets you upload a CV or certificates if you have them, and our team confirms exactly what your role needs." },
  ];

  return (
    <main className="min-h-screen pb-24 lg:pb-0">
      <Navbar />
      <TrackView event="job_viewed" props={{ job: job.slug, country: job.countrySlug }} />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Jobs", href: "/jobs" }, ...(destination ? [{ label: destination.name, href: `/destinations/${destination.slug}` }] : []), { label: job.title }]} />

      <section className="mx-auto mt-3 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-0">
        <div>
          <div className="relative h-60 w-full overflow-hidden rounded-[30px] sm:h-80">
            <Image src={job.image} alt={`${job.title} — ${job.country}`} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d0b38]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-5 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-light">{job.country} · {job.category}</p>
              <h1 className="mt-1 font-display text-3xl font-bold leading-tight sm:text-4xl">{job.title}</h1>
            </div>
          </div>

          <div className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Salary</p>
            <p className="mt-0.5 font-display text-2xl font-bold text-brand-purple">{job.salary}</p>
            {job.note && <p className="mt-1 text-sm text-slate-600">{job.note}</p>}
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {facts.slice(0, 2).concat(facts.slice(3)).map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-brand-purple/5 p-3">
                  <dt className="text-[10.5px] font-bold uppercase tracking-wide text-slate-500">{k}</dt>
                  <dd className="mt-0.5 text-[13px] font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {job.benefits.length > 0 && (
            <Block title="Confirmed benefits" note="Subject to the verified employer’s offer and your employment contract.">
              <ul className="space-y-2.5">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-purple text-white"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /></span>{b}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block title="Requirements">
            {job.requirements?.length ? <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">{job.requirements.map((r) => <li key={r}>{r}</li>)}</ul> : <p className="text-sm text-slate-600">{UNKNOWN} Our team will confirm what this role requires when you apply.</p>}
          </Block>
          <Block title="Responsibilities">
            {job.responsibilities?.length ? <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">{job.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul> : <p className="text-sm text-slate-600">{UNKNOWN}</p>}
          </Block>

          <Block title="Application process">
            <ol className="space-y-3">
              {RECRUITMENT_PROCESS.map((s, i) => (
                <li key={s.step} className="flex gap-3">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-[#2A0F4F]">{i + 1}</span>
                  <span className="text-sm text-slate-700"><strong className="text-ink">{s.step}.</strong> {s.detail}</span>
                </li>
              ))}
            </ol>
            <Link href="/how-it-works" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">Full process explained <Icon name="arrow" className="h-4 w-4" /></Link>
          </Block>

          <div className="mt-4 rounded-[26px] border border-brand-orange/40 bg-brand-orange/10 p-5">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink"><Icon name="alert" className="h-5 w-5 text-brand-purple" /> Important notes</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              <li>Figures come from the employer information Ajira Majuu has on file for this opportunity.</li>
              <li>Your signed employment contract governs your final terms. Review it carefully.</li>
              <li>Availability changes. Confirm with our team before making any arrangements.</li>
              <li>Applying does not guarantee employment. Never send money to an individual — <Link href="/recruitment-safety" className="font-semibold text-brand-purple underline">read our safety guide</Link>.</li>
            </ul>
          </div>

          <div className="mt-6"><SectionHead title="Questions about this job" /><Accordion items={faqs} /></div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-[28px] bg-white p-5 shadow-glass">
            <h2 className="font-display text-xl font-bold text-ink">Apply for this position</h2>
            <p className="mt-1 text-sm text-slate-600">No account needed. Your choices are pre-filled — you only add your details.</p>
            <ApplyLink href={applyUrl} source="job-page" className="mt-4 flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-brand-orange text-[15px] font-bold text-[#2A0F4F] shadow-md active:scale-[0.98]">Apply for this position <Icon name="arrow" /></ApplyLink>
            <WhatsAppLink message={waMsg} label="WhatsApp about this role" source="job-page" className="mt-2.5 w-full" />
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[13px] font-semibold text-brand-purple">
              <ContactLink kind="phone" source="job-page" className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-full border border-brand-purple/20"><Icon name="phone" className="h-4 w-4" /> Call</ContactLink>
              <ContactLink kind="email" source="job-page" className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-full border border-brand-purple/20"><Icon name="mail" className="h-4 w-4" /> Email</ContactLink>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-400">{COMPANY.legalDescriptor}</p>
          </div>
          {destination && (
            <Link href={`/destinations/${destination.slug}`} className="group relative mt-4 flex h-28 items-end overflow-hidden rounded-[24px]">
              <Image src={destination.thumbImage} alt="" fill sizes="400px" className="object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d0b38]/85 to-transparent" />
              <span className="relative p-4 text-sm font-bold text-white">{destination.flag} Explore working in {destination.name} →</span>
            </Link>
          )}
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 lg:px-0">
          <SectionHead eyebrow="Related jobs" title={`Other ${job.country} opportunities`} action={{ label: "All jobs", href: "/jobs" }} />
          <div className="ajm-rail">{related.map((r) => <div key={r.slug} className="w-[260px] sm:w-[290px]"><JobCard job={r} compact /></div>)}</div>
        </section>
      )}

      {job.publishedAt && job.requirements?.length && job.responsibilities?.length && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: [
              `<p>${job.title} opportunity in ${job.country} with Ajira Majuu.</p>`,
              `<p><strong>Salary:</strong> ${job.salary}</p>`,
              `<p><strong>Requirements:</strong> ${job.requirements.join("; ")}</p>`,
              `<p><strong>Responsibilities:</strong> ${job.responsibilities.join("; ")}</p>`,
            ].join(""),
            datePosted: job.publishedAt,
            ...(job.validThrough ? { validThrough: job.validThrough } : {}),
            employmentType: "FULL_TIME",
            hiringOrganization: { "@type": "Organization", name: COMPANY.name, sameAs: SITE_URL, logo: `${SITE_URL}/logo.png` },
            jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: job.country } },
            directApply: true,
            url: `${SITE_URL}/jobs/${job.slug}`,
          }}
        />
      )}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Jobs", item: `${SITE_URL}/jobs` },
        { "@type": "ListItem", position: 3, name: job.title, item: `${SITE_URL}/jobs/${job.slug}` },
      ] }} />

      <StickyApplyBar applyHref={applyUrl} waMessage={waMsg} />
      <Footer />
    </main>
  );
}

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      {note && <p className="mb-3 mt-0.5 text-xs text-slate-500">{note}</p>}
      <div className={note ? "" : "mt-3"}>{children}</div>
    </section>
  );
}
