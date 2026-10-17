"use client";

import { HeartHandshake, Globe2, ShieldCheck, Compass } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function WhyUs() {
  const { t } = useLanguage();
  const pillars = [
    { icon: ShieldCheck, title: t("why.p1t"), text: t("why.p1d") },
    { icon: HeartHandshake, title: t("why.p2t"), text: t("why.p2d") },
    { icon: Globe2, title: t("why.p3t"), text: t("why.p3d") },
    { icon: Compass, title: t("why.p4t"), text: t("why.p4d") },
  ];

  return (
    <section className="bg-ink py-16 text-white md:py-24">
      <div className="container-content">
        <h2 className="max-w-lg font-display text-3xl leading-tight md:text-4xl">{t("why.title")}</h2>
        <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex gap-5 border-t border-white/10 pt-6">
              <span className="font-display text-sm text-amber">0{i + 1}</span>
              <div>
                <p.icon size={20} className="mb-3 text-amber" />
                <h3 className="font-display text-lg">{p.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-white/60">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
