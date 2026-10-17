import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { design } from "@/lib/job-images";

const tiles = [
  { pic: design.dubaiPlane, label: "Dubai", span: "col-span-2 row-span-2" },
  { pic: design.coolPlane, label: "Fly out", span: "col-span-2 row-span-1" },
  { pic: design.qatarPassport, label: "Qatar", span: "col-span-1 row-span-1" },
  { pic: design.uaePlane, label: "UAE", span: "col-span-1 row-span-1" },
] as const;

/** Travel-photo strip built from public/images/design (new images). */
export function JourneyMosaic() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-content grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f2aa5]">Your journey</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10233f] md:text-4xl">From Nairobi to the Gulf — with support all the way.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Documents, medicals, orientation and travel guidance, handled step by step by a team you can actually talk to.
          </p>
          <Link href="/how-it-works" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2f2aa5] px-6 py-3 text-sm font-bold text-white shadow-lift transition hover:bg-[#25218a]">
            See how it works <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid auto-rows-[120px] grid-cols-4 gap-3 sm:auto-rows-[150px]">
          {tiles.map(({ pic, label, span }) => (
            <div key={label} className={`group relative overflow-hidden rounded-3xl bg-blue-50 shadow-soft ${span}`}>
              <SafeImage src={pic.src} fallback={pic.fallback} alt={label} fill sizes="(max-width: 1024px) 50vw, 380px" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10233f]/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-[0.14em] text-white">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
