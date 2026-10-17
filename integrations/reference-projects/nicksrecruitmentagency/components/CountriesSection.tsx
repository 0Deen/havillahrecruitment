"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  MapPin,
  Flame,
} from "lucide-react";
import { countries, gccCountries, gccNote } from "@/lib/data";

// ---------------------------------------------------------------------------
// Fallback gradient shown behind a photo while it loads, and as a safety net
// if a src ever 404s. Keyed off `image.mood` so every country still looks
// intentional even before/without a real photo.
// ---------------------------------------------------------------------------
const moodGradient: Record<string, string> = {
  sky: "from-sky-500/40 via-zinc-900 to-zinc-950",
  gold: "from-amber-500/40 via-zinc-900 to-zinc-950",
  sea: "from-cyan-500/40 via-zinc-900 to-zinc-950",
  sand: "from-orange-400/40 via-zinc-900 to-zinc-950",
  night: "from-indigo-500/40 via-zinc-900 to-zinc-950",
  green: "from-lime-500/40 via-zinc-900 to-zinc-950",
};

export default function CountriesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* faint grid backdrop, matches the "blueprint" texture used across the brand */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- header --- */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
              Where we place workers
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
              Countries we recruit for
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              We find jobs with trusted employers across the Gulf. Whatever work you do — building,
              hotels, driving, care, security or the home — we walk with you from registration all
              the way to arrival. Every employer is checked first, and every cost is shown to you in
              writing before you pay a thing.
            </p>
          </div>
          <Link
            href="/countries"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-zinc-950/20 bg-zinc-950/5 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-950 hover:text-white sm:flex"
          >
            Compare all countries <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* --- GCC overview panel --- */}
        <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
            All GCC countries that hire African migrant workers
          </p>
          <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gccCountries.map((c) => (
              <li
                key={c.rank}
                className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                  {c.rank}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-950">{c.name}</p>
                  {c.note && <p className="mt-0.5 text-xs text-zinc-500">{c.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">{gccNote}</p>
        </div>

        {/* --- country cards --- */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={`/countries/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:border-zinc-950/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]"
              >
                {/* --- hero photo + bento gallery corner --- */}
                <div className="relative h-52 w-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${moodGradient[c.image.mood]}`} />
                  {c.image.src && (
                    <Image
                      src={c.image.src}
                      alt={c.image.caption}
                      fill
                      className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

                  {/* small overlapping gallery thumbnails, bento-style like the brand moodboard */}
                  {c.photos && c.photos.length > 0 && (
                    <div className="absolute right-3 top-3 flex -space-x-3">
                      {c.photos.slice(0, 3).map((p, idx) => (
                        <div
                          key={p}
                          className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-white shadow-lg"
                          style={{ zIndex: 10 - idx }}
                        >
                          <Image src={p} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* top-left: flag + country name */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-zinc-950/70 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="text-sm font-semibold text-white">{c.name}</span>
                  </div>

                  {/* hiring now badge */}
                  {c.hiringNow && (
                    <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-zinc-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      <Flame size={12} /> Hiring now
                    </div>
                  )}

                  {/* city chips */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {c.cities.map((city) => (
                      <span
                        key={city}
                        className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                      >
                        <MapPin size={10} className="text-white" /> {city}
                      </span>
                    ))}
                  </div>
                </div>

                {/* --- body --- */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950">
                    {c.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.description}</p>

                  {/* stat row */}
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-4">
                    <div>
                      <p className="flex items-center gap-1.5 text-lg font-bold text-zinc-950">
                        <Briefcase size={16} className="text-zinc-950" /> {c.jobsAvailable}+
                      </p>
                      <p className="text-[11px] uppercase tracking-wide text-zinc-500">Open jobs</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-lg font-bold text-zinc-950">
                        <Building2 size={16} className="text-zinc-950" /> {c.verifiedEmployers}+
                      </p>
                      <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                        Verified employers
                      </p>
                    </div>
                  </div>

                  {/* salary + roles */}
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-zinc-950">
                    <Wallet size={15} /> {c.avgSalaryRange}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.commonRoles.slice(0, 4).map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <ShieldCheck size={14} className="text-zinc-950" /> Verified employers only
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-between gap-2 rounded-full border border-zinc-950 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-white group-hover:text-zinc-950">
                    Explore {c.name.split(" ")[0]} jobs
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* mobile-only compare link, matches the desktop one above */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/countries"
            className="flex items-center gap-1.5 rounded-full border border-zinc-950/20 bg-zinc-950/5 px-5 py-2.5 text-sm font-semibold text-zinc-950"
          >
            Compare all countries <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
