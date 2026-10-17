"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Headset, BadgeCheck } from "lucide-react";
import { countryMeta, countryCardStats } from "@/data/country-jobs";
import { CountryApplyModal } from "./CountryApplyModal";

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: "Verified employers" },
    { icon: BadgeCheck, label: "Free consultation" },
    { icon: Headset, label: "WhatsApp support" },
  ];
  return (
    <div className="jbc flex flex-wrap items-center justify-center gap-2.5 bg-cream-100 px-4 py-5">
      {items.map(({ icon: Icon, label }) => (
        <span key={label} className="inline-flex items-center gap-2 rounded-full bg-sand-500/25 px-4 py-2 text-xs font-semibold text-navy-900">
          <Icon size={14} className="text-sand-600" /> {label}
        </span>
      ))}
    </div>
  );
}

export function CountrySelector() {
  const [applyFor, setApplyFor] = useState<string | null>(null);

  return (
    <section className="jbc jbc-linen relative overflow-hidden py-14 md:py-20">
      {/* soft decorative glow, matching the mood board's natural-material softness */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-navy-100 blur-3xl" />

      <div className="container-content relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sand-500/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-900">
            Jobs by country
          </p>
          <h2 className="mt-4 font-display text-3xl text-navy-900 md:text-4xl">Choose Your Destination</h2>
          <p className="mt-3 text-sm leading-6 text-jbc-muted">
            Pick a country to see every open role and salary, then apply in a few taps.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-4">
          {countryMeta.map((c, i) => {
            const stats = countryCardStats(c.name);
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={`/jobs/country/${c.slug}`}
                  className="group relative flex h-full flex-col gap-3 rounded-[22px] border border-cream-300 bg-white-soft p-4 shadow-jbc transition-all duration-200 hover:-translate-y-1 hover:border-sand-500 hover:shadow-jbc-lg active:translate-y-0 active:shadow-jbc-press sm:p-5"
                >
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-jbc-success/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-jbc-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-jbc-success" /> Hiring Now
                  </span>

                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sand-500/20 text-3xl">
                    {c.flag}
                  </span>

                  <div>
                    <h3 className="font-display text-lg text-navy-900">{c.name === "United Arab Emirates" ? "UAE" : c.name}</h3>
                    <p className="mt-0.5 text-xs text-jbc-muted">{stats.jobCount} open jobs</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="text-[12px] font-semibold text-sand-600">{stats.teaser}</span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-100 text-navy-900 transition group-hover:bg-navy-900 group-hover:text-cream-100">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setApplyFor("")}
            className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white-soft px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-100"
          >
            Don't see your role? Start a general application
          </button>
        </div>
      </div>

      <CountryApplyModal open={applyFor !== null} onClose={() => setApplyFor(null)} initialCountry={applyFor || undefined} />
    </section>
  );
}
