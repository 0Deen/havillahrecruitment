import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { siteFaqs } from "@/lib/data";
import FaqClient from "./faq-client";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the most common questions about fees, the application process, medical screening, training, and countries we place candidates in.",
};

export default function FaqsPage() {
  return (
    <div className="container-page py-16">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
        <HelpCircle size={12} /> Help Center
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-navy-900">
        Frequently asked questions
      </h1>
      <p className="mt-2 max-w-xl text-navy-700/70">
        Search or filter by category. Can&rsquo;t find what you need? Our chat
        assistant (bottom right) can help, or reach the office directly.
      </p>

      <FaqClient faqs={siteFaqs} />
    </div>
  );
}
