import { notFound } from "next/navigation";
import Link from "next/link";
import { BadgeCheck, MapPin, ShieldAlert } from "lucide-react";
import { jobs } from "@/data/jobs";
import { SafeImage } from "@/components/SafeImage";
import { GENERIC_FALLBACK } from "@/lib/job-images";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = jobs.find((j) => j.slug === params.slug);
  if (!job) return notFound();

  return (
    <div className="container-content py-14 md:py-20">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          {job.image && !job.flyer && (
            <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-3xl bg-blue-50 shadow-soft">
              <SafeImage src={job.image.src} fallback={job.image.fallback || GENERIC_FALLBACK} alt={`${job.title} — ${job.country}`} fill priority sizes="(max-width: 768px) 100vw, 800px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10233f]/50 via-transparent to-transparent" />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl text-ink md:text-4xl">{job.title}</h1>
            {job.verified && (
              <span className="flex items-center gap-1 rounded-full bg-amber/10 px-3 py-1 text-xs font-medium text-amber-deep">
                <BadgeCheck size={14} /> Verified employer
              </span>
            )}
          </div>
          <p className="mt-2 text-slate">{job.employer}</p>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate">
            <MapPin size={14} /> {job.city}, {job.country}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-sand/40 p-5 sm:grid-cols-4">
            <Field label="Salary" value={job.salary} />
            <Field label="Contract" value={job.contract} />
            <Field label="Experience" value={job.experience} />
            <Field label="Posted" value={job.posted} />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">About this role</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{job.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-ink">Requirements</h2>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-slate">
              {job.requirements.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-ink">Benefits</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.benefits.map((b) => (
                <span key={b} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink">{b}</span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber/30 bg-amber/5 p-5">
            <ShieldAlert size={20} className="mt-0.5 shrink-0 text-amber-deep" />
            <p className="text-sm text-ink/80">
              <span className="font-medium text-ink">Important applicant notice:</span> Never pay an unofficial individual for this opportunity. All communication about this role should go through MK Connection Limited's official channels only.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-white p-6 shadow-soft md:sticky md:top-28">
          {job.flyer && (
            <a href={job.flyer.src} target="_blank" rel="noopener noreferrer" className="relative mb-5 block overflow-hidden rounded-xl border border-line bg-blue-50">
              <SafeImage src={job.flyer.src} fallback={job.flyer.fallback || GENERIC_FALLBACK} alt={`${job.title} recruitment flyer`} width={800} height={1100} priority sizes="(max-width: 768px) 100vw, 380px" className="h-auto w-full" />
            </a>
          )}
          <p className="text-sm text-slate">Ready to take the next step?</p>
          <Link
            href="/#apply"
            className="mt-4 block rounded-full bg-amber px-5 py-3 text-center text-sm font-medium text-ink transition hover:bg-amber-deep"
          >
            Apply Now
          </Link>
          <Link
            href="/jobs"
            className="mt-3 block rounded-full border border-line px-5 py-3 text-center text-sm text-ink transition hover:border-amber"
          >
            Back to all jobs
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate">{label}</p>
      <p className="mt-1 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
