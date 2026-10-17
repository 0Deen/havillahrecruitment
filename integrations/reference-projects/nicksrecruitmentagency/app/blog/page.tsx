const posts = [
  { title: "What to pack for your first Gulf contract", date: "Jul 2026" },
  { title: "Understanding your employment contract before you sign", date: "Jun 2026" },
  { title: "A day in the life: hotel housekeeping in Doha", date: "Jun 2026" },
];
export default function BlogPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-semibold text-navy-900">Blog</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="rounded-2xl border border-navy-900/10 p-6">
            <p className="font-display text-lg font-semibold text-navy-900">{p.title}</p>
            <p className="mt-2 text-xs text-navy-700/50">{p.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
