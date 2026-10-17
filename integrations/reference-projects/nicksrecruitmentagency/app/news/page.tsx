const news = [
  { title: "New batch of housekeeping graduates placed in Doha", tag: "Training", date: "Jul 2026" },
  { title: "UAE visa processing times updated for Q3", tag: "Visa Update", date: "Jul 2026" },
  { title: "Employer visit: partner hotel group tours our facility", tag: "Employer Visit", date: "Jun 2026" },
  { title: "Kuwait travel advisory: what candidates should know", tag: "Travel Update", date: "Jun 2026" },
];
export default function NewsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">News</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {news.map((n) => (
          <article key={n.title} className="rounded-2xl border border-navy-900/10 p-6">
            <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-navy-700">{n.tag}</span>
            <p className="mt-3 font-display text-lg font-semibold text-navy-900">{n.title}</p>
            <p className="mt-2 text-xs text-navy-700/50">{n.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
