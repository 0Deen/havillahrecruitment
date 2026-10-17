export default function ResponsibilitiesPage() {
  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Candidate &amp; Employer Responsibilities</h1>
      <div className="mt-6 max-w-2xl space-y-6 text-sm leading-relaxed text-slate">
        <p className="rounded-xl border border-amber/30 bg-amber/5 p-4 text-ink">
          Placeholder page. The specific responsibilities below are drafted as a starting structure only
          and must be reviewed by MK Connection Limited&apos;s legal counsel before publishing — nothing here should be
          treated as a binding commitment yet.
        </p>

        <div>
          <h2 className="font-display text-lg text-ink">Candidates</h2>
          <ul className="mt-2 list-inside list-disc space-y-1.5">
            <li>Provide accurate, truthful information in your application and documents.</li>
            <li>Never pay an unofficial individual to secure or speed up a placement.</li>
            <li>Keep MK Connection Limited informed of any change in your contact details or availability.</li>
            <li>Report any suspicious activity through official channels.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-ink">Employers</h2>
          <ul className="mt-2 list-inside list-disc space-y-1.5">
            <li>Provide accurate job, salary, and benefit information for every listing.</li>
            <li>Honour the terms of any contract offered to a placed candidate.</li>
            <li>Communicate with candidates only through MK Connection Limited&apos;s official channels during recruitment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
