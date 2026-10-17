import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLanding";
import { SEO_LANDINGS } from "@/data/seo";

const page = SEO_LANDINGS["oman-jobs"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: "/oman-jobs" },
  openGraph: {
    title: page.metaTitle,
    description: page.description,
    url: `https://ajiramajuu.com/oman-jobs`,
    siteName: "Ajira Majuu",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <SeoLandingPage slug="oman-jobs" />;
}
