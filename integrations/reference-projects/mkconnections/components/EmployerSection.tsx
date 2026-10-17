"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function EmployerSection() {
  const { t } = useLanguage();
  const process = ["Tell us what you need", "We source talent", "We screen candidates", "You interview & select", "We handle placement"];

  return (
    <section className="bg-ink py-16 text-white md:py-24">
      <div className="container-content grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">{t("employer.title")}</h2>
          <p className="mt-4 max-w-md text-sm text-white/60">{t("employer.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/for-employers" className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep">
              {t("employer.cta")}
            </Link>
            <Link href="/contact" className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white">
              {t("employer.cta2")}
            </Link>
          </div>
        </div>
        <ol className="space-y-4">
          {process.map((step, i) => (
            <li key={step} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
              <span className="font-display text-xl text-amber">0{i + 1}</span>
              <span className="text-white/85">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
