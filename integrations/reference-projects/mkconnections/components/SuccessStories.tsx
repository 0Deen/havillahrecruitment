"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const stories = [
  { name: "Candidate name", role: "Placed as a Driver", country: "Saudi Arabia", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed as a Nurse", country: "United Arab Emirates", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed in Hospitality", country: "Qatar", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
];

export function SuccessStories() {
  const { t } = useLanguage();

  return (
    <section className="container-content py-16 md:py-24">
      <h2 className="mb-8 font-display text-2xl text-ink md:text-3xl">{t("stories.title")}</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((s, i) => (
          <div key={i} className="rounded-2xl border border-line bg-white p-6">
            <div className="mb-4 h-32 w-full rounded-xl bg-sand" aria-label="Candidate photo placeholder" />
            <p className="text-sm italic text-slate">&ldquo;{s.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-medium text-ink">{s.name}</p>
            <p className="text-xs text-slate">{s.role} — {s.country}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate">
        Real candidate stories will replace these placeholders once MK Connection Limited supplies permissioned testimonials.
      </p>
    </section>
  );
}
