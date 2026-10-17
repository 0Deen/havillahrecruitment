import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { ApplyLink } from "./Bits";
import { getJobsByCountrySlug, jobApplyHref, type Destination, type Job } from "@/data/jobs";

export function JobCard({ job, compact = false }: { job: Job; compact?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-sm transition hover:shadow-glass-lg">
      <Link href={`/jobs/${job.slug}`} className="relative block h-36 w-full overflow-hidden sm:h-40" aria-label={`View ${job.title}`}>
        <Image src={job.image} alt={`${job.title} — ${job.country}`} fill sizes="(max-width:640px) 80vw, (max-width:1280px) 33vw, 320px" className="object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-brand-purple shadow-sm">{job.country}</span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-600/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Open</span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-orange">{job.category}</p>
        <h3 className="mt-0.5 font-display text-[17px] font-bold leading-snug text-ink">{job.title}</h3>
        <p className="mt-1.5 text-[14px] font-bold text-brand-purple">{job.salary}</p>
        {!compact && job.experience && <p className="mt-1 text-xs text-slate-500">Experience: {job.experience}</p>}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link href={`/jobs/${job.slug}`} className="flex min-h-[46px] items-center justify-center rounded-full border border-brand-purple/25 text-[13px] font-semibold text-brand-purple active:scale-95">View job</Link>
          <ApplyLink href={jobApplyHref(job)} source="job-card" className="flex min-h-[46px] items-center justify-center rounded-full bg-brand-purple text-[13px] font-bold text-white active:scale-95">Apply now</ApplyLink>
        </div>
      </div>
    </article>
  );
}

export function DestinationCard({ d, tall = false }: { d: Destination; tall?: boolean }) {
  const n = getJobsByCountrySlug(d.slug).length;
  return (
    <Link href={`/destinations/${d.slug}`} className={`group relative flex flex-col justify-end overflow-hidden rounded-[26px] shadow-sm ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
      <Image src={d.thumbImage} alt={`${d.name} skyline`} fill sizes="(max-width:640px) 70vw, (max-width:1280px) 33vw, 360px" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d0b38]/90 via-[#1d0b38]/25 to-transparent" />
      <div className="relative p-4">
        <h3 className="font-display text-xl font-bold text-white">{d.flag} {d.name}</h3>
        <p className="mt-0.5 text-xs text-white/80">{n > 0 ? `${n} current ${n === 1 ? "opportunity" : "opportunities"}` : "Contact us for current openings"}</p>
        <span className="mt-2.5 inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-brand-orange px-4 text-xs font-bold text-[#2A0F4F]">View {d.name} opportunities <Icon name="arrow" className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: { label: string; href: string } }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-bold text-brand-purple sm:text-3xl">{title}</h2>
      </div>
      {action && <Link href={action.href} className="flex-none text-sm font-semibold text-brand-purple underline-offset-4 hover:underline">{action.label} →</Link>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-[30px] bg-gradient-to-br from-brand-purple via-brand-purple-deep to-[#2A0F4F] px-5 pb-8 pt-8 text-white sm:mx-6 sm:px-10 sm:pb-12 sm:pt-12 lg:mx-0">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-orange/20 blur-3xl" />
      <p className="relative font-label text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange-light">{eyebrow}</p>
      <h1 className="relative mt-2 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
      {intro && <p className="relative mt-3 max-w-xl text-sm text-white/85 sm:text-base">{intro}</p>}
      {children && <div className="relative mt-5 flex flex-wrap gap-3">{children}</div>}
    </section>
  );
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="px-4 pt-4 text-xs text-slate-500 sm:px-6 lg:px-0">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {c.href ? <Link href={c.href} className="hover:text-brand-purple">{c.label}</Link> : <span className="font-medium text-slate-700" aria-current="page">{c.label}</span>}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
