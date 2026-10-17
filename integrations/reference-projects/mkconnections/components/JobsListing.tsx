"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import { jobs, categories } from "@/data/jobs";
import { siteConfig } from "@/lib/site-config";
import { JobCard } from "@/components/JobCard";
import { JobAlertForm } from "@/components/JobAlertForm";

/* -------------------------------------------------------------------------- */
/* Palette sampled from the moodboard                                         */
/* -------------------------------------------------------------------------- */

const BAR = "#002060";
const INK = "#1f2d45";
const NAVY = "#2f3e57";
const CREAM = "#e0d8cd";
const TAN = "#cfac86";

const SOFT_SHADOW =
  "0 14px 26px -16px rgba(16,35,63,.45), 0 2px 6px rgba(16,35,63,.08)";

type Material = "oak" | "fluted" | "navy" | "cream" | "woven" | "blue";

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
  blue: {
    backgroundColor: "#8fa0bb",
    backgroundImage:
      "linear-gradient(rgba(40,60,100,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(40,60,100,.28) 1px, transparent 1px)",
    backgroundSize: "5px 5px",
  },
};

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

function Frame({
  material,
  className = "",
  rounded = "rounded-[5px]",
  pad = "p-2.5 md:p-3.5",
  children,
}: {
  material: Material;
  className?: string;
  rounded?: string;
  pad?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ ...materials[material], boxShadow: SOFT_SHADOW }}
      className={`${rounded} ${pad} ${className}`}
    >
      {children}
    </div>
  );
}

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

const plate =
  "w-full rounded-[3px] bg-white/95 text-sm outline-none transition-shadow placeholder:text-[#8a93a3] focus:ring-2 focus:ring-[#002060]/40";

const cardMaterials: Material[] = ["cream", "woven", "oak", "blue", "fluted", "navy"];

/* -------------------------------------------------------------------------- */
/* Listing                                                                    */
/* -------------------------------------------------------------------------- */

export function JobsListing() {
  const params = useSearchParams();
  const [keyword, setKeyword] = useState(params.get("q") ?? "");
  const [country, setCountry] = useState(params.get("country") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesKeyword = keyword
        ? (j.title + j.employer + j.category)
            .toLowerCase()
            .includes(keyword.toLowerCase())
        : true;
      const matchesCountry = country ? j.country === country : true;
      const matchesCategory = category ? j.category === category : true;
      return matchesKeyword && matchesCountry && matchesCategory;
    });
  }, [keyword, country, category]);

  const clearFilters = () => {
    setKeyword("");
    setCountry("");
    setCategory("");
  };

  return (
    <section className="bg-white">
      {/* top navy bar */}
      <div className="h-10 md:h-12" style={{ backgroundColor: BAR }} />

      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-16">
        {/* Header */}
        <h1
          className="max-w-2xl text-4xl font-light leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl"
          style={{ color: INK }}
        >
          Find where you belong.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#5b6578] md:text-base">
          {filtered.length} opportunit{filtered.length === 1 ? "y" : "ies"}{" "}
          matching your search.
        </p>

        {/* Filter board */}
        <div className="relative mt-8 md:mt-12">
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-12 md:gap-3.5">
            {/* Keyword — woven rug */}
            <Frame material="woven" className="col-span-2 md:col-span-6">
              <label className="relative block">
                <span className="sr-only">Search by title, employer or keyword</span>
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#5b6578]"
                />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Title, employer or keyword"
                  className={`${plate} py-3 pl-9 pr-3`}
                  style={{ color: INK }}
                />
              </label>
            </Frame>

            {/* Country — oak */}
            <Frame material="oak" className="col-span-1 md:col-span-3">
              <label className="relative block">
                <span className="sr-only">Destination</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`${plate} appearance-none py-3 pl-3 pr-8`}
                  style={{ color: INK }}
                >
                  <option value="">All destinations</option>
                  {siteConfig.destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5b6578]"
                />
              </label>
            </Frame>

            {/* Category — fluted wood */}
            <Frame material="fluted" className="col-span-1 md:col-span-3">
              <label className="relative block">
                <span className="sr-only">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`${plate} appearance-none py-3 pl-3 pr-8`}
                  style={{ color: INK }}
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5b6578]"
                />
              </label>
            </Frame>
          </div>

          <Sprig className="-right-2 -top-9 w-24 md:-right-3 md:-top-14 md:w-40" />
        </div>

        {/* Palette pills: clear + stats */}
        <div className="mt-6 grid grid-cols-4 gap-2.5 md:mt-8 md:gap-5">
          <button
            type="button"
            onClick={clearFilters}
            className="group flex aspect-[1/1.7] flex-col items-center justify-between rounded-full px-1 pb-4 pt-6 text-center text-[#f3ede3] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002060] md:pb-8 md:pt-12"
            style={{ backgroundColor: INK }}
          >
            <span className="text-[11px] font-semibold leading-tight md:text-lg">
              Clear filters
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 md:h-10 md:w-10">
              <X size={15} />
            </span>
          </button>

          <div
            className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-1 text-center"
            style={{ backgroundColor: CREAM, color: INK }}
          >
            <span className="text-3xl font-light leading-none md:text-6xl">
              {filtered.length}
            </span>
            <span className="mt-1.5 text-[11px] font-semibold leading-tight md:mt-3 md:text-lg">
              {filtered.length === 1 ? "job" : "jobs"}
            </span>
          </div>

          <div
            className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-1 text-center"
            style={{ backgroundColor: TAN, color: INK }}
          >
            <span className="text-3xl font-light leading-none md:text-6xl">
              {categories.length}
            </span>
            <span className="mt-1.5 text-[11px] font-semibold leading-tight md:mt-3 md:text-lg">
              categories
            </span>
          </div>

          <div
            className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-1 text-center text-[#f3ede3]"
            style={{ backgroundColor: NAVY }}
          >
            <span className="text-3xl font-light leading-none md:text-6xl">
              {siteConfig.destinations.length}
            </span>
            <span className="mt-1.5 text-[11px] font-semibold leading-tight md:mt-3 md:text-lg">
              destinations
            </span>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-4 md:mt-20 md:gap-6">
            {/* cream disc */}
            <div
              style={{ ...materials.cream, boxShadow: SOFT_SHADOW }}
              className="flex aspect-square w-[78vw] max-w-[340px] flex-col items-center justify-center rounded-full px-10 text-center"
            >
              <h2
                className="text-2xl font-light tracking-tight md:text-3xl"
                style={{ color: INK }}
              >
                No jobs found
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5b6578]">
                Try changing your destination, category or search terms.
              </p>
            </div>

            {/* navy fabric alert tile */}
            <Frame material="navy" className="w-full max-w-sm">
              <div className="rounded-[3px] bg-white p-4 md:p-5">
                <p className="mb-3 text-sm" style={{ color: INK }}>
                  Or get notified when a matching job opens up:
                </p>
                <JobAlertForm
                  country={country}
                  category={category}
                  keyword={keyword}
                />
              </div>
            </Frame>
          </div>
        ) : (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-3">
            {filtered.map((job, i) => (
              <Frame
                key={job.slug}
                material={cardMaterials[i % cardMaterials.length]}
                className="transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
              >
                <div className="h-full overflow-hidden rounded-[3px] bg-white">
                  <JobCard job={job} />
                </div>
              </Frame>
            ))}
          </div>
        )}

        {/* Signature caption */}
        <p
          className="mt-12 text-center text-sm md:mt-16 md:text-lg"
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