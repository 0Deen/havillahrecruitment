"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "./dictionaries/en.json";
import sw from "./dictionaries/sw.json";
import ar from "./dictionaries/ar.json";

export type Locale = "en" | "sw" | "ar";

const dictionaries: Record<Locale, any> = { en, sw, ar };

export const localeMeta: Record<Locale, { label: string; native: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", native: "English", dir: "ltr" },
  sw: { label: "Kiswahili", native: "Kiswahili", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
};

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
  dict: any;
  showSwitcher: boolean;
  setShowSwitcher: (v: boolean) => void;
};

const LanguageContext = createContext<Ctx | null>(null);

function getFromPath(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("mk-locale") as Locale | null) : null;
    if (stored && dictionaries[stored]) {
      setLocaleState(stored);
    } else {
      setShowSwitcher(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = localeMeta[locale].dir;
  }, [locale, ready]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("mk-locale", l);
    setShowSwitcher(false);
  };

  const t = (path: string) => {
    const value = getFromPath(dictionaries[locale], path);
    if (value === undefined) return getFromPath(dictionaries.en, path) ?? path;
    return value;
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, dict: dictionaries[locale], showSwitcher, setShowSwitcher }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
