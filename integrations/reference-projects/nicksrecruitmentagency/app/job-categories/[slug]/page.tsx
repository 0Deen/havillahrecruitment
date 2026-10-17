import { notFound } from "next/navigation";
import Link from "next/link";
import { jobCategories, jobs } from "@/lib/data";

export function generateStaticParams() {
  return jobCategories.map((c) => ({ slug: c.slug }));
}

export default function JobCategoryPage({ params }: { params: { slug: string } }) {
  const category = jobCategories.find((c) => c.slug === params.slug);
  if (!category) return notFound();
  const catJobs = jobs.filter((j) => j.category.toLowerCase() === category.name.toLowerCase());

  return (
    <div className="container-page py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">Job Category</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy-900">{category.name}</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {catJobs.length ? catJobs.map((j) => (
          <Link key={j.id} href={`/jobs/${j.id}`} className="rounded-2xl border border-navy-900/10 p-6 hover:border-gold-500">
            <p className="font-semibold text-navy-900">{j.title}</p>
            <p className="mt-1 text-sm text-navy-700/60">{j.country} · {j.salary}</p>
          </Link>
        )) : <p className="text-sm text-navy-700/60">No open roles in this category right now — check back soon.</p>}
      </div>
    </div>
  );
}
