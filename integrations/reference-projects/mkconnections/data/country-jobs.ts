/*
|--------------------------------------------------------------------------
| COUNTRY JOBS — single source of truth for the "Jobs by Country" feature
|--------------------------------------------------------------------------
| This file is additive: it does not touch data/jobs.ts. To add, edit or
| remove a country or a job, this is the ONLY file you need to open.
|
|  - To add a country: add one object to `countryMeta`.
|  - To add a job: add one object to `countryJobs`, with a `country` value
|    that matches a `countryMeta[i].name` exactly.
|  - To retire a job without deleting its history: set `isActive: false`
|    — it is filtered out everywhere automatically.
|--------------------------------------------------------------------------
*/

import { jobs as existingJobs } from "@/data/jobs";

export type CountryCode = "oman" | "qatar" | "kuwait" | "uae";

export type CountryMeta = {
  slug: CountryCode;
  name: string;
  flag: string; // emoji, used instead of a separate colour theme per country
  tagline: string;
  currency: string;
  heroImage: string;
  heroImageFallback: string;
};

export type CountryJobCategory =
  | "Domestic"
  | "Driving"
  | "Construction"
  | "Hospitality"
  | "Cleaning"
  | "Security";

export const JOB_CATEGORIES: CountryJobCategory[] = [
  "Domestic",
  "Driving",
  "Construction",
  "Hospitality",
  "Cleaning",
  "Security",
];

export type CountryJob = {
  id: string;
  country: string; // must match a countryMeta[i].name
  title: string;
  category: CountryJobCategory;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  period: "monthly";
  description: string;
  isActive: boolean;
};

/* ------------------------------------------------------------------ */
/* 1. Countries                                                        */
/* ------------------------------------------------------------------ */

export const countryMeta: CountryMeta[] = [
  {
    slug: "oman",
    name: "Oman",
    flag: "🇴🇲",
    tagline: "Steady households, honest pay, a calm place to start.",
    currency: "OMR",
    heroImage: "/images/countries/muscatoman.png",
    heroImageFallback: "/images/countries/musact.png",
  },
  {
    slug: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    tagline: "Fast-growing Doha, strong demand across every category.",
    currency: "QAR",
    heroImage: "/images/countries/qatar.png",
    heroImageFallback: "/images/countries/qataar.png",
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    flag: "🇰🇼",
    tagline: "Dependable roles in driving, warehousing and households.",
    currency: "KWD",
    heroImage: "/images/countries/kuwaitcity.jfif",
    heroImageFallback: "/images/countries/kuwait.jfif",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    tagline: "Dubai's skyline is built by hands we help place.",
    currency: "AED",
    heroImage: "/images/countries/dubaicity.png",
    heroImageFallback: "/images/countries/dubai.png",
  },
];

export const countryBySlug = (slug: string) => countryMeta.find((c) => c.slug === slug);
export const countryByName = (name: string) => countryMeta.find((c) => c.name === name);

/* ------------------------------------------------------------------ */
/* 2. Jobs — the exact roles and pay confirmed for each country         */
/* ------------------------------------------------------------------ */

const job = (
  country: string,
  title: string,
  category: CountryJobCategory,
  salaryMin: number,
  salaryMax: number,
  currency: string,
  description: string
): CountryJob => ({
  id: `${country}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  country,
  title,
  category,
  salaryMin,
  salaryMax,
  currency,
  period: "monthly",
  description,
  isActive: true,
});

export const countryJobs: CountryJob[] = [
  // ---------------- Oman (OMR) ----------------
  job("Oman", "Domestic Worker", "Domestic", 80, 100, "OMR", "Household duties for a private family in Oman, with accommodation and meals typically provided by the employer."),
  job("Oman", "Head Chef", "Hospitality", 250, 250, "OMR", "Leads the kitchen for a household or small establishment, planning menus and supervising kitchen staff."),
  job("Oman", "Gardener", "Domestic", 140, 140, "OMR", "Maintains gardens and outdoor spaces for a private residence, including planting, watering and upkeep."),

  // ---------------- Qatar (QAR) ----------------
  job("Qatar", "Housemaid", "Domestic", 1000, 1200, "QAR", "General household help for a family home in Doha — cleaning, laundry and day-to-day domestic duties."),
  job("Qatar", "House to House Cleaner", "Cleaning", 1200, 1300, "QAR", "Cleans multiple residential properties on a rotating schedule for a cleaning services employer."),
  job("Qatar", "Female Driver", "Driving", 1500, 1500, "QAR", "Private driving for a household, with a valid licence and a clean driving record required."),
  job("Qatar", "Salonist", "Hospitality", 1500, 1800, "QAR", "Hair, beauty or nail services in a salon setting — prior salon experience preferred."),
  job("Qatar", "Barista", "Hospitality", 1500, 2000, "QAR", "Prepares coffee and beverages in a cafe, with customer-facing service and basic cash handling."),
  job("Qatar", "Caregiver", "Domestic", 1500, 1500, "QAR", "Supports an elderly or dependent family member at home with daily care and companionship."),
  job("Qatar", "Bike Rider", "Driving", 2100, 2100, "QAR", "Delivery rider role covering a set zone, with a valid motorbike licence required."),
  job("Qatar", "Heavy Truck Driver", "Driving", 2200, 2200, "QAR", "Long-haul and site haulage driving, holding a valid heavy-vehicle licence with a clean record."),
  job("Qatar", "Company Cleaner", "Cleaning", 1300, 1300, "QAR", "Cleaning and upkeep of a company's offices or commercial premises during set shifts."),
  job("Qatar", "Security Guard", "Security", 1500, 1500, "QAR", "Site security for a commercial or residential property, working fixed shift patterns."),

  // ---------------- Kuwait (KWD) ----------------
  job("Kuwait", "Light Driver", "Driving", 190, 190, "KWD", "Light-vehicle driving for a company or household, with a valid Kuwait-recognised licence."),
  job("Kuwait", "Warehouse Worker", "Construction", 140, 140, "KWD", "Loading, stocking and general warehouse duties for a logistics or retail employer."),
  job("Kuwait", "Bike Rider", "Driving", 160, 160, "KWD", "Delivery rider role within Kuwait City, motorbike licence required."),

  // ---------------- United Arab Emirates (AED) ----------------
  job("United Arab Emirates", "Plumber", "Construction", 1400, 1400, "AED", "Installs and repairs plumbing systems on residential or commercial construction sites."),
  job("United Arab Emirates", "Mason (Block and Plaster)", "Construction", 1500, 1500, "AED", "Blockwork and plastering on active construction sites, following site supervisor instruction."),
  job("United Arab Emirates", "Steel Fixer", "Construction", 1400, 1400, "AED", "Cuts, bends and fixes reinforcement steel ahead of concrete pours on site."),
  job("United Arab Emirates", "Construction Helper", "Construction", 1100, 1100, "AED", "General labour support across a construction site, assisting skilled tradespeople."),
  job("United Arab Emirates", "Painter", "Construction", 1400, 1400, "AED", "Surface preparation and painting for residential and commercial construction projects."),
  job("United Arab Emirates", "Shuttering Carpenter", "Construction", 1600, 1600, "AED", "Builds and fixes formwork for concrete structures on site, reading basic site drawings."),
  job("United Arab Emirates", "Driver", "Driving", 2000, 2000, "AED", "Company or private driving in the UAE, holding a valid, UAE-recognised driving licence."),
];

/* ------------------------------------------------------------------ */
/* 3. Unified shape — merges countryJobs with the EXISTING jobs.ts      */
/*    data so nothing already on the site is duplicated or lost.        */
/* ------------------------------------------------------------------ */

export type UnifiedJob = {
  id: string;
  country: string;
  title: string;
  category: string;
  salaryDisplay: string;
  description: string;
  isLegacy: boolean;
  legacySlug?: string;
};

function formatSalary(min: number, max: number, currency: string) {
  const range = min === max ? `${min.toLocaleString()}` : `${min.toLocaleString()}–${max.toLocaleString()}`;
  return `${currency} ${range} / month`;
}

const FEATURED_COUNTRY_NAMES = countryMeta.map((c) => c.name);

/** All jobs (new + legacy) for one of the 4 featured countries. */
export function getJobsForCountry(countryName: string): UnifiedJob[] {
  const fromNew: UnifiedJob[] = countryJobs
    .filter((j) => j.country === countryName && j.isActive)
    .map((j) => ({
      id: j.id,
      country: j.country,
      title: j.title,
      category: j.category,
      salaryDisplay: formatSalary(j.salaryMin, j.salaryMax, j.currency),
      description: j.description,
      isLegacy: false,
    }));

  const fromLegacy: UnifiedJob[] = existingJobs
    .filter((j) => j.country === countryName)
    .map((j) => ({
      id: j.slug,
      country: j.country,
      title: j.title,
      category: j.category,
      salaryDisplay: j.salary,
      description: j.description,
      isLegacy: true,
      legacySlug: j.slug,
    }));

  return [...fromNew, ...fromLegacy];
}

/** Existing jobs whose country isn't one of the 4 featured destinations yet. */
export function getOtherOpportunities(): UnifiedJob[] {
  return existingJobs
    .filter((j) => !FEATURED_COUNTRY_NAMES.includes(j.country))
    .map((j) => ({
      id: j.slug,
      country: j.country,
      title: j.title,
      category: j.category,
      salaryDisplay: j.salary,
      description: j.description,
      isLegacy: true,
      legacySlug: j.slug,
    }));
}

/** Cheap counts for the country-selector cards on the home/jobs page. */
export function countryCardStats(countryName: string) {
  const list = getJobsForCountry(countryName);
  const cheapest = countryJobs
    .filter((j) => j.country === countryName && j.isActive)
    .sort((a, b) => a.salaryMin - b.salaryMin)[0];
  return {
    jobCount: list.length,
    teaser: cheapest ? `From ${cheapest.salaryMin.toLocaleString()} ${cheapest.currency}` : "Contact us",
  };
}

/** For the standalone apply form's dependent Country → Job dropdown. */
export function dependentDropdownData() {
  const groups = countryMeta.map((c) => ({
    country: c.name,
    jobs: getJobsForCountry(c.name).map((j) => j.title),
  }));
  const other = getOtherOpportunities();
  if (other.length) {
    groups.push({ country: "Other Opportunities", jobs: other.map((j) => j.title) });
  }
  return groups;
}
