"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  ConciergeBell,
  Wrench,
  Factory,
  HeartHandshake,
  ShieldCheck,
  Users,
  Languages,
  ArrowRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Most candidates we place have never worked in these roles before — the
// jobs the Gulf actually hires Africans for are overwhelmingly unskilled or
// semi-skilled (cleaning, security, hospitality, domestic care), and the
// single biggest reason placements fail is candidates arriving with no idea
// what the job or the culture actually expects of them. This section exists
// to prove, in detail, that we close that gap before departure.
// ---------------------------------------------------------------------------
const categories = ["All", "Hospitality", "Cleaning", "Security", "Care", "Language"] as const;

const courses = [
  {
    slug: "housekeeping",
    title: "Housekeeping",
    category: "Cleaning",
    duration: "2 weeks",
    certification: "Certificate of Completion",
    description: "Room turnover, laundry handling, and hotel-standard cleaning sequences.",
    icon: Sparkles,
  },
  {
    slug: "hotel-services",
    title: "Hotel Services",
    category: "Hospitality",
    duration: "3 weeks",
    certification: "Certificate of Completion",
    description: "Front-desk conduct, guest handling, and service standards Gulf hotels expect.",
    icon: ConciergeBell,
  },
  {
    slug: "cleaning-equipment",
    title: "Cleaning Equipment",
    category: "Cleaning",
    duration: "1 week",
    certification: "Certificate of Completion",
    description: "Safe operation of commercial machines: scrubbers, buffers, and extractors.",
    icon: Wrench,
  },
  {
    slug: "industrial-cleaning",
    title: "Industrial Cleaning",
    category: "Cleaning",
    duration: "1 week",
    certification: "Certificate of Completion",
    description: "Large-site and facility cleaning protocols, including chemical handling safety.",
    icon: Factory,
  },
  {
    slug: "caregiver",
    title: "Caregiver",
    category: "Care",
    duration: "4 weeks",
    certification: "Caregiver Certificate",
    description: "Elderly and domestic care basics: hygiene support, routines, and safe lifting.",
    icon: HeartHandshake,
  },
  {
    slug: "security-guard",
    title: "Security Guard Training",
    category: "Security",
    duration: "3 weeks",
    certification: "Security Certificate",
    description: "Access control, patrol procedure, incident reporting, and site conduct.",
    icon: ShieldCheck,
  },
  {
    slug: "workplace-etiquette",
    title: "Workplace Etiquette",
    category: "Hospitality",
    duration: "1 week",
    certification: "Certificate of Completion",
    description: "Cultural norms, employer expectations, and day-to-day conduct in the Gulf.",
    icon: Users,
  },
  {
    slug: "workplace-language",
    title: "Workplace Language",
    category: "Language",
    duration: "2 weeks",
    certification: "Language Certificate",
    description: "Working English and basic Arabic phrases used on the job, not classroom theory.",
    icon: Languages,
  },
];

export default function TrainingPreview() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        {/* --- header --- */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Training School
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
            Trained before departure, not after arrival
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80">
            Most of our candidates have never worked a housekeeping floor, stood a security post,
            or run a hotel front desk before — and most placements abroad don&rsquo;t fail because
            someone lacked effort. They fail because no one taught them what the job, or the
            country, actually expects on day one.
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80">
            Our physical training centre runs certified courses across hospitality, cleaning,
            security, caregiving, and workplace language, with real equipment and real classrooms —
            not slides. Every candidate leaves with a certificate, and every employer receives
            someone who already knows the job.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-700/70">
            <span>
              <span className="font-semibold text-navy-900">{courses.length}</span> certified
              courses
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-navy-900/30 sm:block" />
            <span>
              <span className="font-semibold text-navy-900">1–4 weeks</span> per programme
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-navy-900/30 sm:block" />
            <span>
              <span className="font-semibold text-navy-900">100%</span> certified on completion
            </span>
          </div>

          <Link
            href="/training-school"
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-gold-400"
          >
            Explore the Training School <ArrowRight size={15} />
          </Link>
        </div>

        {/* --- category tabs --- */}
        <div className="mt-14 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === cat
                  ? "bg-navy-900 text-white"
                  : "bg-sand-50 text-navy-700/70 hover:bg-navy-900/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- course grid --- */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-5 transition hover:border-gold-500/50 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                    {course.category}
                  </span>
                  <span className="text-[11px] text-navy-700/50">{course.duration}</span>
                </div>

                <div className="mt-4 flex h-24 items-center justify-center rounded-xl bg-sand-50">
                  <course.icon size={30} strokeWidth={1.6} className="text-navy-900/70" />
                </div>

                <p className="mt-4 font-display text-base font-semibold text-navy-900">
                  {course.title}
                </p>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-navy-700/70">
                  {course.description}
                </p>

                <div className="mt-4 border-t border-navy-900/10 pt-3 text-xs text-navy-700/60">
                  {course.certification}
                </div>

                <Link
                  href={`/training-school/courses/${course.slug}`}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-navy-900/15 py-2.5 text-sm font-semibold text-navy-900 transition hover:border-gold-500 hover:bg-gold-50"
                >
                  View course <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
