import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPinned } from "lucide-react";

const countries = [
  { slug: "saudi-arabia", name: "Saudi Arabia", city: "Riyadh & more", image: "/images/countries/saudiarabia.png" },
  { slug: "united-arab-emirates", name: "United Arab Emirates", city: "Dubai & Abu Dhabi", image: "/images/countries/dubaicity.png" },
  { slug: "qatar", name: "Qatar", city: "Doha", image: "/images/countries/qatar.png" },
  { slug: "kuwait", name: "Kuwait", city: "Kuwait City", image: "/images/countries/kuwaitcity.jfif" },
  { slug: "bahrain", name: "Bahrain", city: "Manama", image: "/images/countries/manamabahrain.png" },
  { slug: "oman", name: "Oman", city: "Muscat", image: "/images/countries/muscatoman.png" },
];

export function DestinationHighlights() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container-content">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b4aa2]">Gulf destinations</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-[#10233f] md:text-4xl">Explore where your international journey can take you.</h2>
          </div>
          <Link href="/destinations" className="inline-flex items-center gap-2 text-sm font-bold text-[#0b4aa2]">View all destinations <ArrowUpRight size={17} /></Link>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <Link key={country.slug} href={`/destinations/${country.slug}`} className="group relative overflow-hidden rounded-3xl bg-[#073b82] shadow-soft">
              <div className="relative aspect-[1.5/1]">
                <Image src={country.image} alt={country.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061f44] via-[#061f44]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200"><MapPinned size={14} /> {country.city}</div>
                  <h3 className="mt-1 text-xl font-extrabold">{country.name}</h3>
                  <p className="mt-1 text-xs text-white/70">Browse current opportunities and preparation guidance</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
