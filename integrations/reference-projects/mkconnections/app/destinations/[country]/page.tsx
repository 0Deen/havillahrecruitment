import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { destinations, jobs } from "@/data/jobs";
import { JobCard } from "@/components/JobCard";
import { JobAlertForm } from "@/components/JobAlertForm";

export function generateStaticParams() {
  return destinations.map((d) => ({ country: d.name.toLowerCase().replace(/\s+/g, "-") }));
}

export default function DestinationDetailPage({ params }: { params: { country: string } }) {
  const destination = destinations.find((d) => d.name.toLowerCase().replace(/\s+/g, "-") === params.country);
  if (!destination) return notFound();
  const countryJobs = jobs.filter((j) => j.country === destination.name);

  return (
    <div>
      <section className="relative overflow-hidden bg-[#073b82] text-white">
        <div className="absolute inset-0"><Image src={destination.image} alt="" fill className="object-cover opacity-35" /><div className="absolute inset-0 bg-[#073b82]/80" /></div>
        <div className="container-content relative py-14 md:py-20">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={16} /> All destinations</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{destination.code} · destination guide</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">{destination.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">{destination.summary}</p>
        </div>
      </section>

      <div className="container-content py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><ShieldCheck className="text-[#0b4aa2]" size={22} /><h2 className="mt-3 font-extrabold text-[#10233f]">Verify first</h2><p className="mt-2 text-sm leading-6 text-slate-500">Confirm the employer, job terms and official communication channel before paying or travelling.</p></div>
          <div className="rounded-2xl border border-blue-100 bg-white p-5"><h2 className="font-extrabold text-[#10233f]">Current roles</h2><p className="mt-2 text-sm leading-6 text-slate-500">Live listings are shown only where the combined project data has a specific role. For other openings, contact the team.</p></div>
          <div className="rounded-2xl border border-blue-100 bg-white p-5"><h2 className="font-extrabold text-[#10233f]">Preparation</h2><p className="mt-2 text-sm leading-6 text-slate-500">Keep your passport, relevant certificates, contact details and employment history ready for screening.</p></div>
        </div>

        <h2 className="mt-14 text-2xl font-extrabold text-[#10233f] md:text-3xl">Opportunities in {destination.name}</h2>
        {countryJobs.length === 0 ? (
          <div className="mt-6 max-w-xl rounded-3xl border border-blue-100 bg-slate-50 p-6">
            <p className="text-sm leading-6 text-slate-600">There are no specific live listings shown for {destination.name} right now. Leave your contact details for an alert when a matching opportunity is confirmed.</p>
            <div className="mt-5"><JobAlertForm country={destination.name} /></div>
          </div>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{countryJobs.map((job) => <JobCard key={job.slug} job={job} />)}</div>
        )}
      </div>
    </div>
  );
}
