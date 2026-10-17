"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function JourneySteps() {
  const { t } = useLanguage();
  const steps = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => ({
    title: t(`journey.${k}`),
    text: t(`journey.${k}d`),
  }));

  return (
    <section className="container-content py-16 md:py-24">
      <h2 className="mb-10 font-display text-2xl text-ink md:text-3xl">{t("journey.title")}</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10 md:overflow-visible">
        {steps.map((s, i) => (
          <div key={s.title} className="min-w-[220px] shrink-0 md:min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber text-sm font-medium text-ink">
                {i + 1}
              </span>
              {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-line md:block" />}
            </div>
            <h3 className="mt-4 font-display text-lg text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm text-slate">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
