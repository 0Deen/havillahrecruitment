import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { resourcePages } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Resources & Guides",
  description:
    "Practical guides on visas, contracts, life abroad, worker rights and more for candidates going through overseas recruitment with Nicks Recruitment Agency.",
};

export default function ResourcesPage() {
  return (
    <div className="bg-sand-50">
      <div className="bg-navy-900 py-16 text-white dark:bg-navy-950">
        <div className="container-page">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-400">
            <BookOpen size={12} /> Resources
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Guides for every stage of your journey
          </h1>
          <p className="mt-4 max-w-2xl text-sand-100/80">
            Practical, plain-language guidance on visas, contracts, life
            abroad, worker rights, and more — written from what we see every
            day placing candidates overseas.
          </p>
        </div>
      </div>

      <div className="container-page py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resourcePages.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm transition hover:border-gold-400 hover:shadow-md dark:border-white/10 dark:bg-navy-900"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                  {r.eyebrow}
                </span>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy-900 dark:text-white">
                  {r.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-navy-700/70 dark:text-sand-200/70">
                  {r.intro}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-800 dark:text-gold-400">
                Read guide
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
