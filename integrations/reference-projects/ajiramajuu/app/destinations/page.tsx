import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, DestinationCard, PageHero } from "@/components/app/Cards";
import { destinations } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Destinations — Gulf Jobs for Kenyans",
  description:
    "Explore overseas job destinations with Ajira Majuu, a private overseas recruitment agency in Kenya: Qatar, Saudi Arabia, UAE, Oman, Kuwait and Bahrain. See current opportunities and how to apply.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const list = destinations.filter((d) => d.active);
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />
      <PageHero eyebrow="Where we place talent" title="Choose your destination" intro="Opportunities across the Gulf, depending on current employer demand. Pick a country to see current jobs, the process and how to apply." />
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      </section>
      <Footer />
    </main>
  );
}
