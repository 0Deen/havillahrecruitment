import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { jobs } from "@/data/jobs";
import { GENERIC_FALLBACK } from "@/lib/job-images";

/** Shows every job that ships with a recruitment flyer (the newest openings). */
export function LatestOpenings() {
  const flyerJobs = jobs.filter((j) => j.flyer);
  if (flyerJobs.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#f3f2ff] py-16 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2f2aa5]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#0b4aa2]/10 blur-3xl" />

      <div className="container-content relative">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2f2aa5] shadow-sm">
              <Sparkles size={13} /> Just added
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10233f] md:text-4xl">Latest openings — Saudi Arabia &amp; Qatar</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Tap any flyer for the full role details. Salary, commission and employer requirements are confirmed directly with our team.
            </p>
          </div>
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-[#2f2aa5]">
            See every opening <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* mobile: swipeable row · desktop: grid */}
        <div className="-mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
          {flyerJobs.map((job) => (
            <Link
              key={job.slug}
              href={`/jobs/${job.slug}`}
              className="group relative w-[68vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border border-white bg-white shadow-[0_16px_40px_rgba(47,42,165,0.14)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(47,42,165,0.24)] md:w-auto md:max-w-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-blue-50">
                <SafeImage
                  src={job.flyer!.src}
                  fallback={job.flyer!.fallback || GENERIC_FALLBACK}
                  alt={`${job.title} — ${job.country}`}
                  fill
                  sizes="(max-width: 768px) 68vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#2f2aa5]">{job.country}</p>
                  <h3 className="mt-0.5 truncate text-sm font-extrabold text-[#10233f]">{job.title}</h3>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2f2aa5] text-white transition group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
