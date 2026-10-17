"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { jobs } from "@/data/jobs";
import { JobCard } from "./JobCard";

export function FeaturedJobs() {
  const { t } = useLanguage();

  return (
    <section className="container-content py-16 md:py-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink md:text-3xl">{t("featured.title")}</h2>
          <p className="mt-2 text-sm text-slate">{t("featured.sub")}</p>
        </div>
        <Link href="/jobs" className="text-sm font-medium text-amber-deep hover:underline">
          {t("featured.all")}
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.slice(0, 9).map((job) => (
          <JobCard key={job.slug} job={job} />
        ))}
      </div>
    </section>
  );
}
