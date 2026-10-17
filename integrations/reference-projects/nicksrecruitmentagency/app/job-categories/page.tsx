import Link from "next/link";
import { jobCategories } from "@/lib/data";

export default function JobCategoriesIndex() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Jobs by Category</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {jobCategories.map((c) => (
          <Link key={c.slug} href={`/job-categories/${c.slug}`} className="rounded-xl border border-navy-900/10 p-5 text-center text-sm font-medium hover:border-gold-500">
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
