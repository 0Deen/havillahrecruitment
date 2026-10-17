import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/app/JsonLd";
import Icon from "@/components/app/Icon";
import TrackView from "@/components/app/TrackView";
import { Accordion, ApplyLink, ContactLink, WhatsAppLink } from "@/components/app/Bits";
import { Crumbs, JobCard, SectionHead } from "@/components/app/Cards";
import { destinationApplyHref, destinations, getDestinationBySlug, getJobsByCountrySlug, QATAR_CONFIRMED_BENEFITS, RECRUITMENT_PROCESS } from "@/data/jobs";
import { SITE_URL } from "@/lib/site";
import { destinationWhatsAppMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return destinations.filter((d) => d.active).map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDestinationBySlug(params.slug);
  if (!d) return { title: "Destination not found", robots: { index: false } };
  const description = `${d.name} job opportunities for Kenyans with Ajira Majuu, a private overseas recruitment agency in Kenya. See current openings, how recruitment works and how to apply — no account required.`;
  return {
    title: `Jobs in ${d.name} for Kenyans`,
    description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: `Jobs in ${d.name} for Kenyans — Ajira Majuu`, description, url: `${SITE_URL}/destinations/${d.slug}`, images: [{ url: d.heroImage, alt: `${d.name}` }] },
    twitter: { card: "summary_large_image", title: `Jobs in ${d.name} — Ajira Majuu`, description, images: [d.heroImage] },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const d = getDestinationBySlug(params.slug);
  if (!d || !d.active) notFound();

  const jobs = getJobsByCountrySlug(d.slug);
  const categories = Array.from(new Set(jobs.map((j) => j.category)));
  const wa = destinationWhatsAppMessage(d.name);
  const applyHref = destinationApplyHref(d);
  const isQatar = d.slug === "qatar";

  const faqs = [
    { q: `How do I apply for jobs in ${d.name}?`, a: "Choose an opportunity and tap Apply, or use the Apply page. No account is needed. You can also message us on WhatsApp." },
    { q: "Do I need an account?", a: "No. There is no login, signup or password. Our recruitment team follows up using the contact details you give." },
    { q: "What documents do I need?", a: "It depends on the role and destination. The form asks about your passport status and lets you upload a CV or certificates if you have them. Our team confirms exactly what is required." },
    { q: "How does Ajira Majuu contact applicants?", a: "By phone or WhatsApp using the details in your application, and by email if you provide one." },
    { q: "What happens after I apply?", a: "You get a reference number. Our team reviews your application and, if it fits a current opportunity, contacts you to continue. Submitting does not guarantee employment." },
    { q: isQatar ? "Are accommodation and food provided?" : `What are the benefits in ${d.name}?`, a: isQatar ? "For the Qatar roles currently listed, Ajira Majuu has confirmed accommodation, food and health insurance are provided. Your contract sets the final terms." : `We haven’t published verified benefits for ${d.name} yet. Contact us for current details.` },
    { q: "What salary is offered?", a: jobs.length ? `See each listed job for its confirmed salary. Final terms are in your employment contract.` : `We haven’t published verified salary figures for ${d.name} yet. Contact us for current details.` },
    { q: "How long does recruitment take?", a: "It depends on the opportunity, employer and documents involved, so we don’t quote a fixed time. Our team will tell you what to expect for your role." },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <TrackView event="destination_viewed" props={{ destination: d.slug }} />

      <section className="relative mx-3 mt-3 h-[58vh] min-h-[380px] overflow-hidden rounded-[30px] sm:mx-6 lg:mx-0">
        <Image src={d.heroImage} alt={`${d.name} skyline`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d0b38]/92 via-[#1d0b38]/35 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-5 pb-6 sm:p-10">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange-light">Ajira Majuu · Private overseas recruitment agency in Kenya</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{d.flag} {d.name} job opportunities</h1>
          <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">{d.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ApplyLink href={applyHref} source="destination-hero" className="flex min-h-[50px] items-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-bold text-[#2A0F4F] shadow-lg active:scale-95">Apply now <Icon name="arrow" className="h-4 w-4" /></ApplyLink>
            <WhatsAppLink message={wa} label={`WhatsApp about ${d.name}`} source="destination-hero" />
          </div>
        </div>
      </section>

      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: d.name }]} />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0">
        <section className="py-6">
          <SectionHead eyebrow="Current opportunities" title={`${d.name} jobs`} />
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {jobs.map((j) => (
                <div key={j.slug} className="flex flex-col">
                  <JobCard job={j} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] bg-white p-7 text-center shadow-sm">
              <h3 className="font-display text-xl font-bold text-ink">No current {d.name} opportunities listed</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">We don’t currently have a matching opportunity listed on the website. Ajira Majuu does recruit for {d.name} — our team can confirm what’s available right now.</p>
              <div className="mt-5 flex flex-col items-center gap-2">
                <WhatsAppLink message={wa} label="Ask on WhatsApp" source="destination-empty" />
                <ApplyLink href={applyHref} source="destination-empty" className="btn-primary">Register your interest</ApplyLink>
                <Link href="/destinations" className="btn-secondary">Explore other destinations</Link>
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-4 py-2 lg:grid-cols-2">
          <div className="rounded-[26px] bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-ink">About working in {d.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Ajira Majuu recruits Kenyan candidates for {d.name} depending on current employer demand. Roles, salaries and conditions vary by employer, so we only publish figures we have confirmed. For anything not shown here, contact the recruitment team rather than relying on third-party information.
            </p>
            {categories.length > 0 && (
              <>
                <h3 className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Available job categories</h3>
                <div className="mt-2 flex flex-wrap gap-2">{categories.map((c) => <span key={c} className="rounded-full bg-brand-purple/10 px-3 py-1.5 text-xs font-semibold text-brand-purple">{c}</span>)}</div>
              </>
            )}
          </div>
          <div className="rounded-[26px] bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-ink">Employment benefits</h2>
            {isQatar ? (
              <>
                <p className="mt-1 text-xs text-slate-500">Confirmed for the Qatar roles listed. Subject to the verified employer’s offer and your contract.</p>
                <ul className="mt-3 space-y-2">{QATAR_CONFIRMED_BENEFITS.map((b) => <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-purple text-white"><Icon name="check" className="h-3 w-3" strokeWidth={3} /></span>{b}</li>)}</ul>
              </>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">We haven’t published verified benefits for {d.name} yet. Contact Ajira Majuu for current details.</p>
            )}
          </div>
        </section>

        <section className="py-8">
          <SectionHead eyebrow="Recruitment process" title="How recruitment works" action={{ label: "Full guide", href: "/how-it-works" }} />
          <div className="ajm-rail">
            {RECRUITMENT_PROCESS.map((s, i) => (
              <div key={s.step} className="w-[230px] rounded-[24px] bg-white p-4 shadow-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-[#2A0F4F]">{i + 1}</span>
                <h3 className="mt-3 font-display text-base font-bold text-ink">{s.step}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] border border-brand-orange/40 bg-brand-orange/10 p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Icon name="alert" className="h-5 w-5 text-brand-purple" /> Important information</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>Salary depends on the verified employer and job.</li>
            <li>Employment terms are governed by your employment contract — review it carefully.</li>
            <li>Job availability changes. Confirm current openings with our team.</li>
            <li>Applying does not guarantee employment.</li>
          </ul>
        </section>

        <section className="py-8">
          <SectionHead title="Frequently asked questions" />
          <Accordion items={faqs} />
        </section>

        <section className="mb-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-brand-purple to-[#2A0F4F] p-6 text-center text-white sm:p-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to apply for {d.name}?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/85">No account needed. Takes a few minutes on your phone. {d.name} is pre-selected for you.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ApplyLink href={applyHref} source="destination-footer" className="flex min-h-[52px] items-center gap-2 rounded-full bg-brand-orange px-7 text-[15px] font-bold text-[#2A0F4F] active:scale-95">Start application <Icon name="arrow" /></ApplyLink>
            <WhatsAppLink message={wa} label="WhatsApp us" source="destination-footer" />
          </div>
          <p className="mt-4 text-xs text-white/70">Or call <ContactLink kind="phone" source="destination-footer" className="font-semibold underline" /> · <ContactLink kind="email" source="destination-footer" className="font-semibold underline" /></p>
        </section>
      </div>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Destinations", item: `${SITE_URL}/destinations` },
        { "@type": "ListItem", position: 3, name: d.name, item: `${SITE_URL}/destinations/${d.slug}` },
      ] }} />
      <Footer />
    </main>
  );
}
