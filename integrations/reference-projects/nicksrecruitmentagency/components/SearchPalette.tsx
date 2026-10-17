"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import type { SearchResult } from "@/lib/search";

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K to open, Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
    else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((d) => setResults(d.results ?? []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 150);
    return () => clearTimeout(t);
  }, [query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-sm text-navy-700/60 transition hover:border-gold-400 hover:text-navy-900"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-navy-900/15 px-1.5 py-0.5 text-[10px] font-semibold sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-navy-950/60 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Search"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-navy-900/10 px-4 py-3">
              <Search size={18} className="text-navy-900/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs, countries, services, FAQs…"
                className="flex-1 bg-transparent text-sm text-navy-900 outline-none placeholder:text-navy-900/40"
                onKeyDown={(e) => {
                  if (e.key === "Enter") go(`/search?q=${encodeURIComponent(query)}`);
                }}
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="rounded-md p-1 text-navy-900/40 hover:bg-sand-100 hover:text-navy-900"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {loading && (
                <p className="px-3 py-6 text-center text-sm text-navy-700/50">Searching…</p>
              )}
              {!loading && query && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-navy-700/50">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
              {!loading &&
                results.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => go(r.href)}
                    className="flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-sand-100"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gold-600">
                        {r.section}
                      </span>
                      <p className="text-sm font-semibold text-navy-900">{r.title}</p>
                    </div>
                    <ArrowRight size={14} className="mt-1 shrink-0 text-navy-900/20" />
                  </button>
                ))}
              {!query && (
                <p className="px-3 py-6 text-center text-sm text-navy-700/50">
                  Start typing to search the whole site
                </p>
              )}
            </div>

            {query && (
              <button
                onClick={() => go(`/search?q=${encodeURIComponent(query)}`)}
                className="flex w-full items-center justify-center gap-1.5 border-t border-navy-900/10 py-2.5 text-xs font-semibold text-navy-700 hover:bg-sand-100"
              >
                View all results <CornerDownLeft size={12} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
