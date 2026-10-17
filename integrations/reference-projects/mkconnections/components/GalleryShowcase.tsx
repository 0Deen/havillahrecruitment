"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { countryFilters, galleryItems, type GalleryItem } from "@/lib/gallery-data";
import { siteConfig } from "@/lib/site-config";

export function GalleryShowcase() {
  const [filter, setFilter] = useState<(typeof countryFilters)[number]>("All");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.country === filter)),
    [filter]
  );

  useEffect(() => setActive(0), [filter]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const n = items.length;
  const at = (offset: number) => items[(((active + offset) % n) + n) % n];
  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  return (
    <>
      {/* Filter pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        {countryFilters.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === c
                ? "border-ink bg-ink text-white shadow-soft"
                : "border-ink/25 bg-white text-ink hover:border-amber hover:text-amber-deep"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Carousel */}
      {n > 0 && (
        <div className="mt-12">
          <div className="relative mx-auto flex h-[340px] max-w-4xl items-center justify-center overflow-hidden md:h-[420px]">
            {[-2, -1, 0, 1, 2].map((off) => {
              if (n < Math.abs(off) + 1 && off !== 0) return null;
              const it = at(off);
              const center = off === 0;
              return (
                <button
                  key={`${it.id}-${off}`}
                  onClick={() => (center ? setLightbox(it) : setActive((active + off + n * 2) % n))}
                  aria-label={it.title}
                  style={{
                    transform: `translate(calc(-50% + ${off * 190}px), -50%) scale(${center ? 1 : Math.abs(off) === 1 ? 0.84 : 0.68})`,
                    zIndex: 10 - Math.abs(off),
                    opacity: Math.abs(off) === 2 ? 0.55 : 1,
                    left: "50%",
                    top: "50%",
                  }}
                  className={`absolute overflow-hidden rounded-[28px] bg-white transition-all duration-500 ${
                    center ? "h-[320px] w-[260px] shadow-lift md:h-[400px] md:w-[300px]" : "h-[260px] w-[200px] shadow-soft md:h-[320px] md:w-[240px]"
                  }`}
                >
                  <img src={it.img} alt={it.title} className="h-full w-full object-cover" loading="lazy" />
                  {center && (
                    <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 px-3.5 py-2.5 text-left backdrop-blur">
                      <span className="block text-xs text-slate">{it.flag} {it.country}</span>
                      <span className="block font-display text-sm text-ink">{it.title}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={prev} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-ink/40 bg-white transition hover:bg-ink hover:text-white">
              <ArrowLeft size={18} />
            </button>
            <span className="text-xs text-slate">{active + 1} / {n}</span>
            <button onClick={next} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-ink/40 bg-white transition hover:bg-ink hover:text-white">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Cute masonry grid */}
      <div className="mt-20 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setLightbox(g)}
            style={{ backgroundColor: g.tint }}
            className={`group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[28px] p-3 text-left shadow-soft transition duration-300 hover:-translate-y-1.5 hover:rotate-[-0.6deg] hover:shadow-lift ${
              i % 2 ? "" : "sm:pt-3"
            }`}
          >
            <div className="overflow-hidden rounded-[20px]">
              <img
                src={g.img}
                alt={g.title}
                loading="lazy"
                className="w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-2 pb-2 pt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink">
                <span>{g.flag}</span> {g.country}
              </span>
              <p className="mt-2 font-display text-lg text-ink">{g.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate">{g.content}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-lift"
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-soft"
            >
              <X size={18} />
            </button>
            <img src={lightbox.img} alt={lightbox.title} className="max-h-[62vh] w-full object-contain bg-sand" />
            <div className="p-6">
              <p className="text-xs text-slate">{lightbox.flag} {lightbox.country}</p>
              <h3 className="mt-1 font-display text-xl text-ink">{lightbox.title}</h3>
              <p className="mt-2 text-sm text-slate">{lightbox.content}</p>
              {lightbox.country !== " MK Connection Brand" && (
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-amber-deep"
                >
                  Ask about this role on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
