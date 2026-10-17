import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/data";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) return notFound();

  return (
    <article className="container-page py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">Training School</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy-900">{course.name}</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[["Duration", course.duration], ["Fee", course.fee], ["Certification", course.certification]].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-navy-900/10 p-4">
            <p className="text-xs font-semibold uppercase text-navy-700/50">{l}</p>
            <p className="mt-1 text-navy-900">{v}</p>
          </div>
        ))}
      </div>
      <Link href="/book-training" className="mt-8 inline-block rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-400">
        Book this course
      </Link>
    </article>
  );
}
