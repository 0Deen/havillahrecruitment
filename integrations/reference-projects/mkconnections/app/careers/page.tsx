export default function CareersPage() {
  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Careers at MK Connection Limited</h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate">
        Interested in joining the MK Connection Limited team itself — recruitment, screening, operations, or
        support — rather than applying for an overseas placement? We'd like to hear from you.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-sand/40 p-7">
        <h2 className="font-display text-xl text-ink">Open internal roles</h2>
        <p className="mt-2 max-w-md text-sm text-slate">
          No open internal positions are listed here right now. This section will show real MK Connection Limited
          hiring needs once the company confirms them — nothing here is invented to look more active
          than it is.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white p-7">
        <h2 className="font-display text-lg text-ink">Send a speculative application</h2>
        <p className="mt-2 text-sm text-slate">
          If you'd like to be considered for future openings at MK Connection Limited itself, reach out through the{" "}
          <a href="/contact" className="text-amber-deep hover:underline">contact page</a> with "Careers"
          as the subject.
        </p>
      </div>
    </div>
  );
}
