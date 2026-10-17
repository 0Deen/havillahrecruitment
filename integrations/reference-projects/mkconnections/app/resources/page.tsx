const articles = [
  { title: "How to Prepare for an Overseas Job Interview", tag: "Interview Prep", readTime: "5 min read" },
  { title: "What to Check Before Accepting an Overseas Job", tag: "Worker Safety", readTime: "6 min read" },
  { title: "How to Identify Fake Recruitment Offers", tag: "Scam Prevention", readTime: "4 min read" },
  { title: "Preparing for Your First International Job", tag: "Travel Preparation", readTime: "7 min read" },
  { title: "Building a CV That Gets Noticed", tag: "CV & Applications", readTime: "5 min read" },
  { title: "Understanding Your Employment Contract", tag: "Overseas Employment", readTime: "6 min read" },
];

export default function ResourcesPage() {
  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Career intelligence</h1>
      <p className="mt-3 max-w-lg text-sm text-slate">
        Guides to help you prepare, apply, and thrive abroad. Full articles are placeholders pending
        MK Connection Limited's content team.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <div key={a.title} className="rounded-2xl border border-line bg-white p-6 transition hover:border-amber">
            <span className="text-xs font-medium text-amber-deep">{a.tag}</span>
            <h2 className="mt-3 font-display text-lg leading-snug text-ink">{a.title}</h2>
            <p className="mt-3 text-xs text-slate">{a.readTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
