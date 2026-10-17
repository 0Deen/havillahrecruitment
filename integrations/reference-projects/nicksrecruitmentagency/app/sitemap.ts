import { MetadataRoute } from "next";
import { resourcePages, aboutPages, employerPages, medicalPages } from "@/lib/page-content";

const BASE_URL = "https://nicksrecruitmentagency.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/apply-now",
    "/blog",
    "/book-medical",
    "/book-training",
    "/career-guidance",
    "/contact",
    "/countries",
    "/downloads",
    "/employers",
    "/events",
    "/faqs",
    "/gallery",
    "/job-categories",
    "/jobs",
    "/medical-laboratory",
    "/news",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/accessibility-statement",
    "/security",
    "/resources",
    "/services",
    "/success-stories",
    "/testimonials",
    "/track-application",
    "/training-school",
    "/videos",
    ...resourcePages.map((p) => `/resources/${p.slug}`),
    ...aboutPages.map((p) => `/about/${p.slug}`),
    ...employerPages.map((p) => `/employers/${p.slug}`),
    ...medicalPages.map((p) => `/medical-laboratory/${p.slug}`),
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
