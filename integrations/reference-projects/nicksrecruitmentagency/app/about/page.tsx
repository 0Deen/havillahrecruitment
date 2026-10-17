import type { Metadata } from "next";
import Link from "next/link";
import { aboutPages } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "About Nicks Recruitment Agency | Licensed Recruitment Agency in Kenya",

  description:
    "Learn about Nicks Recruitment Agency, our mission, vision, values, recruitment process and commitment to connecting Kenyan professionals with verified employers across the world.",

  keywords: [
    "About Nicks Recruitment Agency",
    "Recruitment Agency Kenya",
    "Licensed Recruitment Agency",
    "Employment Agency Nairobi",
    "Jobs Abroad Kenya",
    "International Recruitment",
    "Recruitment Consultants",
    "Kenya Overseas Jobs",
    "Nicks Recruitment Agency"
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Nicks Recruitment Agency",
    description:
      "Learn about Kenya's trusted recruitment agency connecting skilled professionals with employers worldwide.",
    url: "https://nicksrecruitmentagency.com/about",
  },

  twitter: {
    title: "About Nicks Recruitment Agency",
    description:
      "Learn about Kenya's trusted recruitment agency connecting skilled professionals with employers worldwide.",
  },
};

export default function AboutIndex() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">
        About Us
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {aboutPages.map((p) => (
          <Link
            key={p.slug}
            href={`/about/${p.slug}`}
            className="rounded-2xl border border-navy-900/10 p-6 hover:border-gold-500"
          >
            <p className="font-semibold text-navy-900">{p.title}</p>
            <p className="mt-2 text-sm text-navy-700/70">{p.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
