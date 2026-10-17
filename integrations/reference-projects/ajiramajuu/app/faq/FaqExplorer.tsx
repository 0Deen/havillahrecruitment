"use client";

import { useMemo, useState } from "react";
import { Accordion } from "@/components/app/Bits";
import Icon from "@/components/app/Icon";
import type { Faq } from "@/data/content";

export default function FaqExplorer({ faqs, categories }: { faqs: Faq[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return faqs.filter((f) => (cat === "All" || f.category === cat) && (!s || `${f.q} ${f.a}`.toLowerCase().includes(s)));
  }, [faqs, q, cat]);
  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search questions</span>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" /></span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm focus:border-brand-purple focus:outline-none" />
      </label>
      <div className="ajm-rail mt-3">
        {["All", ...categories].map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`min-h-[42px] whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold ${cat === c ? "border-brand-purple bg-brand-purple text-white" : "border-slate-200 bg-white text-slate-600"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-4">
        {list.length ? <Accordion items={list.map((f) => ({ id: f.id, q: f.q, a: f.a, link: f.link }))} /> : <p className="rounded-3xl bg-white p-6 text-center text-sm text-slate-600 shadow-sm">No matching question. Try different words, or contact us on the Contact page.</p>}
      </div>
    </div>
  );
}
