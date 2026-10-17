"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { JobCard } from "@/components/app/Cards";
import Icon from "@/components/app/Icon";
import { WhatsAppLink } from "@/components/app/Bits";
import { generalWhatsAppMessage } from "@/lib/whatsapp";
import { searchJobs, type Job } from "@/data/jobs";
import { track } from "@/lib/analytics";

export default function JobsExplorer({ jobs, countries, categories, initialCountry = "All" }: { jobs: Job[]; countries: string[]; categories: string[]; initialCountry?: string }) {
  const [country, setCountry] = useState(initialCountry);
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const matched = q.trim().length > 1 ? new Set(searchJobs(q).map((j) => j.slug)) : null;
    return jobs.filter((j) => (country === "All" || j.country === country) && (category === "All" || j.category === category) && (!matched || matched.has(j.slug)));
  }, [jobs, country, category, q]);

  const active = country !== "All" || category !== "All" || q;
  const clear = () => { setCountry("All"); setCategory("All"); setQ(""); };
  const pick = (setter: (v: string) => void, kind: string) => (v: string) => { setter(v); track("job_filter_used", { kind }); };

  const Chip = ({ v, cur, set }: { v: string; cur: string; set: (v: string) => void }) => (
    <button type="button" aria-pressed={cur === v} onClick={() => set(v)} className={`min-h-[42px] flex-none whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold transition active:scale-95 ${cur === v ? "border-brand-purple bg-brand-purple text-white" : "border-slate-200 bg-white text-slate-600"}`}>{v}</button>
  );

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search jobs</span>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" /></span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: cook, driver, nanny…" className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm focus:border-brand-purple focus:outline-none" />
      </label>

      <p className="mt-4 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Country</p>
      <div className="ajm-rail mt-1.5">{["All", ...countries].map((c) => <Chip key={c} v={c} cur={country} set={pick(setCountry, "country")} />)}</div>
      <p className="mt-3 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Job category</p>
      <div className="ajm-rail mt-1.5">{["All", ...categories].map((c) => <Chip key={c} v={c} cur={category} set={pick(setCategory, "category")} />)}</div>

      <div className="mt-4 flex items-center justify-between px-1">
        <p className="text-sm text-slate-600" aria-live="polite">{filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}</p>
        {active && <button onClick={clear} className="min-h-[40px] text-sm font-semibold text-brand-purple underline">Clear filters</button>}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((j) => <JobCard key={j.slug} job={j} />)}
        </div>
      ) : (
        <div className="mt-4 rounded-[28px] bg-white p-7 text-center shadow-sm">
          <p className="font-display text-xl font-bold text-ink">No matching opportunity listed</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">We don’t currently have a matching opportunity listed. Our team can confirm what’s available right now.</p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <WhatsAppLink message={generalWhatsAppMessage()} label="Ask on WhatsApp" source="jobs-empty" />
            <Link href="/destinations" className="btn-secondary">Explore other destinations</Link>
          </div>
        </div>
      )}
    </div>
  );
}
