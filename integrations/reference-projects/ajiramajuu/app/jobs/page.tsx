import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobsExplorer from "./JobsExplorer";
import { PageHero, Crumbs } from "@/components/app/Cards";
import JsonLd from "@/components/app/JsonLd";
import { destinations, getActiveJobs } from "@/data/jobs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Overseas Jobs for Kenyans — Current Opportunities",
  description:
    "Browse current overseas job opportunities from Ajira Majuu, a private overseas recruitment agency in Kenya. Qatar roles listed with verified salaries. Apply without an account.",
  alternates: { canonical: "/jobs" },
  openGraph: { title: "Overseas Jobs for Kenyans — Ajira Majuu", url: `${SITE_URL}/jobs`, images: ["/images/countries/qatar.png"] },
};

export default function JobsPage() {
  const jobs = getActiveJobs();
  const countries = Array.from(new Set(jobs.map((j) => j.country)));
  const categories = Array.from(new Set(jobs.map((j) => j.category)));
  const without = destinations.filter((d) => !jobs.some((j) => j.countrySlug === d.slug));

  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Jobs" }]} />
      <PageHero eyebrow="Current opportunities" title="Overseas jobs for Kenyans" intro="Roles currently listed by Ajira Majuu, with salaries exactly as confirmed. Tap a job, apply in minutes — no account needed." />
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <JobsExplorer jobs={jobs} countries={countries} categories={categories} />

        <div className="mt-10 rounded-[28px] bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-bold text-ink">Don’t see your destination?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Ajira Majuu also recruits for {without.map((d) => d.name).join(", ")}. Specific roles there aren’t listed yet — contact us for current details.
          </p>
          <Link href="/destinations" className="btn-secondary mt-4 inline-flex">Explore all destinations</Link>
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: jobs.map((j, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/jobs/${j.slug}`, name: `${j.title} — ${j.country}` })) }} />
      <Footer />
    </main>
  );
}
