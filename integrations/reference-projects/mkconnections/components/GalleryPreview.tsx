import Link from "next/link";
import { galleryItems } from "@/lib/gallery-data";

// Noir-style rounded photo mosaic linking to the full gallery.
export function GalleryPreview() {
  const pics = galleryItems.slice(0, 8);
  return (
    <section className="border-t border-line bg-white py-16 md:py-24">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-deep">Gallery</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">Real roles. Real destinations.</h2>
          </div>
          <Link href="/gallery" className="rounded-full bg-ink px-5 py-2.5 text-sm text-white transition hover:bg-amber-deep hover:text-ink">
            See the full gallery →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {pics.map((g, i) => (
            <Link
              key={g.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-[24px] shadow-soft ${i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            >
              <img src={g.img} alt={g.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] text-ink backdrop-blur">
                {g.flag} {g.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
