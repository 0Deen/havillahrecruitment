import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return (
    <article>
      <div className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">Services</p>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-sand-100/80">{service.summary}</p>
          <Link href="/apply-now" className="mt-6 inline-block rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-400">
            Apply for this service
          </Link>
        </div>
      </div>

      <div className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-navy-900">Who qualifies</h2>
          <ul className="mt-3 space-y-2 text-sm text-navy-700/80">
            {service.whoQualifies.map((q) => <li key={q}>• {q}</li>)}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold text-navy-900">Requirements</h2>
          <ul className="mt-3 space-y-2 text-sm text-navy-700/80">
            {service.requirements.map((r) => <li key={r}>• {r}</li>)}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold text-navy-900">FAQs</h2>
          <div className="mt-3 space-y-4">
            {service.faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-navy-900/10 p-4">
                <p className="font-semibold text-navy-900">{f.q}</p>
                <p className="mt-1 text-sm text-navy-700/70">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-navy-900/10 bg-sand-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/60">Countries</p>
            <p className="mt-1 text-sm text-navy-900">{service.countries.join(", ")}</p>
          </div>
          <div className="rounded-2xl border border-navy-900/10 bg-sand-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/60">Timeline</p>
            <p className="mt-1 text-sm text-navy-900">{service.timeline}</p>
          </div>
          <div className="rounded-2xl border border-navy-900/10 bg-sand-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/60">Costs</p>
            <p className="mt-1 text-sm text-navy-900">{service.costs}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
