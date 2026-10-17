import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLanding";
import { SEO_LANDINGS } from "@/data/seo";

const page = SEO_LANDINGS["gulf-recruitment-agency"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: "/gulf-recruitment-agency" },
  openGraph: {
    title: page.metaTitle,
    description: page.description,
    url: `https://ajiramajuu.com/gulf-recruitment-agency`,
    siteName: "Ajira Majuu",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <SeoLandingPage slug="gulf-recruitment-agency" />;
}
