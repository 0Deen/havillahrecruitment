import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLanding";
import { SEO_LANDINGS } from "@/data/seo";

const page = SEO_LANDINGS["recruitment-agencies-kenya"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: "/recruitment-agencies-kenya" },
  openGraph: { title: page.metaTitle, description: page.description, url: `https://ajiramajuu.com/recruitment-agencies-kenya`, siteName: "Ajira Majuu", type: "website" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <SeoLandingPage slug="recruitment-agencies-kenya" />;
}
