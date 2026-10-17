"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  PlaneTakeoff,
  MapPin,
  ShieldCheck,
  Sun,
  Cloud,
  CloudRain,
  ChevronDown,
  Play,
  X,
  Users,
  Plus,
  Check,
} from "lucide-react";
import type { CountryExperience as CountryExperienceData, MediaSlot } from "@/lib/country-experience-data";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

const moodGradient: Record<MediaSlot["mood"], string> = {
  sky: "from-navy-700 via-navy-800 to-navy-950",
  gold: "from-gold-500 via-navy-800 to-navy-950",
  sea: "from-emerald-700 via-navy-800 to-navy-950",
  sand: "from-sand-200 via-gold-600 to-navy-900",
  night: "from-navy-950 via-navy-900 to-navy-800",
  green: "from-emerald-700 via-emerald-600 to-navy-900",
};

/** Stands in for a real photo/video until one is supplied. Swap `slot.src`
 *  in for a real asset and this renders the actual image/video instead. */
function MediaPlaceholder({
  slot,
  className = "",
  showCaption = true,
}: {
  slot: MediaSlot;
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${moodGradient[slot.mood]} ${className}`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      {showCaption && (
        <p className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/80">
          {slot.caption}
        </p>
      )}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-navy-700/70">{sub}</p>}
    </Reveal>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Hero                                                             */
/* ------------------------------------------------------------------ */

function HeroExperience({ data }: { data: CountryExperienceData }) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % data.hero.rotatingShots.length);
    }, 4200);
    return () => clearInterval(id);
  }, [data.hero.rotatingShots.length]);

  return (
    <section ref={sectionRef} className="relative flex h-[92vh] min-h-[640px] items-end overflow-hidden text-white">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <MediaPlaceholder slot={data.hero.rotatingShots[active]} className="h-full w-full" showCaption={false} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10" />
        {/* slow drifting cloud layer */}
        <motion.div
          aria-hidden
          className="absolute -top-10 left-0 h-40 w-[140%] bg-[radial-gradient(ellipse_at_center,white_0%,transparent_65%)] opacity-[0.06]"
          animate={{ x: ["-10%", "10%"] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
      </motion.div>

      {/* flight path line, top of hero */}
      <div className="absolute left-0 top-10 z-10 h-10 w-full overflow-hidden opacity-70">
        <svg className="h-10 w-full" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0 20 Q 300 0 600 20 T 1200 20" className="flight-path-line" />
        </svg>
        <motion.div
          className="absolute top-1"
          animate={{ left: ["0%", "96%"], top: [10, 2, 10] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <PlaneTakeoff className="h-5 w-5 text-gold-400" />
        </motion.div>
      </div>

      <div className="container-page relative z-10 pb-16 pt-32 md:pb-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <span className="text-lg leading-none">{data.flag}</span> {data.hero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            {data.hero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-sand-100/85">{data.hero.sub}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-4">
          <Link href="/jobs" className="rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400">
            Available Jobs
          </Link>
          <Link href="/apply-now" className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/10">
            Apply Now
          </Link>
          <Link href="#documents" className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/10">
            Requirements
          </Link>
        </Reveal>
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Quick facts / introduction                                      */
/* ------------------------------------------------------------------ */

function IntroductionSplit({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal className="grid grid-cols-2 gap-3">
          {data.hero.rotatingShots.slice(0, 4).map((slot, i) => (
            <MediaPlaceholder
              key={slot.caption}
              slot={slot}
              className={`h-40 rounded-2xl md:h-52 ${i === 0 ? "col-span-2 h-52 md:h-64" : ""}`}
            />
          ))}
        </Reveal>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Getting to know {data.name}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 md:text-4xl">
            Before you say yes to a contract, know the country
          </h2>
          <p className="mt-4 text-navy-700/75">{data.introParagraph}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
            {data.quickFacts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05} className="rounded-xl border border-navy-900/10 bg-sand-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-700/50">{f.label}</p>
                <p className="mt-1 text-sm font-medium text-navy-900">{f.value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Gallery                                                         */
/* ------------------------------------------------------------------ */

function FullscreenGallery({ data }: { data: CountryExperienceData }) {
  const [open, setOpen] = useState<MediaSlot | null>(null);
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="A closer look" title={`${data.name} in pictures`} sub="A visual walk through the places, sites, and everyday moments you'd actually encounter." />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {data.gallery.map((slot, i) => (
            <Reveal key={slot.caption} delay={(i % 4) * 0.06} className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}>
              <button onClick={() => setOpen(slot)} className="block w-full text-left">
                <MediaPlaceholder
                  slot={slot}
                  className={`w-full rounded-xl transition duration-500 hover:scale-[1.02] hover:brightness-110 ${
                    i % 5 === 0 ? "h-full min-h-[240px]" : "h-32 md:h-44"
                  }`}
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-6 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <MediaPlaceholder slot={open} className="h-[60vh] w-full rounded-2xl" />
              <button onClick={() => setOpen(null)} className="absolute -top-4 -right-4 rounded-full bg-white p-2 text-navy-900">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Interactive map / cities                                        */
/* ------------------------------------------------------------------ */

function InteractiveCityMap({ data }: { data: CountryExperienceData }) {
  const [activeCity, setActiveCity] = useState(0);
  const city = data.cities[activeCity];

  return (
    <section className="bg-navy-950 py-20 text-white md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Where you'd be based" title="Explore the cities" sub="Tap a city to see what's actually there — the jobs, the weather, the day-to-day." />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-10">
            <motion.div
              aria-hidden
              className="absolute h-40 w-40 rounded-full bg-gold-500/20 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            {data.cities.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActiveCity(i)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeCity === i ? "bg-gold-500 text-navy-950" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <MapPin className="h-4 w-4" /> {c.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={city.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="font-display text-2xl font-semibold">{city.name}</h3>
              <p className="mt-3 text-white/75">{city.blurb}</p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">Popular industries</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {city.industries.map((ind) => (
                    <span key={ind} className="rounded-full bg-white/10 px-3 py-1 text-xs">{ind}</span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">Weather</p>
                <p className="mt-1 text-sm text-white/75">{city.weather}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Why work here                                                    */
/* ------------------------------------------------------------------ */

function WhyWorkGrid({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="The honest pitch" title={`Why people choose ${data.name}`} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.whyWork.map((w, i) => (
            <Reveal key={w.title} delay={(i % 4) * 0.06}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px -20px rgba(11,31,58,0.25)" }}
                className="h-full rounded-2xl border border-navy-900/10 bg-sand-50 p-6"
              >
                <ShieldCheck className="h-6 w-6 text-gold-600" />
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm text-navy-700/70">{w.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Daily life                                                       */
/* ------------------------------------------------------------------ */

function DailyLifeStrip({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="A day in the life" title="What an ordinary day actually looks like" />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {data.dailyLife.map((d, i) => (
            <Reveal key={d.period} delay={i * 0.08} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{d.period}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{d.title}</h3>
              <p className="mt-2 text-sm text-navy-700/70">{d.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Industries                                                       */
/* ------------------------------------------------------------------ */

function IndustriesGrid({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Where the jobs are" title="Industries actively hiring right now" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 0.07}>
              <motion.div whileHover={{ y: -5 }} className="overflow-hidden rounded-2xl border border-navy-900/10">
                <MediaPlaceholder slot={{ caption: ind.name, mood: i % 2 ? "sand" : "sky" }} className="h-32 w-full" showCaption={false} />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{ind.name}</h3>
                  <dl className="mt-3 space-y-1.5 text-sm text-navy-700/75">
                    <div className="flex justify-between"><dt>Average salary</dt><dd className="font-medium text-navy-900">{ind.salary}</dd></div>
                    <div className="flex justify-between"><dt>Experience needed</dt><dd className="font-medium text-navy-900">{ind.experience}</dd></div>
                    <div className="flex justify-between"><dt>Hiring frequency</dt><dd className="font-medium text-navy-900">{ind.hiring}</dd></div>
                    <div className="flex justify-between"><dt>Current openings</dt><dd className="font-medium text-emerald-700">{ind.openings}</dd></div>
                  </dl>
                  <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-gold-600 hover:text-gold-500">
                    View openings →
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Salary visualization                                             */
/* ------------------------------------------------------------------ */

function SalaryVisualization({ data }: { data: CountryExperienceData }) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const maxHigh = Math.max(...data.salaryBands.map((s) => s.monthlyHigh));

  return (
    <section className="bg-navy-950 py-20 text-white md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <SectionHeading eyebrow="Real numbers" title="What roles actually pay" />
          <div className="flex rounded-full bg-white/10 p-1">
            {(["monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition ${
                  period === p ? "bg-gold-500 text-navy-950" : "text-white/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-5">
          {data.salaryBands.map((band, i) => {
            const multiplier = period === "yearly" ? 12 : 1;
            const low = band.monthlyLow * multiplier;
            const high = band.monthlyHigh * multiplier;
            const widthPct = (band.monthlyHigh / maxHigh) * 100;
            return (
              <Reveal key={band.role} delay={i * 0.05}>
                <div className="grid gap-2 sm:grid-cols-[220px_1fr_auto] sm:items-center">
                  <p className="font-medium">{band.role}</p>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${widthPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gold-400">
                    {data.currency} <AnimatedCounter value={low} /> - <AnimatedCounter value={high} />
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-xs text-white/50">
          Rough USD equivalent: 1 {data.currency} ≈ ${data.currencyToUsd.toFixed(2)}. Figures are indicative bands from recent placements, not guarantees — your actual offer will always be confirmed in writing before you accept.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Cost of living                                                   */
/* ------------------------------------------------------------------ */

function CostOfLivingDashboard({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Where the money goes" title="Cost of living, side by side" sub={`How a typical monthly budget shifts once you're earning in ${data.name}, compared to back home.`} />
        <div className="mt-12 space-y-6">
          {data.costOfLiving.map((c, i) => (
            <Reveal key={c.item} delay={i * 0.05}>
              <div>
                <p className="text-sm font-medium text-navy-900">{c.item}</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <div className="h-3 overflow-hidden rounded-full bg-navy-900/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.homeCountryPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="h-full rounded-full bg-navy-700"
                      />
                    </div>
                    <p className="mt-1 text-xs text-navy-700/60">Home country · {c.homeCountryPct}% of income</p>
                  </div>
                  <div>
                    <div className="h-3 overflow-hidden rounded-full bg-navy-900/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.hostCountryPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="h-full rounded-full bg-gold-500"
                      />
                    </div>
                    <p className="mt-1 text-xs text-navy-700/60">{data.name} · {c.hostCountryPct}% of income</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Culture                                                         */
/* ------------------------------------------------------------------ */

function CultureSection({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Fitting in, fast" title="Culture and etiquette worth knowing before you land" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.culture.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07} className="rounded-2xl border border-navy-900/10 bg-white p-6">
              <Users className="h-5 w-5 text-gold-600" />
              <h3 className="mt-3 font-display text-base font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm text-navy-700/70">{c.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  11. Weather                                                         */
/* ------------------------------------------------------------------ */

function WeatherSection({ data }: { data: CountryExperienceData }) {
  const maxTemp = Math.max(...data.climate.map((c) => c.tempC));
  const icon = { sun: Sun, cloud: Cloud, rain: CloudRain };
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Plan around it" title="Climate through the year" />
        <div className="mt-12 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {data.climate.map((c, i) => {
            const Icon = icon[c.condition];
            return (
              <Reveal key={c.month} delay={i * 0.03} className="flex flex-col items-center gap-2">
                <Icon className="h-5 w-5 text-gold-600" />
                <div className="flex h-28 w-full items-end rounded-lg bg-sand-100">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(c.tempC / maxTemp) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.03 }}
                    className="w-full rounded-lg bg-gradient-to-t from-navy-800 to-gold-500"
                  />
                </div>
                <p className="text-xs font-semibold text-navy-900">{c.tempC}°C</p>
                <p className="text-[11px] text-navy-700/60">{c.month}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  12. Documents checklist                                             */
/* ------------------------------------------------------------------ */

function DocumentsChecklist({ data }: { data: CountryExperienceData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="documents" className="bg-sand-50 py-20 md:py-28">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow="Before you apply" title="Documents you'll need" />
        <div className="mt-10 space-y-3">
          {data.documents.map((doc, i) => (
            <Reveal key={doc.name} delay={i * 0.04} className="overflow-hidden rounded-xl border border-navy-900/10 bg-white">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3 font-medium text-navy-900">
                  <Check className="h-4 w-4 text-emerald-700" /> {doc.name}
                </span>
                <Plus className={`h-4 w-4 text-navy-700/50 transition ${openIdx === i ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-sm text-navy-700/70">{doc.guidance}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  13. Recruitment journey                                             */
/* ------------------------------------------------------------------ */

function JourneyRoadmap({ data }: { data: CountryExperienceData }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const planeX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-navy-950 py-20 text-white md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Step by step" title={`Your route to working in ${data.name}`} />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-white/15 md:block" />
          <motion.div style={{ left: planeX }} className="absolute -top-2 hidden md:block">
            <PlaneTakeoff className="h-5 w-5 text-gold-400" />
          </motion.div>
          <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-8">
            {data.journey.map((j, i) => (
              <Reveal key={j.step} delay={i * 0.06} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 font-display text-lg font-semibold text-navy-950">
                  {i + 1}
                </div>
                <p className="mt-3 font-semibold">{j.step}</p>
                <p className="mt-1 text-xs text-white/60">{j.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  14. Success stories                                                 */
/* ------------------------------------------------------------------ */

function SuccessStoriesSection({ data }: { data: CountryExperienceData }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Real placements" title="People who made the move" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.successStories.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08} className="overflow-hidden rounded-2xl border border-navy-900/10">
              <MediaPlaceholder slot={{ caption: `${s.name} · ${s.role}`, mood: i % 2 ? "gold" : "sea" }} className="h-48 w-full" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{s.fromTo}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{s.name}, {s.role}</h3>
                <p className="mt-3 text-sm italic text-navy-700/75">&ldquo;{s.quote}&rdquo;</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-sand-50 p-2">
                    <p className="font-semibold uppercase tracking-wide text-navy-700/50">Before</p>
                    <p className="mt-1 text-navy-800">{s.before}</p>
                  </div>
                  <div className="rounded-lg bg-sand-50 p-2">
                    <p className="font-semibold uppercase tracking-wide text-navy-700/50">After</p>
                    <p className="mt-1 text-navy-800">{s.after}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  15. Photo slider                                                    */
/* ------------------------------------------------------------------ */

function PhotoSlider({ data }: { data: CountryExperienceData }) {
  const loop = [...data.gallery, ...data.gallery];
  return (
    <section className="overflow-hidden bg-sand-50 py-16">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Full width</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900">A wider look at {data.name}</h2>
      </div>
      <motion.div
        className="flex gap-4 pl-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((slot, i) => (
          <MediaPlaceholder key={`${slot.caption}-${i}`} slot={slot} className="h-56 w-80 flex-shrink-0 rounded-xl" />
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  16. Video library                                                   */
/* ------------------------------------------------------------------ */

function VideoLibrarySection({ data }: { data: CountryExperienceData }) {
  const [openVideo, setOpenVideo] = useState<number | null>(null);
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Watch first" title="The video library" sub="Short, honest videos — no stock footage, just what to expect." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.videoLibrary.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.07}>
              <button onClick={() => setOpenVideo(i)} className="group block w-full overflow-hidden rounded-2xl border border-navy-900/10 text-left">
                <div className="relative">
                  <MediaPlaceholder slot={{ caption: v.length, mood: i % 2 ? "night" : "sky" }} className="h-40 w-full" showCaption={false} />
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-950/30 transition group-hover:bg-navy-950/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy-900 transition group-hover:scale-110">
                      <Play className="ml-0.5 h-5 w-5" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{v.length}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-semibold text-navy-900">{v.title}</h3>
                  <p className="mt-1 text-sm text-navy-700/70">{v.description}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-6 backdrop-blur"
          >
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <MediaPlaceholder
                slot={{ caption: data.videoLibrary[openVideo].title, mood: "night" }}
                className="aspect-video w-full rounded-2xl"
                showCaption={false}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                <Play className="h-10 w-10" />
                <p className="font-semibold">{data.videoLibrary[openVideo].title}</p>
                <p className="text-xs text-white/60">Video file not uploaded yet — this player is wired and ready to go.</p>
              </div>
              <button onClick={() => setOpenVideo(null)} className="absolute -top-4 -right-4 rounded-full bg-white p-2 text-navy-900">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  17. FAQ                                                             */
/* ------------------------------------------------------------------ */

function FaqAccordion({ data }: { data: CountryExperienceData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow="Common questions" title={`FAQs about working in ${data.name}`} />
        <div className="mt-10 space-y-3">
          {data.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04} className="overflow-hidden rounded-xl border border-navy-900/10 bg-white">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-navy-900">
                {f.q}
                <Plus className={`h-4 w-4 flex-shrink-0 text-navy-700/50 transition ${openIdx === i ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4">
                    <p className="text-sm text-navy-700/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  18. Apply CTA                                                       */
/* ------------------------------------------------------------------ */

function ApplyCtaSection({ data }: { data: CountryExperienceData }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-center text-white">
      <MediaPlaceholder slot={{ caption: "", mood: "night" }} className="absolute inset-0 opacity-40" showCaption={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">{data.flag} {data.name} is waiting</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            Ready to start your {data.name} journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Talk to a real recruitment officer today, or jump straight into an application — either way, we walk with you from your first message to your first payslip.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/apply-now" className="rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400">Apply Now</Link>
          <Link href="/contact" className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10">Talk to Recruitment Officer</Link>
          <a href="https://wa.me/0000000000" className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10">WhatsApp</a>
          <Link href="/book-medical" className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10">Book Medical</Link>
          <Link href="/book-training" className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10">Book Training</Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Orchestrator                                                       */
/* ------------------------------------------------------------------ */

export default function CountryExperience({ data }: { data: CountryExperienceData }) {
  return (
    <article>
      <HeroExperience data={data} />
      <IntroductionSplit data={data} />
      <FullscreenGallery data={data} />
      <InteractiveCityMap data={data} />
      <WhyWorkGrid data={data} />
      <DailyLifeStrip data={data} />
      <IndustriesGrid data={data} />
      <SalaryVisualization data={data} />
      <CostOfLivingDashboard data={data} />
      <CultureSection data={data} />
      <WeatherSection data={data} />
      <DocumentsChecklist data={data} />
      <JourneyRoadmap data={data} />
      <SuccessStoriesSection data={data} />
      <PhotoSlider data={data} />
      <VideoLibrarySection data={data} />
      <FaqAccordion data={data} />
      <ApplyCtaSection data={data} />
    </article>
  );
}
