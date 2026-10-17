"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Locale, localeMeta, useLanguage } from "@/lib/i18n/LanguageProvider";

const locales: Locale[] = ["en", "sw", "ar"];

export function LanguagePopup() {
  const { showSwitcher, setShowSwitcher, setLocale, t } = useLanguage();

  return (
    <AnimatePresence>
      {showSwitcher && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 backdrop-blur-sm md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSwitcher(false)}
        >
          <motion.div
            className="w-full max-w-md rounded-t-3xl bg-white p-8 shadow-lift md:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber/15 text-amber">
                <Globe size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl text-ink">{t("langSwitcher.title")}</h2>
                <p className="text-sm text-slate">{t("langSwitcher.sub")}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-left transition hover:border-amber hover:bg-amber/5"
                >
                  <span className="font-medium text-ink">{localeMeta[l].native}</span>
                  <span className="text-xs uppercase tracking-wide text-slate">{l}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
