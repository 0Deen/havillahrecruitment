import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { search } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams?.q ?? "";
  const results = search(q, 40);

  return (
    <div className="container-page py-16">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
        <SearchIcon size={12} /> Search
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-navy-900">
        {q ? `Results for "${q}"` : "Search the site"}
      </h1>

      <form action="/search" method="get" className="relative mt-6 max-w-xl">
        <SearchIcon
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-900/40"
        />
        <input
          name="q"
          defaultValue={q}
          placeholder="Search jobs, countries, services, FAQs…"
          className="w-full rounded-full border border-navy-900/15 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 outline-none focus:border-gold-400"
        />
      </form>

      <div className="mt-10 max-w-2xl">
        {!q ? (
          <p className="text-sm text-navy-700/60">
            Try searching for a country, job title, service, or a question
            like &ldquo;fees&rdquo; or &ldquo;medical&rdquo;.
          </p>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-900/15 bg-white p-10 text-center">
            <p className="font-semibold text-navy-900">No results for &ldquo;{q}&rdquo;</p>
            <p className="mt-1 text-sm text-navy-700/60">
              Try a different term, or{" "}
              <Link href="/contact" className="font-semibold text-navy-800 underline underline-offset-2 hover:text-gold-600">
                contact us
              </Link>{" "}
              and we&rsquo;ll point you in the right direction.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  href={r.href}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-navy-900/10 bg-white p-4 transition hover:border-gold-400 hover:shadow-sm"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                      {r.section}
                    </span>
                    <p className="mt-0.5 font-display font-semibold text-navy-900">{r.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-navy-700/60">{r.description}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0 text-navy-900/20 transition group-hover:translate-x-0.5 group-hover:text-gold-600"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
