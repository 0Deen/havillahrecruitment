import Link from "next/link";
import { SITE_URL, COMPANY } from "@/lib/site";
import { getActiveJobs } from "@/data/jobs";
import { SEO_LANDINGS } from "@/data/seo";
import JsonLd from "@/components/app/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/app/Icon";
import { Crumbs } from "@/components/app/Cards";

export default function SeoLandingPage({ slug }: { slug: string }) {
  const page = SEO_LANDINGS[slug];
  const jobs = getActiveJobs();
  if (!page) return null;

  const relatedJobs = jobs.slice(0, 6);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />

      <section className="mx-3 mt-3 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2A0F4F] via-brand-purple to-[#5b25a3] text-white sm:mx-6 lg:mx-auto lg:max-w-6xl">
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="font-label text-[11px] font-bold uppercase tracking-[0.22em] text-brand-orange-light">{page.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-black leading-[1.04] sm:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{page.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/jobs" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-extrabold text-[#2A0F4F] shadow-lg transition hover:-translate-y-0.5">
                Browse current jobs <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/apply" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur">
                Apply now <Icon name="send" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-7 sm:px-6 lg:grid-cols-3 lg:px-0">
        {[
          { value: `${jobs.length}`, label: "live job listings", note: "Current structured opportunities" },
          { value: "6", label: "Gulf destinations", note: "Qatar, Kuwait, Saudi, UAE, Bahrain & Oman" },
          { value: "1", label: "direct application path", note: "No candidate account required" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-display text-3xl font-black text-brand-purple">{stat.value}</p>
            <p className="mt-1 text-sm font-extrabold text-ink">{stat.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{stat.note}</p>
          </div>
        ))}
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-0">
        <article className="space-y-5">
          {page.sections.map((section) => (
            <section key={section.heading} className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold text-ink">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-7 text-slate-600">
                {section.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          ))}

          <section className="rounded-[28px] border border-brand-orange/35 bg-brand-orange/10 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">Search, verify, then apply</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
              Ajira Majuu keeps vacancy details tied to individual job pages. Salaries, requirements and availability can change, so confirm the current opportunity with the recruitment team and read your contract before signing.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/recruitment-safety" className="btn-secondary">Recruitment safety</Link>
              <Link href="/how-it-works" className="btn-secondary">How it works</Link>
              <Link href="/contact" className="btn-secondary">Official contacts</Link>
            </div>
          </section>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-[28px] bg-[#1d0b38] p-6 text-white shadow-glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange-light">Ajira Majuu</p>
            <h2 className="mt-2 font-display text-2xl font-bold">A direct route from Kenya to opportunity</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">{COMPANY.legalDescriptor}. {COMPANY.tagline}</p>
            <Link href="/apply" className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-brand-orange px-5 text-sm font-extrabold text-[#2A0F4F]">
              Start an application
            </Link>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink">Explore related pages</h2>
            <div className="mt-4 space-y-2">
              {page.links.map((link) => (
                <Link key={link.href} href={link.href} className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-100 p-3 transition hover:border-brand-purple/20 hover:bg-brand-purple/5">
                  <span>
                    <span className="block text-sm font-bold text-ink">{link.label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">{link.description}</span>
                  </span>
                  <Icon name="arrow" className="mt-1 h-4 w-4 flex-none text-brand-purple transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink">Current vacancies</h2>
            <div className="mt-4 space-y-2">
              {relatedJobs.map((job) => (
                <Link key={job.slug} href={`/jobs/${job.slug}`} className="block rounded-2xl bg-slate-50 p-3 hover:bg-brand-purple/5">
                  <p className="text-sm font-bold text-ink">{job.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{job.country} · {job.salary}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.metaTitle,
          description: page.description,
          url: `${SITE_URL}/${page.slug}`,
          isPartOf: { "@type": "WebSite", name: COMPANY.name, url: SITE_URL },
          about: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: page.title, item: `${SITE_URL}/${page.slug}` },
          ],
        },
      ]} />
      <Footer />
    </main>
  );
}
