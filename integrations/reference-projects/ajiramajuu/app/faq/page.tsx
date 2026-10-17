import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqExplorer from "./FaqExplorer";
import JsonLd from "@/components/app/JsonLd";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { FAQS } from "@/data/content";

export const metadata: Metadata = {
  title: "FAQ — Overseas Jobs, Applications & Safety",
  description: "Answers to common questions about applying for overseas jobs with Ajira Majuu, a private overseas recruitment agency in Kenya: applications, documents, salaries, contracts, travel and safety.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqs = FAQS.filter((f) => f.status === "published");
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <PageHero eyebrow="Quick answers" title="Frequently asked questions" intro="Straight answers about applying, documents, salaries, contracts and staying safe." />
      <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6"><FaqExplorer faqs={faqs} categories={categories} /></section>
      {/* All Q&A above is visible on the page (in the accordion), so FAQ markup is accurate. */}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Footer />
    </main>
  );
}
