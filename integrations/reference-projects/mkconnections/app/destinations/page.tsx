import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/jobs";

export default function DestinationsPage() {
  return (
    <div className="bg-slate-50 py-14 md:py-20">
      <div className="container-content">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b4aa2]">Where we recruit</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10233f] md:text-5xl">Gulf destinations</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500 md:text-base">Explore the six Gulf destinations represented across the combined projects. Job demand changes, so only opportunities that are confirmed should be treated as current openings.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <Link key={d.code} href={`/destinations/${d.name.toLowerCase().replace(/\s+/g, "-")}`} className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
              <div className="relative aspect-[1.7/1] overflow-hidden bg-blue-50">
                <Image src={d.image} alt={d.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061f44]/80 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-[#0b4aa2]">{d.code}</span>
                <h2 className="absolute bottom-4 left-4 text-2xl font-extrabold text-white">{d.name}</h2>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-slate-500">{d.summary}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#0b4aa2]"><span>{d.jobs}+ opportunity signals</span><ArrowUpRight size={16} /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
