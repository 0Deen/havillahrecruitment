"use client";

import Link from "next/link";
import { Mail, Phone, ShieldAlert, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site-config";

export function TrustSafety() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-line bg-sand/40 py-16 md:py-24">
      <div className="container-content grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-2xl text-ink md:text-3xl">{t("trust.title")}</h2>
          <p className="mt-3 max-w-md text-sm text-slate">{t("trust.sub")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/safety#verify" className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-ink/85">
              <ShieldCheck size={16} className="text-amber" /> {t("trust.verify")}
            </Link>
            <Link href="/safety#report" className="flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white">
              <ShieldAlert size={16} /> {t("trust.report")}
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-7">
          <p className="text-xs font-medium uppercase tracking-wide text-slate">{t("trust.channelsTitle")}</p>
          <div className="mt-4 space-y-3 text-sm text-ink">
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-amber" /> {siteConfig.whatsapp}
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-amber" /> {siteConfig.email}
            </div>
          </div>
          <p className="mt-5 text-xs text-slate">
            MK Connection Limited never asks candidates to pay unofficial individuals for a job offer, a visa, or a travel document. If in doubt, contact us directly through the channels above.
          </p>
        </div>
      </div>
    </section>
  );
}
