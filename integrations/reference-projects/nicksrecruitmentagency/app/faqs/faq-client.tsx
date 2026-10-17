"use client";

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Search, MessageSquare } from "lucide-react";
import type { SiteFaq } from "@/lib/data";

export default function FaqClient({ faqs }: { faqs: SiteFaq[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((f) => f.category)))],
    [faqs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory = category === "All" || f.category === category;
      const matchesQuery =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [faqs, query, category]);

  return (
    <div>
      {/* Search */}
      <div className="relative mt-8 max-w-xl">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-900/40"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs — e.g. fees, medical, timeline…"
          className="w-full rounded-full border border-navy-900/15 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 outline-none transition focus:border-gold-400"
        />
      </div>

      {/* Category filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
              category === c
                ? "border-gold-500 bg-gold-500 text-navy-900"
                : "border-navy-900/15 bg-white text-navy-700 hover:border-gold-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8 max-w-2xl">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-900/15 bg-white p-10 text-center">
            <MessageSquare className="mx-auto text-navy-900/20" size={28} />
            <p className="mt-3 font-semibold text-navy-900">No matching questions</p>
            <p className="mt-1 text-sm text-navy-700/60">
              Try a different search term, or ask our chat assistant directly.
            </p>
          </div>
        ) : (
          <Accordion.Root type="single" collapsible className="space-y-3">
            {filtered.map((f) => (
              <Accordion.Item
                key={f.q}
                value={f.q}
                className="overflow-hidden rounded-xl border border-navy-900/10 bg-white"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="font-semibold text-navy-900">{f.q}</span>
                    <ChevronDown
                      size={16}
                      className="shrink-0 text-navy-900/40 transition-transform group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden px-5 pb-4 text-sm leading-relaxed text-navy-700/70 data-[state=open]:animate-fade-up">
                  {f.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}
      </div>
    </div>
  );
}
