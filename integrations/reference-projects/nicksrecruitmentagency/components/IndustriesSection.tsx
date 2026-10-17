"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Flame,
  TrendingUp,
  Clock,
} from "lucide-react";
import { industryDetails, jobCategories, recruitmentProcess, type IndustryDemand } from "@/lib/data";

// ---------------------------------------------------------------------------
// Demand badge styling — three tiers, purely typographic (no color reliance)
// so it still reads correctly in a monochrome design system.
// ---------------------------------------------------------------------------
const demandStyle: Record<IndustryDemand, { icon: React.ReactNode; className: string }> = {
  "Very high demand": {
    icon: <Flame size={12} />,
    className: "bg-black text-white",
  },
  "High demand": {
    icon: <TrendingUp size={12} />,
    className: "bg-zinc-900 text-white",
  },
  "Steady demand": {
    icon: <Clock size={12} />,
    className: "bg-white text-black border border-black/15",
  },
};

function roleNamesFor(slugs: string[]) {
  return slugs
    .map((slug) => jobCategories.find((j) => j.slug === slug)?.name)
    .filter(Boolean) as string[];
}

export default function IndustriesSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#f7f6f3] py-20 sm:py-28">
      {/* faint dot texture, keeps the white section from feeling empty without adding color */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#00000014 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- header --- */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/50">
              Where our workers go
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Industries we serve
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-black/60">
              Fifteen industries, one promise that never changes: we register you, verify the
              employer, train you for the role, process every document, and meet you at both ends
              of the flight. Pick the trade you know — or the one you want to learn.
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80 sm:flex"
          >
            Browse all open jobs <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* --- process strip: reuses recruitmentProcess so the "we guide you"
             promise is visible before anyone even opens a card --- */}
        <div className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-3 rounded-2xl border border-black/10 bg-white px-5 py-4">
          {recruitmentProcess.map((step, i) => (
            <div key={step} className="flex items-center">
              <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-black/70">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </span>
              {i < recruitmentProcess.length - 1 && (
                <span className="mx-2 h-px w-4 bg-black/15 sm:mx-3 sm:w-6" />
              )}
            </div>
          ))}
        </div>

        {/* --- industry cards --- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industryDetails.map((ind, i) => {
            const isActive = activeSlug === ind.slug;
            const roles = roleNamesFor(ind.relatedRoleSlugs);
            const demand = demandStyle[ind.demand];

            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                onMouseEnter={() => setActiveSlug(ind.slug)}
                onMouseLeave={() => setActiveSlug(null)}
                className="group flex flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]"
              >
                {/* --- photo --- */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-200">
                  {ind.image ? (
                    <Image
                      src={ind.image}
                      alt={`${ind.name} jobs in the Gulf`}
                      fill
                      className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />

                  <div
                    className={`absolute left-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${demand.className}`}
                  >
                    {demand.icon} {ind.demand}
                  </div>

                  <h3 className="absolute bottom-4 left-5 font-serif text-2xl font-semibold text-white">
                    {ind.name}
                  </h3>
                </div>

                {/* --- body --- */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-black/40">
                    {ind.tagline}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-black/65">
                    {ind.description}
                  </p>

                  {/* related roles */}
                  {roles.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {roles.slice(0, 3).map((role) => (
                        <span
                          key={role}
                          className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-black/70"
                        >
                          {role}
                        </span>
                      ))}
                      {roles.length > 3 && (
                        <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-black/40">
                          +{roles.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* "we handle everything" checklist — expands on hover/tap */}
                  <div
                    className={`mt-4 overflow-hidden border-t border-black/10 transition-all duration-300 ${
                      isActive ? "max-h-64 pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-black/40">
                      We guide you through
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {ind.weHandle.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12.5px] leading-snug text-black/70">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-black" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="flex items-center justify-between gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-zinc-800"
                    >
                      Explore {ind.name} jobs
                      <ArrowUpRight
                        size={16}
                        className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* mobile-only browse-all link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse all open jobs <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
