import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { SafeImage } from "@/components/SafeImage";
import { flyers } from "@/lib/job-images";

interface JobCard {
  title: string;
  category: string;
  country: string;
  image: string;
  fallback?: string;
  description: string;
  featured?: boolean;
  dark?: boolean;
}

/*
|--------------------------------------------------------------------------
| JOB DATA
|--------------------------------------------------------------------------
| Existing opportunities are preserved.
| New Oman, Qatar and Turkey opportunities have been added.
|
| Salary / commission amounts are intentionally NOT displayed.
| Applicants are directed to contact MK Connection Limited for current details.
|--------------------------------------------------------------------------
*/

const jobs: JobCard[] = [
  /*
  |--------------------------------------------------------------------------
  | EXISTING JOBS
  |--------------------------------------------------------------------------
  */

  {
    title: "Caregivers",
    category: "Caregiving",
    country: "Qatar",
    image: "/images/jobs/caregiver.png",
    description:
      "Caregiving opportunities for applicants ready to work abroad.",
    featured: true,
    dark: true,
  },

  {
    title: "Men Caregivers",
    category: "Caregiving",
    country: "Gulf",
    image: "/images/jobs/mencaregivers.png",
    description:
      "Male caregiver opportunities for suitable and qualified applicants.",
  },

  {
    title: "Cooks & Kitchen Assistants",
    category: "Hospitality",
    country: "Gulf",
    image: "/images/jobs/cheef.png",
    description:
      "Kitchen and hospitality roles for applicants with relevant experience.",
    dark: true,
  },

  {
    title: "Cooks",
    category: "Hospitality",
    country: "Gulf",
    image: "/images/jobs/cook.png",
    description:
      "Cooking opportunities across overseas hospitality environments.",
  },

  {
    title: "House Maids",
    category: "Household",
    country: "Gulf",
    image: "/images/jobs/cleaner.png",
    description:
      "Domestic work opportunities for suitable female applicants.",
  },

  {
    title: "House Maids",
    category: "Household",
    country: "Gulf",
    image: "/images/jobs/cleanerdesign2.png",
    description:
      "Household employment opportunities with overseas employers.",
    dark: true,
  },

  {
    title: "Cleaners",
    category: "Cleaning",
    country: "Gulf",
    image: "/images/jobs/mencleaners.png",
    description:
      "Cleaning roles for applicants ready to work in overseas facilities.",
  },

  {
    title: "Drivers",
    category: "Driving",
    country: "Gulf",
    image: "/images/jobs/drivers.png",
    description:
      "Driving opportunities for applicants meeting employer requirements.",
    dark: true,
  },

  {
    title: "Female Drivers",
    category: "Driving",
    country: "Gulf",
    image: "/images/jobs/driverslady.png",
    description:
      "Driving opportunities for qualified female applicants.",
  },

  {
    title: "Cleaner + Driver",
    category: "Cleaning & Driving",
    country: "Gulf",
    image: "/images/jobs/combined_cleanerdriverfemale.png",
    description:
      "Combined cleaning and driving opportunities for suitable applicants.",
  },

  {
    title: "Security Guards",
    category: "Security",
    country: "Gulf",
    image: "/images/jobs/mensecurityofficers.png",
    description:
      "Security employment opportunities for suitable applicants.",
    dark: true,
  },

  {
    title: "General Workers",
    category: "General Roles",
    country: "Gulf",
    image: "/images/jobs/men.png",
    description:
      "General overseas employment opportunities across different sectors.",
  },

  {
    title: "Warehouse Helpers",
    category: "Warehouse",
    country: "Gulf",
    image: "/images/jobs/warehosue.png",
    description:
      "Warehouse and support roles for applicants ready to work abroad.",
  },

  /*
  |--------------------------------------------------------------------------
  | OMAN
  |--------------------------------------------------------------------------
  */

  {
    title: "Hotel Cleaners",
    category: "Hospitality",
    country: "Oman",
    image: "/images/jobs/cleanerdesign2.png",
    description:
      "Hotel cleaning opportunities in Oman. Applicants should be ready to travel, medically fit and willing to work overtime where required.",
    featured: true,
  },

  {
    title: "Security Guards",
    category: "Security",
    country: "Oman",
    image: "/images/jobs/mensecurityofficers.png",
    description:
      "Security opportunities in Oman for applicants who meet employer requirements and are ready to travel.",
    dark: true,
  },

  {
    title: "Drivers",
    category: "Driving",
    country: "Oman",
    image: "/images/jobs/drivers.png",
    description:
      "Driver opportunities in Oman for suitable applicants with the required experience and documentation.",
  },

  {
    title: "Housemaids",
    category: "Household",
    country: "Oman",
    image: "/images/jobs/cleaner.png",
    description:
      "Housemaid opportunities in Oman. Experience may influence the final employment package.",
    dark: true,
  },

  /*
  |--------------------------------------------------------------------------
  | QATAR
  |--------------------------------------------------------------------------
  */

  {
    title: "Hotel Cleaners",
    category: "Hospitality",
    country: "Qatar",
    image: "/images/jobs/cleanerdesign2.png",
    description:
      "Hotel cleaning opportunities in Qatar for applicants who are ready to travel and meet employer requirements.",
    featured: true,
  },

  {
    title: "Caregivers",
    category: "Caregiving",
    country: "Qatar",
    image: "/images/jobs/caregiver.png",
    description:
      "Caregiving opportunities in Qatar for suitable applicants with the required attitude, communication skills and readiness to work.",
    dark: true,
  },

  {
    title: "Housemaids",
    category: "Household",
    country: "Qatar",
    image: "/images/jobs/cleaner.png",
    description:
      "Housemaid opportunities in Qatar for suitable applicants ready for overseas employment.",
  },

  {
    title: "Cleaners",
    category: "Cleaning",
    country: "Qatar",
    image: "/images/jobs/mencleaners.png",
    description:
      "Cleaning opportunities in Qatar across suitable workplaces and facilities.",
    dark: true,
  },

  /*
  |--------------------------------------------------------------------------
  | TURKEY
  |--------------------------------------------------------------------------
  */

  {
    title: "Hotel Cleaners",
    category: "Hospitality",
    country: "Turkey",
    image: "/images/jobs/cleanerdesign2.png",
    description:
      "Hotel cleaning opportunities in Turkey for applicants who are medically fit, ready to travel and prepared for overseas employment.",
    featured: true,
  },

  {
    title: "Security Guards",
    category: "Security",
    country: "Turkey",
    image: "/images/jobs/mensecurityofficers.png",
    description:
      "Security opportunities in Turkey for suitable applicants who meet the required employment conditions.",
    dark: true,
  },

  {
    title: "Housemaids",
    category: "Household",
    country: "Turkey",
    image: "/images/jobs/cleaner.png",
    description:
      "Household employment opportunities in Turkey for suitable female applicants.",
  },

  {
    title: "House Girls",
    category: "Household",
    country: "Turkey",
    image: "/images/jobs/cleanerdesign2.png",
    description:
      "Domestic employment opportunities in Turkey. Contact MK Connection Limited for current employer requirements and employment details.",
    dark: true,
  },

  {
    title: "House Girls",
    category: "Household",
    country: "Qatar",
    image: "/images/jobs/cleaner.png",
    description:
      "Domestic employment opportunities in Qatar for suitable applicants ready to work abroad.",
  },

  /*
  |--------------------------------------------------------------------------
  | NEW — SAUDI ARABIA & QATAR FLYER OPENINGS (added)
  |--------------------------------------------------------------------------
  */

  {
    title: "Airport Loaders",
    category: "Logistics",
    country: "Saudi Arabia",
    image: flyers.airportLoadersSaudi.src,
    fallback: flyers.airportLoadersSaudi.fallback,
    description:
      "Airport loader opportunities in Saudi Arabia for fit applicants who are ready to travel.",
    featured: true,
  },

  {
    title: "Female Drivers",
    category: "Driving",
    country: "Saudi Arabia",
    image: flyers.femaleDriversSaudi.src,
    fallback: flyers.femaleDriversSaudi.fallback,
    description:
      "Driving opportunities in Saudi Arabia for qualified female applicants.",
    dark: true,
  },

  {
    title: "House Managers",
    category: "Household",
    country: "Qatar",
    image: flyers.houseManagerQatar.src,
    fallback: flyers.houseManagerQatar.fallback,
    description:
      "House manager opportunities in Qatar for experienced and trustworthy applicants.",
  },

  {
    title: "House-to-House Cleaners",
    category: "Cleaning",
    country: "Qatar",
    image: flyers.houseToHouseQatar.src,
    fallback: flyers.houseToHouseQatar.fallback,
    description:
      "House-to-house cleaning opportunities in Qatar for applicants ready for overseas work.",
    dark: true,
  },

  {
    title: "Nail Technicians & Hairdressers",
    category: "Beauty & Salon",
    country: "Qatar",
    image: flyers.nailTechQatar.src,
    fallback: flyers.nailTechQatar.fallback,
    description:
      "Salon opportunities in Qatar for nail technicians and hairdressers with relevant experience.",
  },
];

/* ========================================================================== */
/* MOODBOARD DESIGN SYSTEM                                                    */
/* Navy bars · white ground · oak / fluted / woven / navy fabric materials    */
/* ========================================================================== */

const BAR = "#002060"; // top + bottom navy bars
const INK = "#1f2d45"; // deep navy
const NAVY = "#2f3e57"; // second navy
const CREAM = "#e0d8cd"; // cream
const TAN = "#cfac86"; // tan

const SOFT_SHADOW =
  "0 14px 26px -16px rgba(16,35,63,.45), 0 2px 6px rgba(16,35,63,.08)";

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

/* Material cycle for job tiles (all rectangular pieces from the moodboard) */
const tileMaterials: Material[] = [
  "oak",
  "navy",
  "woven",
  "fluted",
  "blue",
  "sand",
  "cream",
];

/* -------------------------------------------------------------------------- */
/* Frame: a swatch with a visible mat around its content                      */
/* -------------------------------------------------------------------------- */

function Frame({
  material,
  className = "",
  rounded = "rounded-[5px]",
  pad = "p-2.5 sm:p-3.5",
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

/* -------------------------------------------------------------------------- */
/* Olive sprig from the moodboard                                             */
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
      className={`pointer-events-none absolute z-30 ${className}`}
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
/* Decorative objects (disc, navy bowl, woven ball, white bowl) that sit      */
/* between the job tiles, exactly like the objects in the flat-lay            */
/* -------------------------------------------------------------------------- */

type Decor = "disc" | "navyBowl" | "ball" | "whiteBowl";

const decorCycle: Decor[] = ["disc", "navyBowl", "ball", "whiteBowl"];

const decorStyle: Record<Decor, CSSProperties> = {
  disc: { ...materials.cream, boxShadow: SOFT_SHADOW },
  navyBowl: {
    background: "radial-gradient(circle at 35% 30%, #27406b, #0c1d3d 72%)",
    boxShadow:
      "inset 0 0 0 5px #0a1a38, inset 0 0 0 6.5px rgba(255,255,255,.12), 0 14px 26px -14px rgba(0,16,60,.6)",
  },
  ball: { ...materials.ball, boxShadow: SOFT_SHADOW },
  whiteBowl: {
    ...materials.bowl,
    boxShadow:
      "inset 0 0 0 7px #ffffff, inset 0 0 0 8.5px #e3dcd1, 0 14px 26px -14px rgba(16,35,63,.4)",
  },
};

function DecorTile({ kind }: { kind: Decor }) {
  return (
    <div
      aria-hidden="true"
      className="col-span-1 row-span-1 flex items-center justify-center"
    >
      <div
        style={decorStyle[kind]}
        className="aspect-square h-[86%] rounded-full"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout spans — written as full literal classes so Tailwind can see them.   */
/* (Mobile = 2 columns, sm and up = 4 columns.)                               */
/* -------------------------------------------------------------------------- */

const mobileSpan: Record<string, string> = {
  "2x3": "col-span-2 row-span-3",
  "2x2": "col-span-2 row-span-2",
  "1x3": "col-span-1 row-span-3",
  "1x2": "col-span-1 row-span-2",
};

const desktopSpan: Record<string, string> = {
  "2x3": "sm:col-span-2 sm:row-span-3",
  "2x2": "sm:col-span-2 sm:row-span-2",
  "1x3": "sm:col-span-1 sm:row-span-3",
  "1x2": "sm:col-span-1 sm:row-span-2",
};

/*
 * Deliberately varied spans create the editorial flat-lay composition
 * rather than a repetitive standard card grid.
 */
const desktopLayout = [
  "2x3", "1x2", "1x2", "2x2", "1x3", "1x2", "2x3", "1x2", "1x2",
  "2x2", "1x3", "1x2", "2x3", "2x2", "1x2", "1x3", "2x2", "1x2",
  "1x3", "2x2", "1x2", "1x3", "2x2", "1x2", "1x3", "2x2", "2x2",
];

const mobileLayout = ["2x3", "1x2", "1x2", "2x2", "1x3", "1x2", "1x2", "2x2"];

type GridItem =
  | { type: "job"; job: JobCard; index: number }
  | { type: "decor"; kind: Decor; key: string };

const gridItems: GridItem[] = jobs.flatMap((job, index) => {
  const items: GridItem[] = [{ type: "job", job, index }];
  if (index % 4 === 3) {
    items.push({
      type: "decor",
      kind: decorCycle[Math.floor(index / 4) % decorCycle.length],
      key: `decor-${index}`,
    });
  }
  return items;
});

const destinationCount = new Set(jobs.map((j) => j.country)).size;

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function JobCategories() {
  return (
    <section id="jobs" className="relative overflow-hidden bg-white">
      {/* ============================================================
          TOP NAVY BAR
      ============================================================ */}
      <div className="h-10 sm:h-12" style={{ backgroundColor: BAR }} />

      <div className="relative mx-auto max-w-[1250px] px-4 py-14 sm:px-6 sm:py-24">
        {/* ==========================================================
            INTRO
        ========================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div
            className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full px-5 py-2.5"
            style={{ backgroundColor: CREAM }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: INK }}
            />

            <span
              className="text-[9px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: INK }}
            >
              MK Connection Limited · Overseas Opportunities
            </span>

            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: INK }}
            />
          </div>

          <h2
            className="font-display text-5xl font-light leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
            style={{ color: INK }}
          >
            Find your
            <br />
            <span className="italic" style={{ color: NAVY }}>
              opportunity abroad.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#5b6578] sm:text-base">
            Explore current recruitment opportunities across Oman, Qatar,
            Turkey and other overseas destinations. Requirements and
            availability change, so contact our recruitment team for the
            latest details.
          </p>
        </div>

        {/* ==========================================================
            JOB BOARD
        ========================================================== */}

        <div className="relative">
          {/* ======================================================
              TOP FEATURED AREA (navy fabric frame)
          ====================================================== */}

          <Frame material="navy" pad="p-2.5 sm:p-4" className="relative">
            <div className="relative overflow-hidden rounded-[3px] bg-[#1f2d45]">
              {/* background image */}
              <Image
                src="/images/jobs/caregiver.png"
                alt="MK Connection Limited overseas recruitment opportunities"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center opacity-60"
              />

              {/* navy image overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a3a]/90 via-[#1f2d45]/55 to-[#2f3e57]/40" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(240,232,220,0.22),transparent_35%)]" />

              {/* content layer: stacked on mobile, composed on md+ */}
              <div className="relative z-10 flex min-h-[640px] flex-col justify-between gap-8 p-6 md:block md:min-h-[700px] md:p-0">
                {/* ====================================================
                    HERO TEXT
                ==================================================== */}

                <div className="max-w-xl md:absolute md:left-12 md:top-12 lg:left-16 lg:top-16">
                  <div className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/65">
                    Overseas recruitment
                  </div>

                  <h3 className="mt-5 font-display text-5xl font-light leading-[0.88] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
                    Jobs
                    <br />
                    <span className="italic text-[#e0d8cd]">
                      beyond borders.
                    </span>
                  </h3>

                  <p className="mt-6 max-w-md text-sm leading-6 text-white/70 sm:text-base">
                    Opportunities for Kenyan workers across the Gulf and
                    selected international destinations.
                  </p>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ backgroundColor: CREAM, color: INK }}
                  >
                    Enquire about jobs
                    <span className="text-base">↗</span>
                  </a>
                </div>

                {/* ====================================================
                    DECORATIVE CENTER CARD (oak frame)
                ==================================================== */}

                <div className="relative w-[60%] max-w-[250px] shrink-0 rotate-[3deg] self-end md:absolute md:right-[8%] md:top-[38%] md:w-[260px] md:max-w-none lg:w-[290px]">
                  <Frame material="oak" pad="p-2 sm:p-2.5">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                      <Image
                        src="/images/jobs/mencaregivers.png"
                        alt="Overseas job opportunity"
                        fill
                        sizes="290px"
                        className="object-cover object-top"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3a]/90 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                        <div className="text-[8px] uppercase tracking-[0.22em] text-white/65">
                          Opportunity
                        </div>

                        <div className="mt-2 font-display text-2xl leading-none text-white sm:text-3xl">
                          Caregiving
                        </div>

                        <div className="mt-2 text-[10px] text-white/70">
                          Contact us for current openings.
                        </div>
                      </div>
                    </div>
                  </Frame>

                  <Sprig className="-right-5 -top-9 w-20 sm:-right-8 sm:-top-14 sm:w-32" />
                </div>

                {/* ====================================================
                    FLOATING COUNTRY CARD (palette pills inside)
                ==================================================== */}

                <div className="w-full max-w-[350px] md:absolute md:bottom-12 md:left-12 md:w-[360px]">
                  <div className="rounded-[5px] border border-white/40 bg-[#faf7f1]/95 p-5 shadow-[12px_20px_55px_rgba(8,18,45,0.35)] backdrop-blur-xl sm:p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[8px] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: NAVY }}
                      >
                        Featured destinations
                      </span>

                      <span
                        className="rounded-full px-3 py-1 text-[8px] font-semibold"
                        style={{ backgroundColor: CREAM, color: INK }}
                      >
                        2026
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[
                        { country: "Oman", bg: INK, fg: "#f3ede3", sub: "rgba(243,237,227,.65)" },
                        { country: "Qatar", bg: CREAM, fg: INK, sub: "rgba(31,45,69,.6)" },
                        { country: "Turkey", bg: TAN, fg: INK, sub: "rgba(31,45,69,.65)" },
                      ].map(({ country, bg, fg, sub }) => (
                        <div
                          key={country}
                          className="flex aspect-[1/1.45] flex-col items-center justify-center rounded-full px-1 text-center"
                          style={{ backgroundColor: bg, color: fg }}
                        >
                          <div className="font-display text-base sm:text-lg">
                            {country}
                          </div>

                          <div
                            className="mt-1 text-[6.5px] uppercase tracking-[0.1em] sm:text-[7px]"
                            style={{ color: sub }}
                          >
                            Opportunities
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Frame>

          {/* ======================================================
              JOB GRID / FLAT-LAY SECTION
          ====================================================== */}

          <div className="relative mt-3 sm:mt-5">
            {/* ==================================================
                SECTION HEADER
            ================================================== */}

            <div className="relative mb-6 mt-10 flex flex-col justify-between gap-4 px-1 sm:mt-14 sm:flex-row sm:items-end sm:px-2">
              <div>
                <div
                  className="text-[8px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: NAVY }}
                >
                  Explore opportunities
                </div>

                <h3
                  className="mt-2 font-display text-3xl font-light tracking-[-0.04em] sm:text-4xl"
                  style={{ color: INK }}
                >
                  Current openings
                </h3>
              </div>

              <div className="max-w-xs text-xs leading-5 text-[#5b6578] sm:text-right">
                Salaries, commission arrangements, employer requirements and
                availability are confirmed directly with our recruitment
                team.
              </div>
            </div>

            {/* ==================================================
                FLAT-LAY GRID
            ================================================== */}

            <div className="relative">
              <div className="relative grid auto-rows-[150px] grid-cols-2 gap-2.5 [grid-auto-flow:dense] sm:auto-rows-[170px] sm:grid-cols-4 sm:gap-4">
                {gridItems.map((item) => {
                  if (item.type === "decor") {
                    return <DecorTile key={item.key} kind={item.kind} />;
                  }

                  const { job, index } = item;

                  const desktopClass =
                    desktopSpan[desktopLayout[index % desktopLayout.length]];

                  const mobileClass =
                    mobileSpan[mobileLayout[index % mobileLayout.length]];

                  const material = tileMaterials[index % tileMaterials.length];

                  return (
                    <a
                      key={`${job.title}-${job.country}-${index}`}
                      href="#contact"
                      style={{ ...materials[material], boxShadow: SOFT_SHADOW }}
                      className={`group relative block overflow-hidden rounded-[5px] p-2 transition-all duration-500 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002060] motion-reduce:transition-none sm:p-3 ${mobileClass} ${desktopClass}`}
                    >
                      {/* inset photo */}
                      <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-[#1f2d45]">
                        {/* ==============================================
                            IMAGE
                        ============================================== */}

                        <div className="absolute inset-0">
                          <SafeImage
                            src={job.image}
                            fallback={job.fallback}
                            alt={`${job.title} - ${job.country}`}
                            fill
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                            className="object-cover object-top transition duration-700 group-hover:scale-110 motion-reduce:transition-none"
                          />
                        </div>

                        {/* ==============================================
                            IMAGE OVERLAY
                        ============================================== */}

                        <div
                          className={`absolute inset-0 ${
                            job.dark
                              ? "bg-gradient-to-t from-[#0b1a3a]/95 via-[#0b1a3a]/25 to-transparent"
                              : "bg-gradient-to-t from-[#0b1a3a]/88 via-[#0b1a3a]/12 to-transparent"
                          }`}
                        />

                        {/* top glass badge */}
                        <div className="absolute left-2.5 right-2.5 top-2.5 flex items-start justify-between sm:left-4 sm:right-4 sm:top-4">
                          <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-white shadow-lg backdrop-blur-xl sm:px-3 sm:tracking-[0.17em]">
                            {job.country}
                          </span>

                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition group-hover:rotate-45 sm:h-8 sm:w-8">
                            ↗
                          </span>
                        </div>

                        {/* ==============================================
                            CARD CONTENT
                        ============================================== */}

                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                          <div className="mb-2 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#e0d8cd]/85 sm:tracking-[0.23em]">
                            {job.category}
                          </div>

                          <h4
                            className={`font-display leading-[0.95] tracking-[-0.03em] text-white ${
                              job.featured
                                ? "text-2xl sm:text-4xl"
                                : "text-xl sm:text-3xl"
                            }`}
                          >
                            {job.title}
                          </h4>

                          <p className="mt-2 line-clamp-5 max-w-sm text-[9px] leading-4 text-white/70 sm:mt-3 sm:line-clamp-none sm:text-[10px] sm:leading-5">
                            {job.description}
                          </p>

                          <div className="mt-3 flex items-center justify-between sm:mt-4">
                            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/75">
                              Enquire
                            </span>

                            <span className="text-[11px] text-white/85">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <Sprig className="-right-2 -top-12 w-24 sm:-right-3 sm:-top-16 sm:w-40" />
            </div>

            {/* ==================================================
                CONTACT / INFORMATION CARD (navy fabric frame)
            ================================================== */}

            <Frame material="navy" pad="p-2.5 sm:p-4" className="mt-5 sm:mt-6">
              <div className="relative overflow-hidden rounded-[3px] bg-[#f9f6f0] p-6 sm:p-9">
                {/* decorative disc */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-16 aspect-square w-44 rounded-full sm:-right-16 sm:-top-20 sm:w-60"
                  style={{ ...materials.cream, boxShadow: SOFT_SHADOW }}
                />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div
                      className="text-[8px] font-semibold uppercase tracking-[0.28em]"
                      style={{ color: NAVY }}
                    >
                      Important
                    </div>

                    <h3
                      className="mt-3 font-display text-3xl font-light leading-none tracking-[-0.04em] sm:text-4xl"
                      style={{ color: INK }}
                    >
                      Interested in one of
                      <br className="hidden sm:block" />
                      these opportunities?
                    </h3>

                    <p className="mt-4 max-w-2xl text-xs leading-6 text-[#5b6578] sm:text-sm">
                      Recruitment availability changes regularly. Contact
                      MK Connection Limited to confirm the latest vacancies, employer
                      requirements, salary information, commission arrangements,
                      travel requirements and application process.
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full px-7 text-xs font-semibold uppercase tracking-[0.15em] text-[#f3ede3] shadow-[0_15px_30px_rgba(16,35,63,0.25)] transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002060]"
                    style={{ backgroundColor: INK }}
                  >
                    Contact MK Connection Limited
                    <span className="text-base">↗</span>
                  </a>
                </div>
              </div>
            </Frame>

            {/* ==================================================
                PALETTE PILLS — the four ovals from the moodboard
            ================================================== */}

            <div className="mt-10 grid grid-cols-4 gap-2.5 sm:mt-14 sm:gap-6">
              <a
                href="#contact"
                className="group flex aspect-[1/1.7] flex-col items-center justify-between rounded-full px-1 pb-4 pt-6 text-center text-[#f3ede3] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002060] sm:pb-8 sm:pt-12"
                style={{ backgroundColor: INK }}
              >
                <span className="text-[11px] font-semibold leading-tight sm:text-lg">
                  Enquire now
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45 sm:h-10 sm:w-10">
                  ↗
                </span>
              </a>

              <div
                className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-1 text-center"
                style={{ backgroundColor: CREAM, color: INK }}
              >
                <span className="font-display text-3xl font-light leading-none sm:text-6xl">
                  {jobs.length}
                </span>
                <span className="mt-1.5 text-[11px] font-semibold leading-tight sm:mt-3 sm:text-lg">
                  openings
                </span>
              </div>

              <div
                className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-1 text-center"
                style={{ backgroundColor: TAN, color: INK }}
              >
                <span className="font-display text-3xl font-light leading-none sm:text-6xl">
                  {destinationCount}
                </span>
                <span className="mt-1.5 text-[11px] font-semibold leading-tight sm:mt-3 sm:text-lg">
                  destinations
                </span>
              </div>

              <div
                className="flex aspect-[1/1.7] flex-col items-center justify-center rounded-full px-2 text-center text-[#f3ede3]"
                style={{ backgroundColor: NAVY }}
              >
                <span className="text-[11px] font-semibold leading-tight sm:text-lg">
                  MK Connection Limited
                </span>
              </div>
            </div>

            {/* ==================================================
                BOTTOM EDITORIAL STRIP
            ================================================== */}

            <div className="relative mt-8 flex flex-col gap-5 rounded-[5px] bg-[#f4efe7] px-6 py-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div>
                <div
                  className="font-display text-2xl font-light tracking-[-0.03em]"
                  style={{ color: INK }}
                >
                  Ready for your next chapter?
                </div>

                <div className="mt-1 text-[10px] text-[#5b6578]">
                  Kenya → Gulf → International opportunities
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="hidden h-px w-16 sm:block"
                  style={{ backgroundColor: `${INK}33` }}
                />

                <span
                  className="text-[8px] uppercase tracking-[0.25em]"
                  style={{ color: NAVY }}
                >
                  MK Connection Limited
                </span>

                <span
                  className="h-8 w-8 rounded-full text-center text-sm leading-8 text-[#f3ede3]"
                  style={{ backgroundColor: INK }}
                >
                  ↗
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            OUTSIDE FOOTER LABEL + SIGNATURE CAPTION
        ========================================================== */}

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-12" style={{ backgroundColor: `${INK}33` }} />

          <span
            className="text-[8px] uppercase tracking-[0.3em]"
            style={{ color: NAVY }}
          >
            MK Connection Limited · Kenya
          </span>

          <span className="h-px w-12" style={{ backgroundColor: `${INK}33` }} />
        </div>

        <p
          className="mt-5 text-center text-sm sm:text-lg"
          style={{ color: INK }}
        >
          mk
          <span className="font-serif font-bold italic">connection</span>
          limited
        </p>
      </div>

      {/* ============================================================
          BOTTOM NAVY BAR
      ============================================================ */}
      <div className="h-14 sm:h-16" style={{ backgroundColor: BAR }} />
    </section>
  );
}