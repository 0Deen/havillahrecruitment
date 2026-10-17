"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, Search, X, Home as HomeIcon, Car, HardHat, UtensilsCrossed,
  SprayCan, ShieldCheck, Leaf, MapPin, Wallet, CalendarClock, MessageCircle,
} from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { JOB_CATEGORIES, type CountryMeta, type UnifiedJob, getJobsForCountry } from "@/data/country-jobs";
import { CountryApplyModal } from "./CountryApplyModal";
import { TrustStrip } from "./CountrySelector";

const CATEGORY_ICON: Record<string, typeof HomeIcon> = {
  Domestic: HomeIcon,
  Driving: Car,
  Construction: HardHat,
  Hospitality: UtensilsCrossed,
  Cleaning: SprayCan,
  Security: ShieldCheck,
};

export function CountryPageClient({ country }: { country: CountryMeta }) {
  const router = useRouter();
  const allJobs = useMemo(() => getJobsForCountry(country.name), [country.name]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [detailJob, setDetailJob] = useState<UnifiedJob | null>(null);
  const [applyJob, setApplyJob] = useState<UnifiedJob | null>(null);

  const filtered = allJobs.filter((j) => {
    const matchesQuery = j.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || j.category === category;
    return matchesQuery && matchesCategory;
  });

  const stickyJob = detailJob ?? filtered[0] ?? null;

  return (
    <div className="jbc min-h-screen pb-28 md:pb-16">
      {/* ---------------- hero banner ---------------- */}
      <div className="jbc-linen relative h-[280px] w-full overflow-hidden bg-navy-900 sm:h-[320px]">
        <SafeImage
          src={country.heroImage}
          fallback={country.heroImageFallback}
          alt={country.name}
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/20" />

        {/* back button lives inside the hero, so it never fights the site's
            own fixed header/sidebar for screen space */}
        <div className="container-content relative pt-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-cream-100 backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="container-content relative -mt-10 flex h-[calc(100%-56px)] flex-col items-center justify-center text-center sm:-mt-12">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-100/90 text-4xl shadow-jbc-lg">{country.flag}</span>
          <h1 className="mt-4 font-display text-3xl text-cream-100 md:text-4xl">
            {country.name === "United Arab Emirates" ? "United Arab Emirates" : country.name}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-cream-300">
            <Leaf size={14} className="text-sand-500" /> {country.tagline}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-sand-500">
            {filtered.length} of {allJobs.length} roles · paid in {country.currency}
          </p>
        </div>
      </div>

      <TrustStrip />

      {/* ---------------- search + filters ---------------- */}
      {/* top offset clears the site's own sticky header instead of fighting it for row 0 */}
      <div className="container-content sticky top-16 z-20 -mt-px bg-cream-100/95 py-4 backdrop-blur lg:top-20">
        <div className="flex items-center gap-2 rounded-full border border-cream-300 bg-white-soft px-4 py-2.5 shadow-jbc">
          <Search size={16} className="text-jbc-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${country.name} jobs…`}
            className="w-full bg-transparent text-sm text-navy-900 outline-none placeholder:text-jbc-muted/70"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search" className="text-jbc-muted hover:text-navy-900">
              <X size={15} />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {["All", ...JOB_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                category === c ? "bg-navy-900 text-cream-100 shadow-jbc" : "border border-cream-300 bg-white-soft text-navy-900 hover:border-sand-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- job list ---------------- */}
      <div className="container-content mt-4">
        {filtered.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-cream-300 bg-white-soft p-10 text-center">
            <p className="font-display text-lg text-navy-900">No roles match that search yet</p>
            <p className="mt-1 text-sm text-jbc-muted">Try a different word, or clear the category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {filtered.map((job, i) => {
              const Icon = CATEGORY_ICON[job.category] ?? Wallet;
              return (
                <motion.button
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04 }}
                  onClick={() => setDetailJob(job)}
                  className="group flex items-center gap-4 rounded-[20px] border border-cream-300 bg-white-soft p-4 text-left shadow-jbc transition-all hover:-translate-y-0.5 hover:border-sand-500 hover:shadow-jbc-lg"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sand-500/20 text-navy-900">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-base text-navy-900">{job.title}</span>
                    <span className="mt-0.5 block text-xs text-jbc-muted">{job.category} · {job.isLegacy ? "Posted role" : "Monthly"}</span>
                    <span className="mt-1 block text-sm font-bold text-sand-600">{job.salaryDisplay}</span>
                  </span>
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => { e.stopPropagation(); setApplyJob(job); }}
                    className="shrink-0 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-cream-100 transition group-hover:bg-navy-700"
                  >
                    Apply
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------------- job detail bottom sheet / modal ---------------- */}
      <AnimatePresence>
        {detailJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-end justify-center bg-navy-900/45 backdrop-blur-sm md:items-center md:p-4"
            onClick={() => setDetailJob(null)}
          >
            <motion.div
              initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-t-[28px] border border-cream-300 bg-white-soft p-6 shadow-jbc-lg sm:p-8 md:rounded-[28px]"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand-500/20 text-navy-900">
                  {(() => { const Icon = CATEGORY_ICON[detailJob.category] ?? Wallet; return <Icon size={20} />; })()}
                </span>
                <button onClick={() => setDetailJob(null)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-navy-100 text-navy-900 hover:bg-sand-500 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <h2 className="mt-4 font-display text-2xl text-navy-900">{detailJob.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-jbc-muted">
                <span className="inline-flex items-center gap-1"><MapPin size={13} /> {detailJob.country}</span>
                <span className="inline-flex items-center gap-1"><Wallet size={13} /> {detailJob.salaryDisplay}</span>
                <span className="inline-flex items-center gap-1"><CalendarClock size={13} /> {detailJob.category}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-jbc-muted">{detailJob.description}</p>
              {detailJob.isLegacy && detailJob.legacySlug && (
                <a href={`/jobs/${detailJob.legacySlug}`} className="mt-3 inline-block text-xs font-semibold text-navy-700 underline underline-offset-2">
                  View the full listing →
                </a>
              )}
              <button
                onClick={() => { setApplyJob(detailJob); setDetailJob(null); }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-cream-100 shadow-jbc transition hover:bg-navy-700"
              >
                Apply for this job
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- mobile sticky Apply Now bar ---------------- */}
      {/* floats just above the site's own floating pill tab bar (which sits at bottom-4), never overlapping it */}
      {stickyJob && !detailJob && (
        <div className="fixed inset-x-4 bottom-24 z-[60] mx-auto max-w-[420px] rounded-2xl border border-cream-300 bg-navy-900 p-3 shadow-jbc-lg md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-cream-300">{stickyJob.title}</p>
              <p className="text-[11px] text-sand-500">{stickyJob.salaryDisplay}</p>
            </div>
            <button
              onClick={() => setApplyJob(stickyJob)}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-sand-500 px-5 py-2.5 text-xs font-bold text-navy-900 transition hover:bg-sand-600"
            >
              <MessageCircle size={14} /> Apply Now
            </button>
          </div>
        </div>
      )}

      <CountryApplyModal
        open={!!applyJob}
        onClose={() => setApplyJob(null)}
        initialCountry={country.name}
        initialJob={applyJob?.title}
      />
    </div>
  );
}
