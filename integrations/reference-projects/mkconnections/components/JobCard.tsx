"use client";

import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { Job } from "@/data/jobs";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SafeImage } from "@/components/SafeImage";
import { GENERIC_FALLBACK } from "@/lib/job-images";

export function JobCard({ job }: { job: Job }) {
  const { t } = useLanguage();

  return (
    <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-amber hover:shadow-soft">
      {job.image && (
        <Link href={`/jobs/${job.slug}`} aria-label={job.title} className="relative block aspect-[16/10] overflow-hidden bg-blue-50">
          <SafeImage
            src={job.image.src}
            fallback={job.image.fallback || GENERIC_FALLBACK}
            alt={`${job.title} — ${job.country}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10233f]/55 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#2f2aa5] shadow-sm backdrop-blur">
            {job.category}
          </span>
          {job.posted === "New" && (
            <span className="absolute right-3 top-3 rounded-full bg-[#2f2aa5] px-3 py-1 text-[11px] font-bold text-white shadow-sm">New</span>
          )}
        </Link>
      )}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg text-ink">{job.title}</h3>
            <p className="text-sm text-slate">{job.employer}</p>
          </div>
          {job.verified && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber/10 px-2.5 py-1 text-[11px] font-medium text-amber-deep">
              <BadgeCheck size={13} /> Verified
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-sm text-slate">
          <MapPin size={14} />
          {job.city}, {job.country}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate">
          <span>{job.salary}</span>
          <span>{job.contract}</span>
          <span>{job.experience}</span>
          <span>{job.posted}</span>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          href={`/jobs/${job.slug}`}
          className="mt-6 inline-block w-full rounded-full border border-ink px-4 py-2.5 text-center text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
        >
          {t("featured.view")}
        </Link>
      </div>
    </div>
  );
}
