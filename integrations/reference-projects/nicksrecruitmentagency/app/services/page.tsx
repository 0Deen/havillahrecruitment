import Link from "next/link";
import { services } from "@/lib/data";

export default function ServicesIndex() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Services</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-2xl border border-navy-900/10 p-6 hover:border-gold-500">
            <p className="font-display text-lg font-semibold text-navy-900">{s.name}</p>
            <p className="mt-2 text-sm text-navy-700/70">{s.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
