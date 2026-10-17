import type { SimplePage } from "@/lib/page-content";

export default function PageTemplate({ page }: { page: SimplePage }) {
  return (
    <article className="bg-sand-50">
      <div className="bg-navy-900 py-16 text-white dark:bg-navy-950">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">{page.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{page.title}</h1>
          <p className="mt-4 max-w-2xl text-sand-100/80">{page.intro}</p>
        </div>
      </div>
      <div className="container-page grid gap-8 py-16 md:grid-cols-2">
        {page.sections.map((s) => (
          <div key={s.heading} className="rounded-2xl border border-navy-900/10 bg-white p-6 dark:border-white/10 dark:bg-navy-900">
            <h2 className="font-display text-xl font-semibold text-navy-900 dark:text-white">{s.heading}</h2>
            <p className="mt-2 text-sm text-navy-700/80 dark:text-sand-200/70">{s.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
