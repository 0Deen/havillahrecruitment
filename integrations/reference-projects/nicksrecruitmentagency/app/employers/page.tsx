import Link from "next/link";
import { employerPages } from "@/lib/page-content";

export default function EmployersIndex() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">For Employers</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employerPages.map((p) => (
          <Link key={p.slug} href={`/employers/${p.slug}`} className="rounded-2xl border border-navy-900/10 p-6 hover:border-gold-500">
            <p className="font-semibold text-navy-900">{p.title}</p>
            <p className="mt-2 text-sm text-navy-700/70">{p.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
