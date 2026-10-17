"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { jobs, countries, jobCategories } from "@/lib/data";
import { Search } from "lucide-react";

export default function JobsPage() {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (country && j.country !== country) return false;
      if (category && j.category !== category) return false;
      if (urgentOnly && !j.urgent) return false;
      if (query && !j.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [country, category, urgentOnly, query]);

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">All Jobs</h1>

      <div className="mt-8 grid gap-4 rounded-2xl border border-navy-900/10 bg-sand-100 p-6 md:grid-cols-4">
        <div className="flex items-center gap-2 rounded-lg border border-navy-900/15 bg-white px-3 py-2 md:col-span-2">
          <Search size={16} className="text-navy-700/50" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search job title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="rounded-lg border border-navy-900/15 bg-white px-3 py-2 text-sm" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">All countries</option>
          {countries.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
        </select>
        <select className="rounded-lg border border-navy-900/15 bg-white px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {jobCategories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm text-navy-800 md:col-span-4">
          <input type="checkbox" checked={urgentOnly} onChange={(e) => setUrgentOnly(e.target.checked)} />
          Urgent hiring only
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((j) => (
          <Link key={j.id} href={`/jobs/${j.id}`} className="rounded-2xl border border-navy-900/10 bg-white p-6 hover:border-gold-500">
            {j.urgent && <span className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Urgent</span>}
            <p className="font-display text-lg font-semibold text-navy-900">{j.title}</p>
            <p className="mt-1 text-sm text-navy-700/70">{j.country} · {j.category}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700">{j.salary}</p>
          </Link>
        ))}
        {!filtered.length && <p className="text-sm text-navy-700/60">No jobs match those filters right now.</p>}
      </div>
    </div>
  );
}
