import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLanding";
import { SEO_LANDINGS } from "@/data/seo";

const page = SEO_LANDINGS["private-employment-agency-kenya"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: "/private-employment-agency-kenya" },
  openGraph: { title: page.metaTitle, description: page.description, url: `https://ajiramajuu.com/private-employment-agency-kenya`, siteName: "Ajira Majuu", type: "website" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <SeoLandingPage slug="private-employment-agency-kenya" />;
}
