"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { uradi, GENERIC_FALLBACK } from "@/lib/job-images";

/* -------------------------------------------------------------------------- */
/* Palette (sampled from the moodboard)                                       */
/* -------------------------------------------------------------------------- */

const BAR = "#002060"; // top / bottom navy bars
const INK = "#1f2d45"; // deep navy pill + text
const NAVY = "#2f3e57"; // second navy pill
const CREAM = "#e0d8cd"; // cream pill
const TAN = "#cfac86"; // tan pill

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

type Role = readonly [
  title: string,
  category: string,
  image: string,
  fallback?: string
];

const roles: Role[] = [
  ["Caregivers", "Caregiving", "/images/jobs/caregiver.png"],
  ["Drivers", "Driving", "/images/jobs/drivers.png"],
  ["Cooks & Kitchen", "Hospitality", "/images/jobs/cheef.png"],
  ["House Maids", "Household", "/images/jobs/cleaner.png"],
  ["Security Officers", "Security", "/images/jobs/mensecurityofficers.png"],
  ["Warehouse Helpers", "Warehouse", "/images/jobs/warehosue.png"],
  ["Cleaners", "Cleaning", "/images/jobs/mencleaners.png"],
  ["General Roles", "Various", "/images/jobs/men.png"],
];

const moreRoles: Role[] = [
  ["Domestic Workers", "Domestic Employment", uradi.domesticWorker.src, uradi.domesticWorker.fallback],
  ["Professional Cleaning", "Cleaning", uradi.cleaning.src, uradi.cleaning.fallback],
  ["Caregiving & Nursing Aides", "Healthcare", uradi.caregiver.src, uradi.caregiver.fallback],
  ["Professional Drivers", "Drivers", uradi.driver.src, uradi.driver.fallback],
  ["Hospitality & Chefs", "Hospitality", uradi.hospitality.src, uradi.hospitality.fallback],
  ["Beauty & Salon", "Beauty & Salon", uradi.beauty.src, uradi.beauty.fallback],
  ["Construction", "Construction", uradi.construction.src, uradi.construction.fallback],
  ["Electricians", "Skilled Trades", uradi.electrician.src, uradi.electrician.fallback],
  ["Engineering", "Engineering", uradi.engineering.src, uradi.engineering.fallback],
  ["Factory Workers", "Manufacturing", uradi.factories.src, uradi.factories.fallback],
  ["Manufacturing", "Manufacturing", uradi.manufacturing.src, uradi.manufacturing.fallback],
  ["Agriculture", "Agriculture", uradi.agriculture.src, uradi.agriculture.fallback],
];

const TOTAL = roles.length + moreRoles.length;

/* -------------------------------------------------------------------------- */
/* Materials — every tile is one swatch from the moodboard                    */
/* -------------------------------------------------------------------------- */

type Material =
  | "oak"
  | "fluted"
  | "navy"
  | "cream"
  | "woven"
  | "sand"
  | "ball"
  | "bowl"
  | "blue";

const SOFT_SHADOW = "0 14px 26px -16px rgba(16,35,63,.45), 0 2px 6px rgba(16,35,63,.08)";

const materials: Record<Material, CSSProperties> = {
  oak: {
    backgroundColor: "#d6b88f",
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(110,70,30,.07) 0 1px, transparent 1px 7px), linear-gradient(100deg,#dcc09c 0%,#cfae86 38%,#d9bb95 62%,#cdaa80 100%)",
  },
  fluted: {
    backgroundColor: "#d9bd97",
    backgroundImage:
      "repeating-linear-gradient(90deg,#b88f62 0 1.5px,#e3c9a5 1.5px 5px,#c9a478 5px 8px)",
  },
  navy: {
    backgroundColor: "#2a3f64",
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.1) 0 1px, transparent 1px 3px)",
  },
  cream: {
    backgroundColor: "#efe8dc",
    backgroundImage: "radial-gradient(circle at 30% 25%, #f8f3ea, #e6dccd)",
  },
  woven: {
    backgroundColor: "#ebe4d6",
    backgroundImage:
      "linear-gradient(rgba(150,135,110,.38) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(150,135,110,.38) 1.5px, transparent 1.5px)",
    backgroundSize: "9px 9px",
  },
  sand: {
    backgroundImage:
      "linear-gradient(180deg,#dcc3b0 0 38%,#f3ece3 38% 50%,#d6c8b8 50% 56%,#f5efe7 56% 74%,#d8cab9 74% 80%,#f6f1ea 80%)",
  },
  ball: {
    backgroundColor: "#e4d6c8",
    backgroundImage:
      "radial-gradient(circle, rgba(255,255,255,.7) 0 1.6px, transparent 2px), radial-gradient(circle, rgba(140,110,90,.3) 0 1.6px, transparent 2px)",
    backgroundSize: "10px 10px, 10px 10px",
    backgroundPosition: "0 0, 5px 5px",
  },
  bowl: {
    backgroundColor: "#f7f4ef",
    backgroundImage: "radial-gradient(ellipse at 50% 20%, #ffffff, #ece6dc)",
  },
  blue: {
    backgroundColor: "#8fa0bb",
    backgroundImage:
      "linear-gradient(rgba(40,60,100,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(40,60,100,.28) 1px, transparent 1px)",
    backgroundSize: "5px 5px",
  },
};

type Shape = "rect" | "round" | "stadium" | "arch";

const frameShape: Record<Shape, string> = {
  rect: "rounded-[5px]",
  round: "rounded-full",
  stadium: "rounded-full",
  arch: "rounded-t-full rounded-b-[5px]",
};

const photoShape: Record<Shape, string> = {
  rect: "rounded-[3px]",
  round: "rounded-full",
  stadium: "rounded-full",
  arch: "rounded-t-full rounded-b-[3px]",
};

/* -------------------------------------------------------------------------- */
/* Tile                                                                       */
/* -------------------------------------------------------------------------- */

function Tile({
  role,
  material,
  shape = "rect",
  className = "",
  inset = "inset-2 md:inset-3.5",
  size = "md",
}: {
  role: Role;
  material: Material;
  shape?: Shape;
  className?: string;
  inset?: string;
  size?: "lg" | "md" | "sm";
}) {
  const [title, category, image, fallback] = role;
  const centered = shape === "round" || shape === "stadium";

  const titleSize =
    size === "lg"
      ? "text-xl md:text-3xl"
      : size === "md"
        ? "text-[13px] leading-tight md:text-lg"
        : "text-xs leading-tight md:text-base";

  return (
    <Link
      href={`/jobs?category=${encodeURIComponent(category)}`}
      aria-label={`${title} jobs`}
      style={{ ...materials[material], boxShadow: SOFT_SHADOW }}
      className={[
        "group relative block overflow-hidden",
        "transition-transform duration-500 motion-reduce:transition-none",
        "hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002060]",
        frameShape[shape],
        className,
      ].join(" ")}
    >
      <div className={`absolute overflow-hidden ${inset} ${photoShape[shape]}`}>
        <SafeImage
          src={image}
          fallback={fallback || GENERIC_FALLBACK}
          alt={title}
          fill
          sizes="(max-width: 768px) 70vw, 40vw"
          className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d3d]/85 via-[#0b1d3d]/10 to-transparent" />

        {!centered && (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#002060] transition-transform duration-300 group-hover:rotate-45 md:right-3 md:top-3 md:h-9 md:w-9">
            <ArrowUpRight size={15} strokeWidth={2.4} />
          </span>
        )}

        <div
          className={[
            "absolute inset-x-0 bottom-0 p-2.5 md:p-5",
            centered ? "px-3 pb-3 text-center md:pb-6" : "",
          ].join(" ")}
        >
          <h3 className={`font-semibold tracking-tight text-white ${titleSize}`}>
            {title}
          </h3>
          <p
            className={`mt-0.5 text-[11px] text-white/70 md:text-xs ${
              size === "sm" ? "hidden md:block" : ""
            } ${shape === "round" ? "hidden md:block" : ""}`}
          >
            {category}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Olive sprig (the plant in the moodboard)                                   */
/* -------------------------------------------------------------------------- */

const leaves = [
  { x: 24, y: 96, r: -150 },
  { x: 30, y: 92, r: -20 },
  { x: 42, y: 78, r: -165 },
  { x: 49, y: 72, r: -30 },
  { x: 62, y: 56, r: -150 },
  { x: 69, y: 50, r: -10 },
  { x: 82, y: 36, r: -160 },
  { x: 90, y: 28, r: -25 },
  { x: 104, y: 14, r: -60 },
];

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 ${className}`}
      style={{ filter: "drop-shadow(0 6px 5px rgba(16,35,63,.25))" }}
    >
      <path
        d="M8 116 C 38 92, 58 62, 106 12"
        fill="none"
        stroke="#4c6544"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="11"
          ry="4.6"
          fill={i % 2 ? "#6f8c5f" : "#587650"}
          transform={`rotate(${l.r} ${l.x} ${l.y})`}
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Collage layout: spans for mobile (6 cols) and desktop (12 cols)            */
/* -------------------------------------------------------------------------- */

const collage: {
  material: Material;
  shape: Shape;
  span: string;
  size: "lg" | "md" | "sm";
  inset?: string;
}[] = [
  // oak block
  { material: "oak", shape: "rect", size: "lg", span: "col-span-4 row-span-4 md:col-span-5 md:row-span-6" },
  // cream disc
  { material: "cream", shape: "round", size: "sm", span: "col-span-2 row-span-2 md:col-span-3 md:row-span-3", inset: "inset-2 md:inset-3" },
  // fluted wood
  { material: "fluted", shape: "rect", size: "md", span: "col-span-2 row-span-2 md:col-span-4 md:row-span-3" },
  // navy fabric
  { material: "navy", shape: "rect", size: "md", span: "col-span-3 row-span-3 md:col-span-7 md:row-span-3" },
  // woven rug
  { material: "woven", shape: "rect", size: "md", span: "col-span-3 row-span-2 md:col-span-3 md:row-span-2" },
  // layered sand panels
  { material: "sand", shape: "rect", size: "sm", span: "col-span-3 row-span-1 md:col-span-3 md:row-span-2", inset: "inset-1.5 md:inset-3.5" },
  // woven ball
  { material: "ball", shape: "round", size: "sm", span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2", inset: "inset-2 md:inset-3" },
  // white bowl
  { material: "bowl", shape: "stadium", size: "md", span: "col-span-4 row-span-2 md:col-span-4 md:row-span-2", inset: "inset-2 md:inset-3" },
];

const extraMaterials: Material[] = ["oak", "navy", "cream", "woven", "fluted", "blue"];
const extraShapes: Shape[] = ["rect", "arch", "stadium", "rect", "arch", "stadium"];

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function JobVisualGrid() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-white">
      {/* top navy bar */}
      <div className="h-10 md:h-12" style={{ backgroundColor: BAR }} />

      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-8 max-w-2xl md:mb-12">
          <h2
            className="text-4xl font-light leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl"
            style={{ color: INK }}
          >
            Find work that matches your skills.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#5b6578] md:text-base">
            Browse household employment, hospitality, driving, caregiving,
            security, cleaning, warehouse, construction and skilled trades.
          </p>
        </div>

        {/* Flat-lay collage */}
        <div className="relative">
          <div
            className={[
              "grid grid-cols-6 gap-2.5 md:grid-cols-12 md:gap-3.5",
              "[grid-auto-flow:dense] auto-rows-[var(--u)]",
              "[--u:calc((100vw_-_2.5rem_-_50px)/6)]",
              "md:[--u:calc((min(100vw,1200px)_-_4rem_-_154px)/12)]",
            ].join(" ")}
          >
            {collage.map((c, i) => (
              <Tile
                key={roles[i][0]}
                role={roles[i]}
                material={c.material}
                shape={c.shape}
                size={c.size}
                inset={c.inset}
                className={c.span}
              />
            ))}
          </div>

          <Sprig className="-right-2 -top-8 w-28 md:-right-4 md:-top-12 md:w-48" />
          <Sprig className="-right-3 top-[36%] w-16 -scale-x-100 rotate-[15deg] md:top-[40%] md:w-28" />
        </div>

        {/* Extra categories */}
        {expanded && (
          <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-3.5 md:grid-cols-4 md:gap-3.5">
            {moreRoles.map((role, i) => (
              <Tile
                key={`${role[0]}-${i}`}
                role={role}
                material={extraMaterials[i % extraMaterials.length]}
                shape={extraShapes[i % extraShapes.length]}
                size="md"
                inset="inset-2 md:inset-3.5"
                className="aspect-[4/5]"
              />
            ))}
          </div>
        )}

        {/* Palette pills */}
        <div className="mt-10 grid grid-cols-4 gap-2.5 md:mt-16 md:gap-5">
          <Link
            href="/jobs"
            className="group flex aspect-[1/1.7] flex-col items-center justify-between rounded-full px-1 pb-4 pt-6 text-center text-[#f3ede3] transition-transform duration-300 hover:-translate-y-1 md:pb-8 md:pt-12"
            style={{ backgroundColor: INK }}
          >
            <span className="text-[11px] font-semibold leading-tight md:text-lg">
              Search all jobs
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1 md:h-10 md:w-10">
              <ArrowRight size={15} />
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="flex aspect-[1/1.7] flex-col items-center justify-between rounded-full px-1 pb-4 pt-6 text-center transition-transform duration-300 hover:-translate-y-1 md:pb-8 md:pt-12"
            style={{ backgroundColor: CREAM, color: INK }}
          >
            <span className="text-[11px] font-semibold leading-tight md:text-lg">
              {expanded ? "Show fewer" : "Show more"}
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f2d45]/10 md:h-10 md:w-10">
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </span>
          </button>

          <div
            className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-1 text-center"
            style={{ backgroundColor: TAN, color: INK }}
          >
            <span className="text-3xl font-light leading-none md:text-6xl">
              {TOTAL}
            </span>
            <span className="mt-1.5 text-[11px] font-semibold leading-tight md:mt-3 md:text-lg">
              categories
            </span>
          </div>

          <div
            className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-2 text-center text-[#f3ede3]"
            style={{ backgroundColor: NAVY }}
          >
            <span className="text-[11px] font-semibold leading-tight md:text-lg">
              MK Connection Limited
            </span>
          </div>
        </div>

        {/* Caption, set like the moodboard's signature */}
        <p
          className="mt-6 text-center text-sm md:mt-8 md:text-lg"
          style={{ color: INK }}
        >
          mk
          <span className="font-serif font-bold italic">connection</span>
          limited
        </p>
      </div>

      {/* bottom navy bar */}
      <div className="h-14 md:h-16" style={{ backgroundColor: BAR }} />
    </section>
  );
}