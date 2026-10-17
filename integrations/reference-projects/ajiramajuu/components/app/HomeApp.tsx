// Mobile-app style top of the homepage. Everything a candidate needs is one
// tap away: jobs, apply, WhatsApp, call, email, destinations, safety, FAQ.
// The original homepage sections (GulfShowcase, Hero, JobCategories,
// WhyChooseUs, ContactSection) follow beneath it — nothing was removed.

import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "./Icon";
import { ApplyLink, ContactLink, WhatsAppLink } from "./Bits";
import { DestinationCard, JobCard, SectionHead } from "./Cards";
import { destinations, getActiveJobs } from "@/data/jobs";
import { HOW_IT_WORKS, FAQS } from "@/data/content";
import { COMPANY } from "@/lib/site";
import { generalWhatsAppMessage } from "@/lib/whatsapp";

const QUICK: { label: string; href: string; icon: IconName }[] = [
  { label: "Jobs", href: "/jobs", icon: "briefcase" },
  { label: "Destinations", href: "/destinations", icon: "globe" },
  { label: "Apply", href: "/apply", icon: "send" },
  { label: "AI assistant", href: "/assistant", icon: "sparkles" },
  { label: "How it works", href: "/how-it-works", icon: "route" },
  { label: "Safety", href: "/recruitment-safety", icon: "shield" },
  { label: "FAQ", href: "/faq", icon: "help" },
  { label: "Employers", href: "/for-employers", icon: "users" },
];

export default function HomeApp() {
  const jobs = getActiveJobs();
  const faqs = FAQS.filter((f) => ["apply-account", "apply-after", "safety-money"].includes(f.id));

  return (
    <div className="mx-auto w-full max-w-6xl px-3 pb-4 sm:px-6 lg:px-0">
      {/* hero card */}
      <section className="relative mt-3 overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-purple via-brand-purple-deep to-[#2A0F4F] p-5 pb-6 text-white sm:p-10">
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-orange/25 blur-3xl" />
        <div aria-hidden="true" className="absolute inset-0 opacity-30">
          <Image src="/images/countries/qatar.png" alt="" fill sizes="100vw" className="object-cover mix-blend-luminosity" priority />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="relative block h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/70">
              <Image src="/logo.png" alt="Ajira Majuu" fill sizes="48px" className="object-cover" />
            </span>
            <p className="text-[10.5px] font-bold uppercase leading-snug tracking-[0.16em] text-brand-orange-light">{COMPANY.legalDescriptor}</p>
          </div>
          <h1 className="mt-5 max-w-xl font-display text-[2rem] font-bold leading-[1.1] sm:text-5xl">{COMPANY.tagline}</h1>
          <p className="mt-3 max-w-md text-sm text-white/85 sm:text-base">See the job, understand it, apply in minutes — no account needed. Our team follows up on phone or WhatsApp.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
            <Link href="/jobs" className="flex min-h-[52px] items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-brand-purple shadow-lg active:scale-95">View jobs</Link>
            <ApplyLink href="/apply" source="home-hero" className="flex min-h-[52px] items-center justify-center rounded-full bg-brand-orange px-6 text-sm font-bold text-[#2A0F4F] shadow-lg active:scale-95">Apply now</ApplyLink>
            <WhatsAppLink message={generalWhatsAppMessage()} label="WhatsApp us" source="home-hero" className="col-span-2" />
          </div>
        </div>
      </section>

      {/* quick actions */}
      <nav aria-label="Quick actions" className="mt-4 grid grid-cols-4 gap-2.5">
        {QUICK.map((q) => (
          <Link key={q.href} href={q.href} className="flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-3xl bg-white p-2 text-center shadow-sm transition active:scale-95">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple"><Icon name={q.icon} /></span>
            <span className="text-[11px] font-semibold leading-tight text-ink">{q.label}</span>
          </Link>
        ))}
      </nav>

      {/* contact strip */}
      <section aria-label="Contact" className="mt-4 grid grid-cols-3 gap-2.5">
        <ContactLink kind="phone" source="home" className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-3xl bg-white text-[12px] font-bold text-brand-purple shadow-sm active:scale-95"><Icon name="phone" /> Call</ContactLink>
        <WhatsAppLink message={generalWhatsAppMessage()} label="WhatsApp" source="home" className="!min-h-[64px] !flex-col !gap-1 !rounded-3xl !px-2 !text-[12px]" />
        <ContactLink kind="email" source="home" className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-3xl bg-white text-[12px] font-bold text-brand-purple shadow-sm active:scale-95"><Icon name="mail" /> Email</ContactLink>
      </section>

      {/* current jobs */}
      <section className="mt-8" aria-labelledby="home-jobs">
        <SectionHead eyebrow="Current jobs" title="Open opportunities" action={{ label: "See all", href: "/jobs" }} />
        <div className="ajm-rail -mx-3 px-3 sm:mx-0 sm:px-0">
          {jobs.map((j) => <div key={j.slug} className="w-[262px] sm:w-[290px]"><JobCard job={j} compact /></div>)}
        </div>
      </section>

      {/* destinations */}
      <section className="mt-8">
        <SectionHead eyebrow="Destinations" title="Where we recruit for" action={{ label: "All", href: "/destinations" }} />
        <div className="ajm-rail -mx-3 px-3 sm:mx-0 sm:px-0">
          {destinations.filter((d) => d.active).map((d) => <div key={d.slug} className="w-[220px] sm:w-[260px]"><DestinationCard d={d} tall /></div>)}
        </div>
      </section>

      {/* how it works */}
      <section className="mt-8 rounded-[28px] bg-white p-5 shadow-sm">
        <SectionHead eyebrow="How it works" title="Simple, step by step" action={{ label: "Details", href: "/how-it-works" }} />
        <ol className="ajm-rail">
          {HOW_IT_WORKS.slice(0, 5).map((s, i) => (
            <li key={s.title} className="w-[180px] rounded-3xl bg-brand-purple/5 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">{i + 1}</span>
              <p className="mt-2 text-[13.5px] font-bold text-ink">{s.title}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* safety */}
      <Link href="/recruitment-safety" className="mt-6 flex items-center gap-4 rounded-[28px] border-2 border-brand-orange/50 bg-brand-orange/10 p-5">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-brand-orange/30 text-brand-purple"><Icon name="shield" className="h-6 w-6" /></span>
        <span className="text-sm text-slate-700"><strong className="block font-display text-base text-ink">Recruitment safety</strong>Never send money to an individual. Verify through our official channels first.</span>
        <Icon name="right" className="h-5 w-5 flex-none text-brand-purple" />
      </Link>

      {/* faq preview */}
      <section className="mt-8">
        <SectionHead eyebrow="FAQ" title="Quick answers" action={{ label: "All questions", href: "/faq" }} />
        <ul className="space-y-2.5">
          {faqs.map((f) => (
            <li key={f.id}>
              <Link href={`/faq#${f.id}`} className="flex min-h-[60px] items-center justify-between gap-3 rounded-3xl bg-white px-5 py-3 shadow-sm">
                <span className="text-sm font-semibold text-ink">{f.q}</span>
                <Icon name="right" className="h-4 w-4 flex-none text-brand-purple" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* final CTA */}
      <section className="mt-8 rounded-[30px] bg-gradient-to-br from-brand-purple to-[#2A0F4F] p-6 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Ready to apply?</h2>
        <p className="mx-auto mt-1 max-w-xs text-sm text-white/85">No account. A few minutes on your phone. Reference number straight away.</p>
        <ApplyLink href="/apply" source="home-final" className="mx-auto mt-4 flex min-h-[54px] max-w-xs items-center justify-center gap-2 rounded-full bg-brand-orange text-[15px] font-bold text-[#2A0F4F] active:scale-95">Start application <Icon name="arrow" /></ApplyLink>
      </section>

      <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">More from Ajira Majuu</p>
    </div>
  );
}
