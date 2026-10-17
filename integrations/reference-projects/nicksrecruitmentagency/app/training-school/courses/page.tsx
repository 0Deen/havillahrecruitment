import Link from "next/link";
import { courses } from "@/lib/data";

export default function CoursesIndex() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Available Courses</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link key={c.slug} href={`/training-school/courses/${c.slug}`} className="rounded-2xl border border-navy-900/10 p-6 hover:border-gold-500">
            <p className="font-semibold text-navy-900">{c.name}</p>
            <p className="mt-1 text-sm text-navy-700/60">{c.duration} · {c.certification}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
