import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { destinations, getActiveJobs } from "@/data/jobs";
import { RESOURCES } from "@/data/content";
import { SEO_LANDING_SLUGS } from "@/data/seo";
import { JOB_CATEGORY_PAGES } from "@/app/job-categories/data";

const SITE_UPDATED = new Date("2026-10-08T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "", "/jobs", "/destinations", "/apply", "/how-it-works", "/about", "/contact",
    "/faq", "/resources", "/recruitment-safety", "/for-employers", "/assistant",
    "/privacy-policy", "/terms",
  ];

  const core = statics.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: SITE_UPDATED,
    changeFrequency: p === "/privacy-policy" || p === "/terms" ? "yearly" as const : "weekly" as const,
    priority: p === "" ? 1 : p === "/jobs" || p === "/apply" ? 0.9 : 0.7,
  }));

  const seoPages = SEO_LANDING_SLUGS.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly" as const,
    priority: slug === "jobs-in-kenya" || slug === "gulf-jobs" || slug === "overseas-jobs" ? 0.9 : 0.8,
  }));

  const categoryPages = JOB_CATEGORY_PAGES.map((p) => ({
    url: `${SITE_URL}/job-categories/${p.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationPages = destinations.filter((d) => d.active).map((d) => ({
    url: `${SITE_URL}/destinations/${d.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const jobPages = getActiveJobs().map((j) => ({
    url: `${SITE_URL}/jobs/${j.slug}`,
    lastModified: j.updatedAt ? new Date(j.updatedAt) : SITE_UPDATED,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const resourcePages = RESOURCES.filter((r) => r.status === "published").map((r) => ({
    url: `${SITE_URL}/resources/${r.slug}`,
    lastModified: new Date(r.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...core, ...seoPages, ...categoryPages, ...destinationPages, ...jobPages, ...resourcePages];
}
