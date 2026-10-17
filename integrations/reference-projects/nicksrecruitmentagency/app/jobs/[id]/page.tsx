import { notFound } from "next/navigation";
import Link from "next/link";
import { jobs } from "@/lib/data";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) return notFound();

  const rows: [string, string][] = [
    ["Position", job.title],
    ["Salary", job.salary],
    ["Working hours", "8 hrs/day, per local labour law"],
    ["Accommodation", job.accommodation ? "Provided" : "Not provided"],
    ["Food", job.food ? "Provided" : "Not provided"],
    ["Nationality", "Open"],
    ["Visa", job.visaIncluded ? "Included" : "Not included"],
    ["Contract length", "2 years, renewable"],
    ["Experience required", job.experience],
    ["Deadline", "Rolling — apply as soon as possible"],
  ];

  return (
    <article className="container-page py-16">
      {job.urgent && <span className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Urgent Hiring</span>}
      <h1 className="font-display text-4xl font-semibold text-navy-900">{job.title}</h1>
      <p className="mt-1 text-navy-700/70">{job.country} · {job.category}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 p-4 text-sm">
              <span className="text-navy-700/60">{label}</span>
              <span className="font-medium text-navy-900">{value}</span>
            </div>
          ))}
        </div>
        <aside className="space-y-4">
          <Link href="/apply-now" className="block rounded-full bg-gold-500 px-6 py-3 text-center text-sm font-semibold text-navy-900 hover:bg-gold-400">
            Apply for this role
          </Link>
          <Link href="/jobs" className="block rounded-full border border-navy-900/15 px-6 py-3 text-center text-sm font-semibold text-navy-800">
            Back to all jobs
          </Link>
        </aside>
      </div>
    </article>
  );
}
