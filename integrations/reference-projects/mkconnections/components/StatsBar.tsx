"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* -------------------------------------------------------------------------- */
/*  Palette (taken from the geometric artwork)                                 */
/* -------------------------------------------------------------------------- */

const P = {
  teal: "#1F4E5A",
  orange: "#B65A1F",
  maroon: "#7A1F1F",
  mustard: "#E9B96E",
  ink: "#14262B",
  cream: "#F3EFE6",
  onDark: "#FBF8F1",
} as const;

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/*                                                                             */
/*  Every string has an English default. If a translation key exists in your   */
/*  i18n dictionary it is used instead, so nothing breaks before you add keys. */
/*  Key pattern:  stats.svc.<id>.label | hint | title | body | step1..stepN    */
/* -------------------------------------------------------------------------- */

type Service = {
  id: string;
  /** centre x / y and diameter, in a 1200 x 600 artboard */
  cx: number;
  cy: number;
  d: number;
  fill: string;
  text: string;
  label: string;
  hint: string;
  title: string;
  body: string;
  steps: string[];
  note?: string;
};

/** Listed in journey order. Previous / Next walks through them in this order. */
const SERVICES: Service[] = [
  {
    id: "apps",
    cx: 350,
    cy: 100,
    d: 150,
    fill: P.teal,
    text: P.onDark,
    label: "Job applications",
    hint: "CV, letters, follow-ups",
    title: "We apply for you, and we follow up.",
    body: "We match you with open roles, tidy up your CV and send applications to employers. You hear back from us, not from a silent inbox.",
    steps: [
      "Review and rewrite your CV",
      "Match you to roles that fit your skills",
      "Apply and follow up with the employer",
      "Prepare you for interviews, including video calls",
    ],
  },
  {
    id: "docs",
    cx: 250,
    cy: 400,
    d: 150,
    fill: P.mustard,
    text: P.ink,
    label: "Documents",
    hint: "Passport to contract",
    title: "Every paper, checked before it matters.",
    body: "Passport, police clearance, certificates, contract. We tell you what is needed, check each one and help you get anything that is missing.",
    steps: [
      "Passport and photo requirements",
      "Police clearance and certificates",
      "Translations and attestations where required",
      "Your employment contract, explained in plain words",
    ],
  },
  {
    id: "visa",
    cx: 140,
    cy: 170,
    d: 190,
    fill: P.orange,
    text: P.onDark,
    label: "No visa yet?",
    hint: "We start it with you",
    title: "No visa? You can still begin.",
    body: "Most people come to us without one. We find the visa that fits your job and destination, list everything you need and fill in the application with you so nothing is sent wrong.",
    steps: [
      "Find the right visa for your job and country",
      "Check your documents and fix gaps before you apply",
      "Fill in and submit the application with you",
      "Prepare you for the visa interview, if there is one",
    ],
    note: "The embassy makes the final decision. Our job is to make sure your file is complete and correct.",
  },
  {
    id: "medical",
    cx: 560,
    cy: 200,
    d: 210,
    fill: P.maroon,
    text: P.onDark,
    label: "Medical checks",
    hint: "We guide you through it",
    title: "The medical test, explained step by step.",
    body: "Many countries ask for a medical test before you can travel. We tell you which tests you need, book an approved clinic and explain what happens on the day.",
    steps: [
      "Tell you which tests your destination requires",
      "Book an approved clinic near you",
      "Explain each step so there are no surprises",
      "Send the results with the rest of your file",
    ],
  },
  {
    id: "brief",
    cx: 700,
    cy: 400,
    d: 170,
    fill: P.teal,
    text: P.onDark,
    label: "Pre-departure briefing",
    hint: "Know before you go",
    title: "A proper talk before you fly.",
    body: "Before you leave you sit down with us. We cover your job, your pay, local rules, money, phones and what to do if something goes wrong.",
    steps: [
      "Your contract, pay and working hours",
      "Local laws and customs",
      "Money, SIM card and staying in touch",
      "Emergency contacts and who to call",
    ],
  },
  {
    id: "flight",
    cx: 790,
    cy: 110,
    d: 150,
    fill: P.mustard,
    text: P.ink,
    label: "Flights",
    hint: "Booked and explained",
    title: "A ticket that matches your visa and start date.",
    body: "We help you choose a sensible route and date, book the ticket and tell you what you can carry and what you cannot.",
    steps: [
      "Choose dates that fit your visa and start date",
      "Book your ticket",
      "Check baggage limits and what is not allowed",
      "Share your itinerary with your employer and driver",
    ],
  },
  {
    id: "lost",
    cx: 470,
    cy: 440,
    d: 220,
    fill: P.orange,
    text: P.onDark,
    label: "First time flying?",
    hint: "We take you through it",
    title: "Never been to an airport? That is fine.",
    body: "We walk you through check-in, security, boarding and passport control, one step at a time. You can call or message us from any gate.",
    steps: [
      "A short briefing before you travel",
      "A simple checklist for each stage of the trip",
      "Call or message us from the airport, any time",
      "A guide to go with you to the airport, where we can arrange it",
    ],
  },
  {
    id: "airport",
    cx: 1010,
    cy: 210,
    d: 230,
    fill: P.teal,
    text: P.onDark,
    label: "Airport pickup",
    hint: "Met when you land",
    title: "Someone is waiting for you when you land.",
    body: "At home we show you how departure works. On arrival, someone from our team or partners meets you after immigration and takes you to where you will stay.",
    steps: [
      "Departure day: where to go, what to say, what to show",
      "Layovers: how to find your next gate",
      "Arrival: a person meets you after immigration",
      "A ride to your accommodation",
    ],
  },
  {
    id: "stay",
    cx: 900,
    cy: 470,
    d: 160,
    fill: P.maroon,
    text: P.onDark,
    label: "First-night stay",
    hint: "A bed is waiting",
    title: "You should never land with nowhere to sleep.",
    body: "We confirm where you will stay on arrival and send you the address before you leave, so the first night is already sorted.",
    steps: [
      "Confirmed accommodation for your first nights",
      "Address and directions sent before you fly",
      "Help finding longer-term housing",
    ],
  },
  {
    id: "support",
    cx: 1100,
    cy: 430,
    d: 140,
    fill: P.mustard,
    text: P.ink,
    label: "Support after you land",
    hint: "We stay in touch",
    title: "Landing is not the end of our job.",
    body: "We check in after you arrive and stay reachable if something about your work or your stay is not right.",
    steps: [
      "A check-in call after you arrive",
      "One person to contact if there is a problem at work",
      "Help with permits and renewals",
    ],
  },
];

const DEFAULT_ID = "airport";

/** Artboard used to place circles and decoration. */
const W = 1200;
const H = 600;

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCountUp(target: number, active: boolean, delay = 0, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const begin = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - begin) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, delay, duration]);

  return value;
}

/* -------------------------------------------------------------------------- */
/*  Styles (scoped, one orchestrated entrance, everything else on interaction) */
/* -------------------------------------------------------------------------- */

const css = `
.sb-root { --sb-cream: ${P.cream}; --sb-ink: ${P.ink}; }

.sb-wrap { opacity: 0; transform: scale(0.82); }
.sb-in .sb-wrap {
  animation: sb-pop 0.75s cubic-bezier(0.2, 0.9, 0.25, 1) both;
  animation-delay: var(--sb-delay, 0ms);
}
@keyframes sb-pop {
  from { opacity: 0; transform: scale(0.82); }
  to   { opacity: 1; transform: scale(1); }
}

.sb-btn {
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease;
  box-shadow: 0 16px 26px -16px rgba(20, 38, 43, 0.6);
}
.sb-btn:hover { transform: scale(1.04); }
.sb-btn[aria-pressed="true"] {
  box-shadow: 0 0 0 3px var(--sb-cream), 0 0 0 5px var(--sb-ink), 0 22px 30px -16px rgba(20, 38, 43, 0.7);
}
.sb-btn:focus-visible { outline: 3px solid var(--sb-ink); outline-offset: 4px; }

.sb-fade { animation: sb-fade 0.35s ease both; }
@keyframes sb-fade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}

.sb-line { transition: opacity 0.2s ease; }

@media (prefers-reduced-motion: reduce) {
  .sb-wrap { opacity: 1; transform: none; }
  .sb-in .sb-wrap { animation: none; }
  .sb-btn, .sb-fade { transition: none; animation: none; }
  .sb-btn:hover { transform: none; }
}
`;

/* -------------------------------------------------------------------------- */
/*  Decoration drawn behind / in front of the circles                          */
/* -------------------------------------------------------------------------- */

function DecorBack() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      {/* long black hairlines */}
      <line x1="30" y1="40" x2="30" y2="330" stroke={P.ink} strokeWidth="1.5" />
      <line x1="20" y1="330" x2="520" y2="330" stroke={P.ink} strokeWidth="1.5" />
      <line x1="1010" y1="345" x2="1010" y2="585" stroke={P.ink} strokeWidth="1.5" />

      {/* gold and orange arcs */}
      <path d="M 70 300 A 150 150 0 0 0 270 310" stroke={P.mustard} strokeWidth="3" strokeLinecap="round" />
      <path d="M 430 320 A 170 170 0 0 1 650 335" stroke={P.orange} strokeWidth="3" strokeLinecap="round" />
      <path d="M 860 40 A 190 190 0 0 1 1150 110" stroke={P.mustard} strokeWidth="2" strokeLinecap="round" />
      <path d="M 600 560 A 120 120 0 0 0 780 560" stroke={P.teal} strokeWidth="2" strokeLinecap="round" />

      {/* small dots, same as the artwork */}
      <circle cx="62" cy="385" r="9" fill={P.mustard} />
      <circle cx="62" cy="425" r="9" fill={P.maroon} />

      {/* ring with a black core */}
      <circle cx="1160" cy="565" r="16" fill={P.ink} stroke={P.ink} strokeWidth="1.5" />
      <circle cx="1160" cy="565" r="22" stroke={P.ink} strokeWidth="1" />
    </svg>
  );
}

function DecorFront() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      <line x1="645" y1="30" x2="645" y2="330" stroke={P.orange} strokeWidth="1.5" opacity="0.7" />
      <line x1="500" y1="330" x2="860" y2="330" stroke={P.ink} strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat                                                                        */
/* -------------------------------------------------------------------------- */

type StatProps = {
  target: number;
  suffix?: string;
  label: string;
  dot: string;
  active: boolean;
  delay: number;
};

function Stat({ target, suffix = "", label, dot, active, delay }: StatProps) {
  const value = useCountUp(target, active, delay);
  const full = `${target.toLocaleString("en-US")}${suffix}`;

  return (
    <div className="border-l border-line pl-5">
      <span aria-hidden="true" className="mb-3 block h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
      <p className="font-display text-4xl text-ink md:text-5xl">
        <span className="sr-only">{full}</span>
        <span aria-hidden="true">
          {value.toLocaleString("en-US")}
          {suffix}
        </span>
      </p>
      <p className="mt-1 text-sm text-slate">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                              */
/* -------------------------------------------------------------------------- */

type StatsBarProps = {
  /** Where the "Talk to us" button goes. */
  ctaHref?: string;
};

export function StatsBar({ ctaHref = "/contact" }: StatsBarProps) {
  const { t } = useLanguage();

  /** Translate with an English fallback so missing keys never show raw key names. */
  const tr = useCallback(
    (key: string, fallback: string) => {
      const v = (t as unknown as (k: string) => string)(key);
      return v && v !== key ? v : fallback;
    },
    [t]
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeId, setActiveId] = useState(DEFAULT_ID);

  /* reveal once, when the section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* resolve translated copy once per language change */
  const services = useMemo(
    () =>
      SERVICES.map((s) => {
        const k = `stats.svc.${s.id}`;
        return {
          ...s,
          label: tr(`${k}.label`, s.label),
          hint: tr(`${k}.hint`, s.hint),
          title: tr(`${k}.title`, s.title),
          body: tr(`${k}.body`, s.body),
          note: s.note ? tr(`${k}.note`, s.note) : undefined,
          steps: s.steps.map((step, i) => tr(`${k}.step${i + 1}`, step)),
        };
      }),
    [tr]
  );

  const activeIndex = Math.max(
    0,
    services.findIndex((s) => s.id === activeId)
  );
  const active = services[activeIndex];

  const select = useCallback((id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      panelRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "nearest",
      });
    }
  }, []);

  const go = (dir: 1 | -1) => {
    const next = (activeIndex + dir + services.length) % services.length;
    setActiveId(services[next].id);
  };

  const stats = [
    { target: 2300, suffix: "+", label: tr("stats.jobs", "Open jobs"), dot: P.teal },
    { target: 9800, suffix: "+", label: tr("stats.placed", "People placed"), dot: P.orange },
    { target: 140, suffix: "+", label: tr("stats.employers", "Employers"), dot: P.maroon },
    { target: 6, suffix: "", label: tr("stats.countries", "Countries"), dot: P.mustard },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-heading"
      className={`sb-root border-y border-line bg-sand/60 ${revealed ? "sb-in" : ""}`}
    >
      <style>{css}</style>

      <div className="container-content py-14 md:py-20">
        {/* ------------------------------ heading ----------------------------- */}
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <h2 id="stats-heading" className="font-display text-3xl text-ink md:text-5xl">
            {tr("stats.heading", "We do not just find you the job. We take you there.")}
          </h2>
          <p className="max-w-[52ch] text-base text-slate md:text-lg">
            {tr(
              "stats.intro",
              "From the first application to your first night abroad, someone from our team is with you. Never flown before? No visa yet? Start anyway."
            )}
          </p>
        </div>

        {/* ------------------------------- numbers ---------------------------- */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} active={revealed} delay={i * 120} />
          ))}
        </div>

        {/* ------------------------------ circles ----------------------------- */}
        <p className="mt-14 text-sm text-slate md:mt-20">
          {tr("stats.hint", "Pick a circle to see how we help at that step.")}
        </p>

        {/* desktop: free composition */}
        <div
          className="relative mt-4 hidden w-full lg:block"
          style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}
        >
          <DecorBack />

          {services.map((s, i) => {
            const style: CSSProperties = {
              left: `${((s.cx - s.d / 2) / W) * 100}%`,
              top: `${((s.cy - s.d / 2) / H) * 100}%`,
              width: `${(s.d / W) * 100}%`,
              aspectRatio: "1 / 1",
              ["--sb-delay" as string]: `${i * 80}ms`,
            };
            const labelSize = `clamp(11px, ${((s.d / W) * 100 * 0.115).toFixed(2)}cqw, 22px)`;
            return (
              <div key={s.id} className="sb-wrap absolute" style={style}>
                <button
                  type="button"
                  onClick={() => select(s.id)}
                  aria-pressed={s.id === active.id}
                  className="sb-btn flex h-full w-full flex-col items-center justify-center rounded-full text-center"
                  style={{ background: s.fill, color: s.text, padding: "12%" }}
                >
                  <span className="font-display leading-[1.1]" style={{ fontSize: labelSize }}>
                    {s.label}
                  </span>
                  {s.d >= 170 && (
                    <span className="mt-1.5 leading-tight opacity-85" style={{ fontSize: "clamp(9px, 0.95cqw, 13px)" }}>
                      {s.hint}
                    </span>
                  )}
                </button>
              </div>
            );
          })}

          <DecorFront />
        </div>

        {/* mobile and tablet: wrapped circles */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 lg:hidden">
          {services.map((s, i) => {
            const size = Math.round(s.d * 0.72);
            return (
              <div
                key={s.id}
                className="sb-wrap"
                style={{
                  width: size,
                  height: size,
                  marginTop: i % 2 ? 14 : 0,
                  ["--sb-delay" as string]: `${i * 70}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => select(s.id)}
                  aria-pressed={s.id === active.id}
                  className="sb-btn flex h-full w-full items-center justify-center rounded-full text-center"
                  style={{ background: s.fill, color: s.text, padding: "10%" }}
                >
                  <span className="font-display text-[13px] leading-[1.1]">{s.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* ------------------------------- detail ----------------------------- */}
        <div
          ref={panelRef}
          aria-live="polite"
          className="mt-12 border-t border-line pt-8 md:mt-16 md:pt-10"
        >
          <div key={active.id} className="sb-fade grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="block h-7 w-7 shrink-0 rounded-full"
                  style={{ background: active.fill }}
                />
                <p className="text-sm text-slate">{active.label}</p>
              </div>
              <h3 className="mt-4 font-display text-2xl text-ink md:text-3xl">{active.title}</h3>
              <p className="mt-3 max-w-[60ch] text-base text-slate">{active.body}</p>
              {active.note && (
                <p className="mt-4 max-w-[60ch] border-l-2 pl-4 text-sm text-slate" style={{ borderColor: active.fill }}>
                  {active.note}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-slate">{tr("stats.weDo", "What we do")}</p>
              <ul className="mt-3 space-y-3">
                {active.steps.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-base text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: active.fill }}
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* walk through the journey */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {tr("stats.prev", "Previous step")}
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {tr("stats.next", "Next step")}
            </button>
          </div>
        </div>

        {/* --------------------------------- CTA ------------------------------ */}
        <div className="mt-12 flex flex-col gap-4 rounded-[2rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-8" style={{ background: P.teal, color: P.onDark }}>
          <p className="max-w-[48ch] font-display text-xl md:text-2xl">
            {tr("stats.cta.text", "Not sure where you are in the process? Tell us and we will start from there.")}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center justify-center rounded-full px-7 py-3 text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ background: P.mustard, color: P.ink }}
          >
            {tr("stats.cta.button", "Talk to us")}
          </Link>
        </div>
      </div>
    </section>
  );
}