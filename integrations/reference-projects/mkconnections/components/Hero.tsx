"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Pause,
  Phone,
  Plane,
  Play,
  ShieldCheck,
} from "lucide-react";
import { Allura, Bebas_Neue, Poppins } from "next/font/google";
import { JobSearchBar } from "./JobSearchBar";

/* -------------------------------------------------------------------------- */
/* Fonts — condensed display, flowing script and a clean body face, exactly   */
/* the three voices used in the reference banners                             */
/* -------------------------------------------------------------------------- */

const display = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" });
const script = Allura({ subsets: ["latin"], weight: "400", display: "swap" });
const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/* Existing data (unchanged)                                                  */
/* -------------------------------------------------------------------------- */

const destinations = [
  { name: "Saudi Arabia", image: "/images/countries/saudiarabia.png" },
  { name: "United Arab Emirates", image: "/images/countries/dubaicity.png" },
  { name: "Qatar", image: "/images/countries/qatar.png" },
  { name: "Kuwait", image: "/images/countries/kuwaitcity.jfif" },
  { name: "Bahrain", image: "/images/countries/manamabahrain.png" },
  { name: "Oman", image: "/images/countries/muscatoman.png" },
];

/* Extra photography from /public/images/design */
const gallery = [
  { src: "/images/design/dubaiplane.png", alt: "Dubai skyline at sunset" },
  { src: "/images/design/image2.png", alt: "Gulf city lights at night" },
  { src: "/images/design/image3.png", alt: "Airport departure sign" },
  { src: "/images/design/image5.png", alt: "Kuwait skyline at dusk" },
  { src: "/images/design/plane.png", alt: "Aircraft above the clouds" },
  { src: "/images/design/uaeplane.png", alt: "Aircraft parked at the terminal" },
];

/* -------------------------------------------------------------------------- */
/* Slides — Vision · Mission · Why choose us · Why trust us                   */
/* -------------------------------------------------------------------------- */

type Variant = 1 | 2 | 3 | 4;

type Slide = {
  id: string;
  tab: string;
  variant: Variant;
  accent: string;
  image: string;
  imagePos: string;
  script?: string;
  lines: string[];
  accentLine: string;
  text: string;
  list: string[];
  badge?: { label: string; big: string[] };
  bar?: { label: string; big: string };
};

const GRAY = "#4a4a4a";
const SOFT = "#6b6b6b";

const slides: Slide[] = [
  {
    id: "vision",
    tab: "Our vision",
    variant: 1,
    accent: "#b99468",
    image: "/images/design/coolplane.png",
    imagePos: "60% 50%",
    lines: ["OUR VISION", "BORDERLESS"],
    accentLine: "CAREERS",
    text: "A Kenya where every capable worker can reach genuine overseas employment with confidence, dignity and the right preparation.",
    list: ["Genuine employers", "Fair, clear process", "Prepared workers", "Safe journeys"],
    badge: { label: "OUR PROMISE", big: ["GENUINE", "JOBS ONLY"] },
  },
  {
    id: "mission",
    tab: "Our mission",
    variant: 2,
    accent: "#c8202f",
    image: "/images/design/qatarpassport.png",
    imagePos: "50% 35%",
    script: "Our",
    lines: ["MISSION IS"],
    accentLine: "YOUR JOURNEY",
    text: "To guide Kenyans through every step of overseas recruitment, from honest job information and document readiness to departure, with clear human support.",
    list: ["Honest job info", "Interview prep", "Document support", "Step-by-step help"],
  },
  {
    id: "why-choose-us",
    tab: "Why choose us",
    variant: 3,
    accent: "#2fb34a",
    image: "/images/design/image1.png",
    imagePos: "50% 40%",
    script: "Why",
    lines: ["CHOOSE"],
    accentLine: "MK CONNECTION",
    text: "We combine genuine opportunities, practical guidance and people who pick up the phone, so you never navigate overseas recruitment alone.",
    list: ["No login needed", "Safety-first advice", "6 Gulf destinations", "Real people, real help"],
    badge: { label: "HUMAN SUPPORT", big: ["START TO", "FINISH"] },
  },
  {
    id: "why-trust-us",
    tab: "Why trust us",
    variant: 4,
    accent: "#c8202f",
    image: "/images/design/image4.png",
    imagePos: "50% 50%",
    script: "Why",
    lines: ["YOU CAN"],
    accentLine: "TRUST US",
    text: "Transparent communication, clear requirements and no pressure. We tell you what an employer expects, what to prepare and what to watch out for before you commit.",
    list: ["Clear requirements", "Terms explained", "Scam awareness", "Honest answers"],
    bar: { label: "TERMS & SALARY", big: "CONFIRMED DIRECTLY" },
  },
];

const INTERVAL = 6000; // ms between automatic slide changes

/* -------------------------------------------------------------------------- */
/* Shape geometry                                                             */
/* Desktop banners are drawn in a 1000 × 370 coordinate space and scale with  */
/* the banner, so the composition is identical at every width.                */
/* -------------------------------------------------------------------------- */

const deskClip: Record<Variant, string> = {
  1: "M615 0 H1000 V370 H610 C540 330 480 250 520 190 C560 130 650 100 615 0 Z",
  2: "M745 0 H1000 V370 H700 C575 300 565 90 745 0 Z",
  3: "M460 0 H1000 V370 H640 C650 280 600 130 460 0 Z",
  4: "M690 0 H1000 V370 H660 L520 235 Z",
};

function DeskShapes({ variant, accent }: { variant: Variant; accent: string }) {
  switch (variant) {
    case 1:
      return (
        <>
          <rect x="750" y="285" width="250" height="85" fill={accent} opacity="0.9" />
          <circle cx="520" cy="285" r="100" fill="#fff" />
          <circle cx="520" cy="285" r="84" fill={accent} />
        </>
      );
    case 2:
      return (
        <>
          <path
            d="M545 0 H745 C640 55 592 120 585 175 C560 120 540 60 545 0 Z"
            fill={accent}
          />
          <path
            d="M565 370 H700 C640 335 600 290 580 240 C560 290 555 330 565 370 Z"
            fill={accent}
          />
        </>
      );
    case 3:
      return (
        <>
          <path
            d="M385 0 H460 C600 130 650 280 640 370 H598 C606 290 540 140 385 0 Z"
            fill="#e4e4e4"
          />
          <rect x="700" y="300" width="300" height="70" fill={accent} opacity="0.9" />
          <circle cx="589" cy="237" r="58" fill={accent} />
        </>
      );
    case 4:
      return (
        <path
          d="M600 0 H690 L520 235 L660 370 H580 L450 235 Z"
          fill={accent}
        />
      );
  }
}

/* Mobile banners: photo on top, curved lower edge, text underneath.          */
const mobClip: Record<Variant, string> = {
  1: "M0 0 H100 V74 C82 92 64 68 44 84 C28 96 12 82 0 88 Z",
  2: "M0 0 H100 V74 C70 100 30 100 0 74 Z",
  3: "M0 0 H100 V80 C66 94 30 92 0 66 Z",
  4: "M0 0 H100 V70 L50 92 L0 70 Z",
};

/* -------------------------------------------------------------------------- */
/* Desktop layout (percent positions inside the banner)                       */
/* -------------------------------------------------------------------------- */

type Pos = { left: string; top: string };

const deskLayout: Record<
  Variant,
  {
    logo: Pos;
    script: Pos;
    head: Pos & { fs: number };
    para: Pos & { w: string };
    contact: Pos;
    btn: Pos;
    list: Pos & { w: string; cols: 1 | 2; light: boolean };
  }
> = {
  1: {
    logo: { left: "43%", top: "17%" },
    script: { left: "5.5%", top: "5%" },
    head: { left: "5.5%", top: "12%", fs: 6.9 },
    para: { left: "5.5%", top: "69%", w: "31%" },
    contact: { left: "5.5%", top: "88%" },
    btn: { left: "33%", top: "86.5%" },
    list: { left: "75.5%", top: "78.5%", w: "23.5%", cols: 2, light: true },
  },
  2: {
    logo: { left: "42%", top: "13%" },
    script: { left: "8.5%", top: "7%" },
    head: { left: "8.5%", top: "21%", fs: 7.4 },
    para: { left: "8.5%", top: "61%", w: "31%" },
    contact: { left: "8.5%", top: "81%" },
    btn: { left: "41%", top: "79.5%" },
    list: { left: "41%", top: "31%", w: "14%", cols: 1, light: false },
  },
  3: {
    logo: { left: "6%", top: "7%" },
    script: { left: "7%", top: "15%" },
    head: { left: "7%", top: "29%", fs: 7.4 },
    para: { left: "7%", top: "62%", w: "33%" },
    contact: { left: "7%", top: "82%" },
    btn: { left: "34%", top: "80.5%" },
    list: { left: "71%", top: "81.5%", w: "28%", cols: 2, light: true },
  },
  4: {
    logo: { left: "36%", top: "13%" },
    script: { left: "8.5%", top: "7%" },
    head: { left: "8.5%", top: "21%", fs: 7.4 },
    para: { left: "8.5%", top: "61%", w: "31%" },
    contact: { left: "8.5%", top: "81%" },
    btn: { left: "36%", top: "79.5%" },
    list: { left: "36%", top: "31%", w: "15%", cols: 1, light: false },
  },
};

/* Small logo mark used on every banner (plane + company name). */
function LogoMark({ accent, size = 3 }: { accent: string; size?: number }) {
  return (
    <div className="flex items-center" style={{ gap: `${size * 0.3}cqw`, color: accent }}>
      <span style={{ width: `${size}cqw`, height: `${size}cqw` }}>
        <Plane className="h-full w-full" strokeWidth={1.5} />
      </span>
      <span
        className="font-semibold leading-tight"
        style={{ fontSize: `${size * 0.27}cqw`, letterSpacing: "0.18em" }}
      >
        MK CONNECTION
        <br />
        LIMITED
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop banner                                                             */
/* -------------------------------------------------------------------------- */

function DesktopSlide({ s, first }: { s: Slide; first: boolean }) {
  const L = deskLayout[s.variant];
  const clipId = `desk-clip-${s.id}`;
  const abs = (p: Pos) => ({ position: "absolute" as const, left: p.left, top: p.top });

  return (
    <div className="absolute inset-0" style={{ fontFamily: body.style.fontFamily }}>
      {/* photo, clipped to the variant's curve */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }}
      >
        <div className="absolute inset-y-0 right-0 w-[62%]">
          <Image
            src={s.image}
            alt={`${s.tab} — MK Connection Limited`}
            fill
            priority={first}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            style={{ objectPosition: s.imagePos }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* accent shapes + clip definition */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 370"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path transform="scale(0.001 0.0027027)" d={deskClip[s.variant]} />
          </clipPath>
        </defs>
        <DeskShapes variant={s.variant} accent={s.accent} />
      </svg>

      {/* logo */}
      <div style={abs(L.logo)}>
        <LogoMark accent={s.accent} />
      </div>

      {/* script word */}
      {s.script && (
        <div
          aria-hidden="true"
          style={{
            ...abs(L.script),
            fontFamily: script.style.fontFamily,
            fontSize: "5.4cqw",
            lineHeight: 1,
            color: s.accent,
          }}
        >
          {s.script}
        </div>
      )}

      {/* headline */}
      <h2
        style={{
          ...abs(L.head),
          fontFamily: display.style.fontFamily,
          fontSize: `${L.head.fs}cqw`,
          lineHeight: 0.95,
          letterSpacing: "0.01em",
          color: GRAY,
          fontWeight: 400,
        }}
      >
        {s.script && <span className="sr-only">{s.script} </span>}
        {s.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
        <span className="block" style={{ color: s.accent }}>
          {s.accentLine}
        </span>
      </h2>

      {/* paragraph */}
      <p
        style={{
          ...abs(L.para),
          width: L.para.w,
          fontSize: "max(9.5px, 1.1cqw)",
          lineHeight: 1.65,
          color: SOFT,
        }}
      >
        {s.text}
      </p>

      {/* contact row */}
      <div
        className="flex items-center whitespace-nowrap"
        style={{ ...abs(L.contact), gap: "1.6cqw", fontSize: "max(9.5px, 1.05cqw)", color: GRAY }}
      >
        <Link href="/#contact" className="flex items-center font-medium" style={{ gap: "0.6cqw" }}>
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: "2cqw", height: "2cqw", background: s.accent }}
          >
            <Phone className="text-white" style={{ width: "55%", height: "55%" }} />
          </span>
          Talk to our team
        </Link>
        <span className="flex items-center font-medium" style={{ gap: "0.6cqw" }}>
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: "2cqw", height: "2cqw", background: s.accent }}
          >
            <Globe2 className="text-white" style={{ width: "55%", height: "55%" }} />
          </span>
          Kenya → Gulf
        </span>
      </div>

      {/* button */}
      <Link
        href="/#apply"
        className="whitespace-nowrap rounded-full font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          ...abs(L.btn),
          fontSize: "max(9px, 1cqw)",
          padding: "0.6cqw 1.7cqw",
          background: s.variant === 1 || s.variant === 3 ? s.accent : GRAY,
          outlineColor: s.accent,
        }}
      >
        Apply now
      </Link>

      {/* checklist */}
      <ul
        className="grid"
        style={{
          ...abs(L.list),
          width: L.list.w,
          gridTemplateColumns: L.list.cols === 2 ? "1fr 1fr" : "1fr",
          rowGap: "0.75cqw",
          columnGap: "1cqw",
          fontSize: "max(9px, 1.02cqw)",
          color: L.list.light ? "#fff" : GRAY,
        }}
      >
        {s.list.map((item) => (
          <li key={item} className="flex items-center whitespace-nowrap font-medium" style={{ gap: "0.5cqw" }}>
            <CheckCircle2
              className="shrink-0"
              style={{
                width: "1.3cqw",
                height: "1.3cqw",
                color: L.list.light ? "#fff" : s.accent,
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      {/* round badge (variants 1 and 3) */}
      {s.badge && s.variant === 1 && (
        <div
          className="absolute flex flex-col items-center justify-center rounded-full text-center text-white"
          style={{
            left: "43.6%",
            top: "49.6%",
            width: "16.8%",
            aspectRatio: "1",
            background: s.accent,
          }}
        >
          <span style={{ fontSize: "0.85cqw", letterSpacing: "0.12em" }} className="font-medium">
            {s.badge.label}
          </span>
          {s.badge.big.map((b) => (
            <span key={b} className="font-semibold leading-tight" style={{ fontSize: "1.85cqw" }}>
              {b}
            </span>
          ))}
        </div>
      )}
      {s.badge && s.variant === 3 && (
        <div
          className="absolute flex flex-col items-center justify-center rounded-full text-center text-white"
          style={{
            left: "53.1%",
            top: "48.4%",
            width: "11.6%",
            aspectRatio: "1",
            background: s.accent,
          }}
        >
          <span style={{ fontSize: "0.7cqw", letterSpacing: "0.1em" }} className="font-medium">
            {s.badge.label}
          </span>
          {s.badge.big.map((b) => (
            <span key={b} className="font-semibold leading-tight" style={{ fontSize: "1.45cqw" }}>
              {b}
            </span>
          ))}
        </div>
      )}

      {/* price-bar style callout (variant 4) */}
      {s.bar && (
        <div
          className="absolute flex flex-col justify-center text-white"
          style={{
            left: "74.8%",
            top: "72.6%",
            width: "25.2%",
            height: "17.4%",
            background: `${s.accent}e6`,
            paddingLeft: "1.6cqw",
          }}
        >
          <span style={{ fontSize: "0.85cqw", letterSpacing: "0.12em" }} className="font-medium opacity-90">
            {s.bar.label}
          </span>
          <span className="font-semibold leading-tight" style={{ fontSize: "1.9cqw" }}>
            {s.bar.big}
          </span>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile / tablet banner — same language, stacked                            */
/* -------------------------------------------------------------------------- */

function MobileSlide({ s, first }: { s: Slide; first: boolean }) {
  const clipId = `mob-clip-${s.id}`;
  const d = mobClip[s.variant];

  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: body.style.fontFamily }}>
      {/* photo with curved edge */}
      <div className="relative h-[250px] sm:h-[340px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path transform="scale(0.01)" d={d} />
            </clipPath>
          </defs>
          {s.variant === 3 && <path d={d} transform="translate(0,9)" fill="#e4e4e4" />}
          <path d={d} transform="translate(0,6)" fill={s.accent} />
        </svg>

        <div
          className="absolute inset-0"
          style={{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }}
        >
          <Image
            src={s.image}
            alt={`${s.tab} — MK Connection Limited`}
            fill
            priority={first}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: s.imagePos }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        {s.badge && (
          <div
            className="absolute bottom-2 right-4 z-20 flex flex-col items-center justify-center rounded-full text-center text-white shadow-lg sm:right-8"
            style={{
              background: s.accent,
              width: s.variant === 1 ? 104 : 90,
              height: s.variant === 1 ? 104 : 90,
            }}
          >
            <span className="text-[7px] font-medium tracking-[0.12em]">{s.badge.label}</span>
            {s.badge.big.map((b) => (
              <span
                key={b}
                className={`font-semibold leading-tight ${s.variant === 1 ? "text-[13px]" : "text-[11px]"}`}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {s.bar && (
          <div
            className="absolute bottom-[18%] right-0 z-20 w-[66%] px-3 py-2 text-white sm:w-[50%]"
            style={{ background: `${s.accent}e6` }}
          >
            <span className="block text-[7px] font-medium tracking-[0.12em] opacity-90">
              {s.bar.label}
            </span>
            <span className="block text-sm font-semibold leading-tight">{s.bar.big}</span>
          </div>
        )}
      </div>

      {/* text */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-8 pt-2 sm:px-10">
        <div className="flex items-center gap-2" style={{ color: s.accent }}>
          <Plane size={18} strokeWidth={1.6} />
          <span className="text-[9px] font-semibold leading-tight tracking-[0.18em]">
            MK CONNECTION LIMITED
          </span>
        </div>

        {s.script && (
          <div
            aria-hidden="true"
            className="mt-2 text-[34px] leading-none sm:text-[44px]"
            style={{ fontFamily: script.style.fontFamily, color: s.accent }}
          >
            {s.script}
          </div>
        )}

        <h2
          className={`${s.script ? "mt-0.5" : "mt-3"} text-[52px] font-normal leading-[0.92] tracking-[0.01em] sm:text-[72px]`}
          style={{ fontFamily: display.style.fontFamily, color: GRAY }}
        >
          {s.script && <span className="sr-only">{s.script} </span>}
          {s.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          <span className="block" style={{ color: s.accent }}>
            {s.accentLine}
          </span>
        </h2>

        <p className="mt-3 max-w-xl text-[13px] leading-6 sm:text-[15px]" style={{ color: SOFT }}>
          {s.text}
        </p>

        <ul className="mt-4 grid max-w-xl grid-cols-2 gap-x-3 gap-y-2 text-[12px] font-medium sm:text-[14px]" style={{ color: GRAY }}>
          {s.list.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="shrink-0" style={{ color: s.accent }} />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link
            href="/#apply"
            className="rounded-full px-6 py-2.5 text-[12px] font-semibold text-white transition hover:brightness-110"
            style={{ background: s.variant === 1 || s.variant === 3 ? s.accent : GRAY }}
          >
            Apply now
          </Link>
          <Link
            href="/#contact"
            className="flex items-center gap-1.5 text-[12px] font-medium"
            style={{ color: GRAY }}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{ background: s.accent }}
            >
              <Phone size={12} className="text-white" />
            </span>
            Talk to our team
          </Link>
          <span className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: GRAY }}>
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{ background: s.accent }}
            >
              <Globe2 size={12} className="text-white" />
            </span>
            Kenya → Gulf
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Showcase carousel: slides always travel to the left                        */
/* -------------------------------------------------------------------------- */

function Showcase() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL
    );
    return () => clearTimeout(t);
  }, [index, playing]);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const current = slides[index];

  return (
    <section
      id="showcase"
      aria-roledescription="carousel"
      aria-label="Vision, mission, why choose us and why trust us"
      className="relative overflow-hidden bg-[#ececec] py-8 md:py-12"
    >
      <div className="mx-auto max-w-[1250px] px-4 sm:px-6">
        {/* banner */}
        <div className="relative bg-white shadow-[0_32px_40px_-22px_rgba(0,0,0,0.5)]">
          <div
            className="grid grid-cols-1 overflow-hidden lg:aspect-[1000/370] lg:grid-rows-[minmax(0,1fr)]"
            style={{ containerType: "inline-size" }}
            aria-live={playing ? "off" : "polite"}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${current.tab}`}
                className="relative col-start-1 row-start-1 touch-pan-y"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  duration: reduce ? 0.01 : 0.75,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onPanEnd={(_, info) => {
                  if (info.offset.x < -60) next();
                }}
              >
                <div className="absolute inset-0 hidden lg:block">
                  <DesktopSlide s={current} first={index === 0} />
                </div>
                <div className="lg:hidden">
                  <MobileSlide s={current} first={index === 0} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* controls */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <p
            className="text-xs font-semibold tracking-[0.2em] text-[#4a4a4a]"
            style={{ fontFamily: body.style.fontFamily }}
          >
            {String(index + 1).padStart(2, "0")}
            <span className="mx-2 text-[#9a9a9a]">/</span>
            {String(slides.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause automatic slides" : "Play automatic slides"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4a4a4a] shadow transition hover:-translate-y-0.5"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="flex h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold text-white shadow transition hover:-translate-y-0.5"
              style={{ background: current.accent, fontFamily: body.style.fontFamily }}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* tabs with thumbnails + progress */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={active ? "true" : undefined}
                className={`relative flex items-center gap-3 overflow-hidden bg-white p-2 text-left shadow-[0_14px_24px_-16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <span className="relative h-12 w-12 shrink-0 overflow-hidden">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                    style={{ objectPosition: s.imagePos }}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-[10px] font-semibold tracking-[0.2em]"
                    style={{ color: s.accent, fontFamily: body.style.fontFamily }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="block truncate text-sm font-semibold text-[#4a4a4a]"
                    style={{ fontFamily: body.style.fontFamily }}
                  >
                    {s.tab}
                  </span>
                </span>

                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-black/10">
                  {active && (
                    <motion.span
                      key={`${index}-${playing}`}
                      className="block h-full origin-left"
                      style={{ background: s.accent }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: playing ? 1 : 0 }}
                      transition={{
                        duration: playing ? INTERVAL / 1000 : 0,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <>
      {/* New: four auto-sliding banners (vision, mission, why choose us, why trust us) */}
      <Showcase />

      {/* Existing hero — everything preserved */}
      <section className="relative overflow-hidden bg-[#073b82] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,.18),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(44,129,255,.28),transparent_32%)]" />
        <div className="container-content relative py-10 md:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                <span className="h-2 w-2 rounded-full bg-cyan-300" /> Kenya → international opportunities
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }} className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Connecting talents to <span className="text-cyan-200">international opportunities.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="mt-6 max-w-2xl text-base leading-7 text-white/78 md:text-lg">
                MK Connection Limited helps Kenyans discover genuine overseas employment opportunities, prepare confidently, and move through recruitment with clear human support from start to finish.
              </motion.p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><CheckCircle2 size={16} /> No login required</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><ShieldCheck size={16} /> Safety-first guidance</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Globe2 size={16} /> 6 Gulf destinations</span>
              </div>

              <div className="mt-8 max-w-4xl">
                <JobSearchBar />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <Link href="/#apply" className="rounded-full bg-white px-5 py-3 font-bold text-[#073b82] transition hover:bg-cyan-50">Start an application</Link>
                <Link href="/for-employers" className="inline-flex items-center gap-2 font-semibold text-white/90 hover:text-white">Hire Kenyan talent <ArrowRight size={16} /></Link>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 }} className="relative">
              {/* New: floating photo accents */}
              <div className="pointer-events-none absolute -left-3 -top-5 z-10 hidden w-24 -rotate-6 overflow-hidden rounded-xl border-4 border-white shadow-2xl sm:block">
                <div className="relative aspect-[3/4]">
                  <Image src="/images/design/plane.png" alt="" fill sizes="96px" className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-5 -right-3 z-10 hidden w-24 rotate-6 overflow-hidden rounded-xl border-4 border-white shadow-2xl sm:block">
                <div className="relative aspect-[3/4]">
                  <Image src="/images/design/qatarpassport.png" alt="" fill sizes="96px" className="object-cover" />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <Image src="/images/countries/dubaicity.png" alt="International opportunity destination" fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062a5d]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Explore destinations</p>
                    <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">Your next opportunity can start here.</h2>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 sm:grid-cols-6">
                  {destinations.map((d) => (
                    <Link key={d.name} href={`/destinations/${d.name.toLowerCase().replace(/\s+/g, "-")}`} className="group relative aspect-square overflow-hidden rounded-xl bg-white/10">
                      <Image src={d.image} alt={d.name} fill className="object-cover transition duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-[#073b82]/20 group-hover:bg-transparent" />
                    </Link>
                  ))}
                </div>

                {/* New: photo strip */}
                <div className="px-2 pb-1 pt-1">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200/80">
                    From Nairobi to the skyline
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {gallery.map((g) => (
                      <div key={g.src} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/10">
                        <Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 30vw, 90px" className="object-cover" />
                        <div className="absolute inset-0 bg-[#073b82]/15" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}