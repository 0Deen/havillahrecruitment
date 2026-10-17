"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { searchSite } from "@/lib/search";
import { track } from "@/lib/analytics";

const SUGGESTIONS = ["Cook", "Driver", "Caregiver", "Nanny", "Tutor", "Beautician", "Qatar", "Kuwait", "Oman", "Saudi Arabia", "UAE", "Bahrain"];

export default function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchSite(q), [q]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (q.trim().length < 3) return;
    const t = setTimeout(() => track("search_performed", { results: results.length }), 700);
    return () => clearTimeout(t);
  }, [q, results.length]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Search">
      <button aria-label="Close search" onClick={onClose} className="ajm-fade absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <div className="ajm-sheet absolute inset-x-0 top-0 mx-auto max-h-[92%] w-full max-w-2xl overflow-y-auto rounded-b-[28px] bg-[#F7F4FC] px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl lg:top-10 lg:rounded-[28px]">
        <div className="flex items-center gap-2">
          <label className="relative flex-1">
            <span className="sr-only">Search jobs, countries and guides</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" /></span>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “cook jobs in Qatar”"
              enterKeyHint="search"
              className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 text-base text-ink shadow-sm focus:border-brand-purple focus:outline-none"
            />
          </label>
          <button onClick={onClose} className="h-12 rounded-full px-3 text-sm font-semibold text-brand-purple">Cancel</button>
        </div>

        {q.trim().length < 2 ? (
          <div className="mt-5">
            <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => setQ(s)} className="min-h-[40px] rounded-full bg-white px-4 text-sm font-medium text-brand-purple shadow-sm active:scale-95">{s}</button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="mt-6 rounded-3xl bg-white p-6 text-center shadow-sm">
            <p className="font-display text-lg font-bold text-ink">No match found</p>
            <p className="mx-auto mt-1 max-w-xs text-sm text-slate-600">We don’t have a listing matching that right now. Our team can confirm what’s available.</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/contact" onClick={onClose} className="btn-primary">Contact Ajira Majuu</Link>
              <Link href="/destinations" onClick={onClose} className="btn-secondary">Explore destinations</Link>
            </div>
          </div>
        ) : (
          <ul className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm">
            {results.map((r, i) => (
              <li key={r.href + i} className={i ? "border-t border-slate-100" : ""}>
                <Link href={r.href} onClick={onClose} className="flex min-h-[60px] items-center gap-3 px-4 py-2.5 active:bg-slate-50">
                  <span className="rounded-full bg-brand-purple/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-purple">{r.kind}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14.5px] font-semibold text-ink">{r.title}</span>
                    {r.subtitle && <span className="block truncate text-xs text-slate-500">{r.subtitle}</span>}
                  </span>
                  <Icon name="right" className="h-4 w-4 text-slate-300" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
