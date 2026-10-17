const stories = [
  { name: "Candidate name", role: "Placed as a Driver", country: "Saudi Arabia", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed as a Nurse", country: "United Arab Emirates", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed in Hospitality", country: "Qatar", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed in Construction", country: "Kuwait", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed in Security", country: "Bahrain", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
  { name: "Candidate name", role: "Placed in Domestic Employment", country: "Oman", quote: "Placeholder — replace with a real, permissioned candidate testimonial." },
];

export default function SuccessStoriesPage() {
  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Real people. Real opportunities.</h1>
      <p className="mt-3 max-w-lg text-sm text-slate">
        Every MK Connection Limited placement starts with someone taking a real step toward a new chapter. These
        cards are placeholders — real stories will replace them once candidates give permission to
        share theirs.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s, i) => (
          <div key={i} className="rounded-2xl border border-line bg-white p-6">
            <div className="mb-4 h-32 w-full rounded-xl bg-sand" aria-label="Candidate photo placeholder" />
            <p className="text-sm italic text-slate">&ldquo;{s.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-medium text-ink">{s.name}</p>
            <p className="text-xs text-slate">{s.role} — {s.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
