import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLanding";
import { SEO_LANDINGS } from "@/data/seo";

const page = SEO_LANDINGS["jobs-in-kenya"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: "/jobs-in-kenya" },
  openGraph: {
    title: page.metaTitle,
    description: page.description,
    url: `https://ajiramajuu.com/jobs-in-kenya`,
    siteName: "Ajira Majuu",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <SeoLandingPage slug="jobs-in-kenya" />;
}
