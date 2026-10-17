"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { categories } from "@/data/jobs";
import { siteConfig } from "@/lib/site-config";

export function JobSearchBar() {
  const { t } = useLanguage();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (destination) params.set("country", destination);
    if (category) params.set("category", category);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSearch}
      className="rounded-2xl border border-line bg-white p-3 shadow-soft md:rounded-full md:p-2"
    >
      <div className="grid gap-2 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 md:border-r md:border-line">
          <Search size={16} className="text-slate" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={t("search.keyword")}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate"
          />
        </div>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="rounded-xl bg-transparent px-3 py-2.5 text-sm text-ink outline-none md:border-r md:border-line"
        >
          <option value="">{t("search.destination")}</option>
          {siteConfig.destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl bg-transparent px-3 py-2.5 text-sm text-ink outline-none"
        >
          <option value="">{t("search.category")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-ink/85"
        >
          {t("search.button")}
        </button>
      </div>
    </form>
  );
}
