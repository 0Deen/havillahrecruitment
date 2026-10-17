"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const articles = [
  { title: "How to Prepare for an Overseas Job Interview", tag: "Interview Prep" },
  { title: "What to Check Before Accepting an Overseas Job", tag: "Worker Safety" },
  { title: "How to Identify Fake Recruitment Offers", tag: "Scam Prevention" },
  { title: "Preparing for Your First International Job", tag: "Travel Preparation" },
];

export function ResourcesPreview() {
  const { t } = useLanguage();

  return (
    <section className="container-content py-16 md:py-24">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-ink md:text-3xl">{t("resources.title")}</h2>
        <p className="mt-2 text-sm text-slate">{t("resources.sub")}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => (
          <Link key={a.title} href="/resources" className="rounded-2xl border border-line bg-white p-6 transition hover:border-amber">
            <span className="text-xs font-medium text-amber-deep">{a.tag}</span>
            <h3 className="mt-3 font-display text-base leading-snug text-ink">{a.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
