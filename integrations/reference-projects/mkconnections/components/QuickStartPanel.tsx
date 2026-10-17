"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, FileText, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* ADDED: palette taken from the geometric reference artwork */
const P = {
  teal: "#1f4e5a",
  deepTeal: "#133a44",
  orange: "#d9772b",
  maroon: "#7a1620",
  sand: "#f0b95a",
  cream: "#f3f1e8",
};

/* ADDED: decorative geometric art, one composition per card.
   Shapes drift when the card is the active (expanded) one. */
function CardArt({ index, active, dark }: { index: number; active: boolean; dark: boolean }) {
  const shift = (x: number, y: number) => ({
    transform: active ? `translate(${x}px, ${y}px)` : "translate(0,0)",
    transition: "transform 700ms cubic-bezier(.65,0,.35,1)",
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="pointer-events-none absolute -right-6 -top-6 h-[78%] w-[88%] md:h-[85%] md:w-[95%]"
      preserveAspectRatio="xMaxYMin meet"
    >
      {index === 0 && (
        <>
          <path d="M250 40 A130 130 0 0 0 250 300" fill="none" stroke={P.orange} strokeWidth="3" strokeLinecap="round" />
          <path d="M300 30 A110 110 0 0 1 300 250 Z" fill={P.teal} style={shift(-14, 10)} />
          <circle cx="262" cy="140" r="52" fill={P.sand} style={shift(10, -8)} />
          <rect x="210" y="140" width="104" height="52" fill={P.orange} opacity="0.35" style={shift(10, -8)} />
          <line x1="150" y1="20" x2="150" y2="360" stroke={P.deepTeal} strokeWidth="2" />
          <circle cx="150" cy="300" r="22" fill={P.teal} style={shift(0, -16)} />
        </>
      )}

      {index === 1 && (
        <>
          <circle cx="260" cy="170" r="105" fill={P.orange} style={shift(8, 6)} />
          <circle cx="238" cy="206" r="68" fill={P.maroon} style={shift(-10, 8)} />
          <circle cx="150" cy="90" r="42" fill={P.teal} style={shift(-8, -10)} />
          <path d="M120 230 A150 150 0 0 1 380 120" fill="none" stroke={P.sand} strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="250" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
          <line x1="250" y1="10" x2="250" y2="380" stroke={P.sand} strokeWidth="2" />
          <circle cx="330" cy="330" r="14" fill={P.sand} />
        </>
      )}

      {index === 2 && (
        <>
          <path d="M390 110 V390 H190 C300 380 380 270 390 110 Z" fill={P.teal} style={shift(-10, 8)} />
          <circle cx="215" cy="120" r="72" fill={P.maroon} style={shift(8, -6)} />
          <circle cx="215" cy="120" r="40" fill={P.orange} style={shift(8, -6)} />
          <path d="M80 250 A110 110 0 0 1 300 210" fill="none" stroke={P.sand} strokeWidth="3" strokeLinecap="round" />
          <line x1="90" y1="40" x2="90" y2="330" stroke={dark ? "#ffffff" : P.deepTeal} strokeWidth="2" />
          <circle cx="90" cy="330" r="10" fill={P.sand} />
        </>
      )}
    </svg>
  );
}

export function QuickStartPanel() {
  const { t } = useLanguage();

  /* ADDED: which card is expanded (Apply now is open by default) */
  const [active, setActive] = useState(1);

  const cards = [
    { icon: Briefcase, title: t("quickstart.jobCardTitle"), text: t("quickstart.jobCardText"), cta: t("quickstart.jobCardCta"), href: "/jobs", tone: "light" },
    { icon: FileText, title: t("quickstart.applyCardTitle"), text: t("quickstart.applyCardText"), cta: t("quickstart.applyCardCta"), href: "/#apply", tone: "dark" },
    { icon: Users, title: t("quickstart.hireCardTitle"), text: t("quickstart.hireCardText"), cta: t("quickstart.hireCardCta"), href: "/for-employers", tone: "light" },
  ];

  return (
    <section className="container-content py-16 md:py-24">
      <h2 className="mb-8 font-display text-2xl text-ink md:text-3xl">{t("quickstart.title")}</h2>

      {/* CHANGED: grid kept for mobile, becomes an expanding row on desktop */}
      <div className="grid gap-4 md:flex md:h-[420px] md:gap-5" onMouseLeave={() => setActive(1)}>
        {cards.map((c, i) => {
          const isActive = active === i;
          const isDark = c.tone === "dark";

          return (
            <Link
              key={c.title}
              href={c.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onTouchStart={() => setActive(i)}
              className={`group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-7 transition-[flex-grow,box-shadow,border-color,background-color] duration-700 ease-[cubic-bezier(.65,0,.35,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9772b] md:min-h-0 md:basis-0 ${
                isActive ? "md:grow-[2.1] shadow-[0_30px_50px_-28px_rgba(16,35,63,0.55)]" : "md:grow-[1]"
              } ${
                isDark ? "bg-ink text-white hover:bg-ink/90" : "border border-line bg-white hover:border-amber"
              }`}
              style={!isDark ? { backgroundColor: isActive ? P.cream : undefined } : undefined}
            >
              {/* ADDED: geometric artwork */}
              <CardArt index={i} active={isActive} dark={isDark} />

              <div className="relative z-10">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full transition-transform duration-500 ${
                    isActive ? "scale-110" : ""
                  }`}
                  style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(31,78,90,0.08)" }}
                >
                  <c.icon size={22} className={isDark ? "text-amber" : "text-amber"} />
                </span>
                <h3 className="mt-5 font-display text-xl md:text-2xl">{c.title}</h3>
                <p className={`mt-2 max-w-[22rem] text-sm ${isDark ? "text-white/60" : "text-slate"}`}>{c.text}</p>
              </div>

              {/* CHANGED: plain text link becomes an obvious clickable button */}
              <span
                className={`relative z-10 mt-6 inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold transition-all duration-500 ${
                  isDark
                    ? "bg-white text-ink group-hover:bg-amber"
                    : "bg-ink text-white group-hover:bg-[#1f4e5a]"
                }`}
              >
                <span className="group-hover:underline">{c.cta}</span>
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[#d9772b] text-white">
                  {isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#d9772b]/50 motion-reduce:animate-none [animation-duration:2.4s]" />
                  )}
                  <ArrowUpRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12"
                  />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}