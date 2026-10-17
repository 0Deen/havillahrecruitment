"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { categories } from "@/data/jobs";

export function Categories() {
  const { t } = useLanguage();

  return (
    <section className="container-content py-16 md:py-24">
      <h2 className="mb-8 font-display text-2xl text-ink md:text-3xl">{t("categories.title")}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c}
            href={`/jobs?category=${encodeURIComponent(c)}`}
            className="group rounded-xl border border-line bg-white px-5 py-6 transition hover:border-amber"
          >
            <p className="font-display text-base text-ink">{c}</p>
            <span className="mt-1 block text-xs text-slate group-hover:text-amber-deep">Explore roles</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
