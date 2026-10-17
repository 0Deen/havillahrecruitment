"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  ArrowRight,
  Trophy,
  LayoutDashboard,
  UserCircle2,
  FlaskConical,
  PlaneTakeoff,
} from "lucide-react";

// ---------------------------------------------------------------------------
// SUCCESS STORIES — reimagined as a floating "results panel" (gauge + trend
// chart + a cycling candidate card) next to a compact quote list, in the
// spirit of the dark isometric dashboard reference.
// ---------------------------------------------------------------------------

const stories = [
  {
    name: "James M.",
    role: "Site Electrician, UAE",
    quote:
      "Registered in March, deployed by May, picked up at the airport by my employer's team.",
  },
  {
    name: "Amina H.",
    role: "Hotel Housekeeping, Qatar",
    quote: "The training school prepared me for exactly what my job now looks like.",
  },
  {
    name: "Peter O.",
    role: "Structural Welder, Oman",
    quote: "Every fee was explained before I paid anything.",
  },
];

// simple placeholder trend — swap for real monthly placement counts whenever you have them
const trendPoints = [18, 22, 20, 28, 34, 31, 40, 46];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SatisfactionGauge({ value, max }: { value: number; max: number }) {
  const pct = Math.min(value / max, 1);
  const radius = 80;
  const circumference = Math.PI * radius;
  const dash = circumference * pct;
  const needleRotation = -90 + 180 * pct;

  return (
    <svg viewBox="0 0 200 120" className="w-full">
      <path
        d="M20,110 A80,80 0 0 1 180,110"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M20,110 A80,80 0 0 1 180,110"
        fill="none"
        stroke="url(#gaugeGradient)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
      />
      <defs>
        <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9A24B" />
          <stop offset="100%" stopColor="#F1D68C" />
        </linearGradient>
      </defs>
      <line
        x1="100"
        y1="110"
        x2="100"
        y2="38"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${needleRotation} 100 110)`}
      />
      <circle cx="100" cy="110" r="6" fill="white" />
      <text x="14" y="119" fontSize="10" fill="rgba(255,255,255,0.4)">
        0
      </text>
      <text x="168" y="119" fontSize="10" fill="rgba(255,255,255,0.4)">
        {max}
      </text>
    </svg>
  );
}

function TrendChart({ points }: { points: number[] }) {
  const w = 220;
  const h = 70;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = h - ((p - min) / (max - min || 1)) * h;
    return [x, y];
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full overflow-visible">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0.45)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#trendFill)" />
      <path d={line} fill="none" stroke="#F1D68C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SuccessStoriesSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % stories.length), 4500);
    return () => clearInterval(id);
  }, []);

  const current = stories[active];
  const cycle = (dir: 1 | -1) =>
    setActive((i) => (i + dir + stories.length) % stories.length);

  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="container-page">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
          Success Stories
        </p>
        <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold md:text-4xl">
          Placed, trained, and settled in
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* --- results panel --- */}
          <div
            className="relative mx-auto w-full max-w-md rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-6 text-white shadow-2xl sm:p-8 lg:max-w-none"
            style={{ transform: "perspective(1400px) rotateY(-6deg) rotateX(3deg)" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Employer satisfaction
              </p>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/60">
                Updated monthly
              </span>
            </div>
            <SatisfactionGauge value={94} max={100} />
            <p className="-mt-2 text-center font-display text-2xl font-semibold">94/100</p>

            <div className="mt-6 rounded-2xl bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Placements trend
                </p>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <TrendingUp size={13} /> +18%
                </span>
              </div>
              <div className="mt-2">
                <TrendChart points={trendPoints} />
              </div>
            </div>

            {/* floating candidate card */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-3 text-navy-900 shadow-xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-900">
                {initials(current.name)}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="min-w-0 flex-1"
                >
                  <p className="truncate text-sm font-semibold">{current.name}</p>
                  <p className="truncate text-xs text-navy-700/60">{current.role}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex shrink-0 flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => cycle(-1)}
                  aria-label="Previous story"
                  className="rounded-full p-1 text-navy-700/50 hover:bg-sand-100 hover:text-navy-900"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => cycle(1)}
                  aria-label="Next story"
                  className="rounded-full p-1 text-navy-700/50 hover:bg-sand-100 hover:text-navy-900"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* --- quote list --- */}
          <div className="divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10 bg-white">
            {stories.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-6"
              >
                <Quote className="mt-1 shrink-0 text-gold-500" size={18} />
                <div>
                  <p className="text-sm text-navy-800">{s.quote}</p>
                  <p className="mt-3 text-sm font-semibold text-navy-900">{s.name}</p>
                  <p className="text-xs text-navy-700/60">{s.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Link
          href="/success-stories"
          className="mt-8 inline-block text-sm font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4"
        >
          Read more stories
        </Link>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// LATEST NEWS — reimagined as icon-tile cards, one raised/featured card
// among them, in the spirit of the light isometric feature-card reference.
// ---------------------------------------------------------------------------

const news = [
  {
    tag: "New",
    title: "Expanded resource library",
    description:
      "New guides on visas, contracts, life abroad and worker rights — everything you need before you fly, in one place.",
    icon: LayoutDashboard,
  },
  {
    tag: "Award",
    title: "Best Recruitment Agency, Kenya",
    description:
      "Recognised for ethical, transparent overseas placement — the standard we built this agency on.",
    icon: Trophy,
    featured: true,
  },
  {
    tag: "Medical",
    title: "New medical lab partner",
    description:
      "Pre-employment screening now runs through Primetch Laboratory at Bazaar Plaza, right next door to us.",
    icon: FlaskConical,
  },
  {
    tag: "Travel Support",
    title: "Airport-to-airport support",
    description:
      "We now handle the entire journey end to end — documents, departure, and pickup by your employer on arrival.",
    icon: PlaneTakeoff,
  },
];

function IconTile({
  icon: Icon,
  featured,
}: {
  icon: typeof LayoutDashboard;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex h-28 items-center justify-center overflow-hidden rounded-2xl ${
        featured
          ? "bg-gradient-to-br from-white/10 to-white/0"
          : "bg-gradient-to-br from-sand-100 to-white"
      }`}
    >
      <div
        className={`absolute h-16 w-16 rotate-[-6deg] rounded-2xl ${
          featured ? "bg-white/10" : "bg-white shadow-md"
        }`}
      />
      <Icon
        size={26}
        strokeWidth={1.6}
        className={`relative ${featured ? "text-gold-400" : "text-navy-900"}`}
      />
    </div>
  );
}

function NewsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
          Latest News
        </p>
        <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold md:text-4xl">
          From the agency
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col justify-between rounded-3xl p-5 ${
                n.featured
                  ? "bg-navy-950 text-white shadow-xl lg:-translate-y-4"
                  : "border border-navy-900/10 bg-white text-navy-900"
              }`}
            >
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    n.featured ? "bg-white/10 text-white/70" : "bg-sand-100 text-navy-700"
                  }`}
                >
                  {n.tag}
                </span>
                <p className="mt-3 font-display text-lg font-semibold">{n.title}</p>
                <p
                  className={`mt-2 text-sm ${
                    n.featured ? "text-white/70" : "text-navy-700/70"
                  }`}
                >
                  {n.description}
                </p>
                <Link
                  href="/news"
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    n.featured
                      ? "bg-white text-navy-900 hover:bg-white/90"
                      : "bg-navy-950 text-white hover:bg-navy-900"
                  }`}
                >
                  Explore <ArrowRight size={13} />
                </Link>
              </div>

              <div className="mt-6">
                <IconTile icon={n.icon} featured={n.featured} />
              </div>
            </motion.article>
          ))}
        </div>

        <Link
          href="/news"
          className="mt-8 inline-block text-sm font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4"
        >
          View all news
        </Link>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PARTNERS — a draggable, self-scrolling logo marquee: one row drifts
// right-to-left, the other left-to-right, both pause on hover and can be
// dragged/swiped manually at any time.
//
// `logoUrl` is left blank on purpose — plug in your partners' real logo
// files (SVG/PNG) once they're confirmed, and the chip below switches from
// a text wordmark to the actual image automatically. Swap the names for
// whichever companies you've actually signed agreements with.
// ---------------------------------------------------------------------------

type Partner = { name: string; logoUrl?: string };

const partnersRowA: Partner[] = [
  { name: "Gulf Horizon Hotels" },
  { name: "Al Fanar Construction" },
  { name: "Desert Rose Facilities" },
  { name: "Prime Logistics Gulf" },
  { name: "Coastal Health Group" },
  { name: "Atlas Manufacturing" },
];

const partnersRowB: Partner[] = [
  { name: "GulfTalent" },
  { name: "NaukriGulf" },
  { name: "HelperPlace" },
  { name: "Adecco UAE" },
  { name: "TASC Outsourcing" },
  { name: "Soundlines Group" },
];

function LogoChip({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-16 w-44 shrink-0 select-none items-center justify-center rounded-xl border border-navy-900/10 bg-white px-5 shadow-sm grayscale transition hover:grayscale-0">
      {partner.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={partner.logoUrl}
          alt={partner.name}
          draggable={false}
          className="max-h-8 w-auto object-contain"
        />
      ) : (
        <span className="text-center font-display text-sm font-semibold leading-tight text-navy-900/70">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export default function SuccessNewsPartners() {
  return (
    <>
      <SuccessStoriesSection />
      <NewsSection />
      <PartnersMarqueeSection />
    </>
  );
}

function PartnersMarqueeSection() {
  return (
    <section className="border-t border-navy-900/10 bg-sand-100 py-14">
      <div className="container-page">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-navy-700/60">
          Trusted by
        </p>
        <div className="mt-8 space-y-4">
          <PartnerRow items={partnersRowA} direction={-1} />
          <PartnerRow items={partnersRowB} direction={1} />
        </div>
        <p className="mt-4 text-center text-xs text-navy-700/40">
          Drag, swipe, or hover to pause
        </p>
      </div>
    </section>
  );
}

function PartnerRow({ items, direction }: { items: Partner[]; direction: 1 | -1 }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const doubled = [...items, ...items];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // start mid-way through the first copy so there's room to travel both ways
    el.scrollLeft = el.scrollWidth / 4;

    let raf: number;
    const speed = 0.045; // px per ms
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += direction * speed * 16;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft <= 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [direction, items.length]);

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    draggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = dragStartScroll.current - (e.clientX - dragStartX.current);
  }

  function endDrag() {
    draggingRef.current = false;
  }

  return (
    <div
      ref={scrollerRef}
      className="flex cursor-grab gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => {
        pausedRef.current = false;
        endDrag();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {doubled.map((p, i) => (
        <LogoChip key={`${p.name}-${i}`} partner={p} />
      ))}
    </div>
  );
}
