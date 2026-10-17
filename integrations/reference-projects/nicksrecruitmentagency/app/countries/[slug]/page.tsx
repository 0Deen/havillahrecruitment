import { notFound } from "next/navigation";
import Link from "next/link";
import { countries, jobs } from "@/lib/data";
import { countryExperiences } from "@/lib/country-experience-data";
import CountryExperience from "@/components/country-experience/CountryExperience";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = countries.find((c) => c.slug === params.slug);
  if (!country) return notFound();

  // Countries with a full "Country Experience" (18-section cinematic build)
  // get the premium template. Everyone else still gets the solid baseline
  // page below until their experience data is written — same pattern the
  // Oman page was built with, ready to replicate.
  const experience = countryExperiences[params.slug];
  if (experience) {
    return <CountryExperience data={experience} />;
  }

  const countryJobs = jobs.filter((j) => j.country.toLowerCase().includes(country.name.split(" ")[0].toLowerCase()) || j.country === country.name);

  return (
    <article>
      <div className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <p className="text-6xl">{country.flag}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Jobs in {country.name}</h1>
        </div>
      </div>

      <div className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-6">
          {[
            ["Average salary range", country.avgSalaryRange],
            ["Currency", country.currency],
            ["Climate", country.climate],
            ["Working hours", country.workingHours],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-navy-900/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/50">{label}</p>
              <p className="mt-1 text-navy-900">{value}</p>
            </div>
          ))}

          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900">Frequently hired professions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {country.commonRoles.map((r) => (
                <span key={r} className="rounded-full bg-sand-100 px-3 py-1 text-sm text-navy-800">{r}</span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-navy-900">Required documents</h2>
            <ul className="mt-3 space-y-1 text-sm text-navy-700/80">
              {country.requiredDocs.map((d) => <li key={d}>• {d}</li>)}
            </ul>
          </div>
        </section>

        <aside>
          <h2 className="font-display text-xl font-semibold text-navy-900">Open roles</h2>
          <div className="mt-3 space-y-3">
            {countryJobs.length ? countryJobs.map((j) => (
              <Link key={j.id} href={`/jobs/${j.id}`} className="block rounded-xl border border-navy-900/10 p-4 hover:border-gold-500">
                <p className="font-semibold text-navy-900">{j.title}</p>
                <p className="text-sm text-navy-700/60">{j.salary}</p>
              </Link>
            )) : <p className="text-sm text-navy-700/60">No open roles listed right now — check back soon.</p>}
          </div>
        </aside>
      </div>
    </article>
  );
}
