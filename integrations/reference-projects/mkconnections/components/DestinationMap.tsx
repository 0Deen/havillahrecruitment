"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { destinations } from "@/data/jobs";

// Stylized, non-geographic positions: Kenya on the left, six Gulf
// destinations fanning out to the right at different heights.
const points = [
  { name: "Saudi Arabia", x: 620, y: 90 },
  { name: "United Arab Emirates", x: 700, y: 160 },
  { name: "Qatar", x: 660, y: 240 },
  { name: "Kuwait", x: 560, y: 260 },
  { name: "Bahrain", x: 480, y: 220 },
  { name: "Oman", x: 720, y: 300 },
];

const origin = { x: 90, y: 210 };

export function DestinationMap() {
  const { t } = useLanguage();
  const [active, setActive] = useState(points[0].name);
  const activeDestination = destinations.find((d) => d.name === active);

  return (
    <section className="container-content py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink md:text-3xl">{t("map.title")}</h2>
          <p className="mt-2 max-w-md text-sm text-slate">{t("map.sub")}</p>
        </div>
      </div>

      <div className="grid gap-8 rounded-3xl border border-line bg-sand/40 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
        <div className="overflow-hidden">
          <svg viewBox="0 0 780 380" className="w-full">
            {points.map((p, i) => (
              <path
                key={p.name}
                d={`M ${origin.x} ${origin.y} Q ${(origin.x + p.x) / 2} ${Math.min(origin.y, p.y) - 60}, ${p.x} ${p.y}`}
                fill="none"
                stroke={active === p.name ? "#FAA419" : "#EAEAEA"}
                strokeWidth={active === p.name ? 2.5 : 1.5}
                strokeDasharray={600}
                strokeDashoffset={600}
                className="animate-dash"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}

            <circle cx={origin.x} cy={origin.y} r={9} fill="#1F1F1F" />
            <text x={origin.x} y={origin.y + 28} textAnchor="middle" className="fill-ink text-[13px] font-medium">
              Kenya
            </text>

            {points.map((p) => (
              <g
                key={p.name}
                onClick={() => setActive(p.name)}
                className="cursor-pointer"
                role="button"
                aria-label={p.name}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active === p.name ? 9 : 6}
                  fill={active === p.name ? "#FAA419" : "#1F1F1F"}
                  className="transition-all"
                />
                <text
                  x={p.x}
                  y={p.y - 16}
                  textAnchor="middle"
                  className={`text-[12px] transition-all ${active === p.name ? "fill-ink font-semibold" : "fill-slate"}`}
                >
                  {p.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-slate">Selected destination</p>
          <h3 className="mt-2 font-display text-2xl text-ink">{active}</h3>
          <p className="mt-3 text-sm text-slate">
            {activeDestination?.jobs ?? 0}+ opportunities currently listed for {active}.
          </p>
          <Link
            href={`/destinations/${active.toLowerCase().replace(/\s+/g, "-")}`}
            className="mt-6 inline-block rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-amber-deep"
          >
            View {active} opportunities
          </Link>
        </div>
      </div>
    </section>
  );
}
