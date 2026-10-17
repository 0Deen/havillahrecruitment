"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { stats, departureGallery } from "@/lib/data";

/* ---------------------------------------------------------------------
   Memories — a teaser collage (scattered, tilted thumbnails around a
   headline + button, in the spirit of the reference "Gallery" screen),
   which opens a full-screen lightbox (dark, tilted photo row, in the
   spirit of the reference "Memories" screen) that slides east/west
   through every real photo we have — pulled straight from
   departureGallery in lib/data.ts, plus the logo, so nothing here is a
   placeholder. The original StatsBar sits underneath, unchanged.
--------------------------------------------------------------------- */

// Every real photo available: the logo first, then every image in the
// departure gallery (videos are left out of the lightbox — they don't
// work as a tilted still photo, and stay wherever they're already used).
const memoriesPhotos = [
  { src: "/ourlogo.jpg", caption: "Nicks Recruitment" },
  ...departureGallery
    .filter((item) => item.type === "image")
    .map((item) => ({ src: item.src, caption: item.caption })),
];

// Fixed scatter positions/rotations for the teaser collage — enough
// variety to look organic, capped at 8 so the layout stays readable.
const scatterLayout = [
  { top: "6%", left: "4%", rotate: "-6deg", size: "w-28 h-28" },
  { top: "14%", left: "20%", rotate: "5deg", size: "w-20 h-20" },
  { top: "58%", left: "8%", rotate: "4deg", size: "w-24 h-24" },
  { top: "72%", left: "24%", rotate: "-4deg", size: "w-16 h-16" },
  { top: "8%", right: "6%", rotate: "6deg", size: "w-24 h-24" },
  { top: "30%", right: "18%", rotate: "-5deg", size: "w-16 h-16" },
  { top: "60%", right: "6%", rotate: "-6deg", size: "w-28 h-28" },
  { top: "76%", right: "22%", rotate: "5deg", size: "w-20 h-20" },
];

// Alternating tilt for the lightbox row, matching the reference layout.
const lightboxTilt = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [galleryOpen, setGalleryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: "east" | "west") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "east" ? 380 : -380, behavior: "smooth" });
  }

  return (
    <>
      {/* --- Memories teaser: scattered photo collage + CTA --- */}
      <section className="relative overflow-hidden bg-sand-50 py-24">
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {scatterLayout.map((pos, i) => {
            const photo = memoriesPhotos[(i + 1) % memoriesPhotos.length];
            return (
              <div
                key={i}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  transform: `rotate(${pos.rotate})`,
                }}
                className={`absolute ${pos.size} overflow-hidden rounded-2xl border-4 border-white shadow-lg`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" />
              </div>
            );
          })}
        </div>

        <div className="container-page relative z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
            <Images size={14} /> Memories
          </span>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Real send-offs, real departures, real people
          </h2>
          <p className="mt-3 max-w-md text-navy-700/70">
            Every photo here is one of our own candidates on their way to a
            new job abroad — not stock photography.
          </p>
          <button
            onClick={() => setGalleryOpen(true)}
            className="mt-8 rounded-full bg-navy-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-900"
          >
            View Our Memories
          </button>
        </div>
      </section>

      {/* --- Lightbox: dark, tilted photo row, sliding east/west --- */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-navy-950"
            onClick={(e) => e.target === e.currentTarget && setGalleryOpen(false)}
          >
            <div className="flex items-center justify-between px-6 py-6 sm:px-10">
              <span className="font-display text-lg font-semibold text-white">
                Memories
              </span>
              <button
                onClick={() => setGalleryOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center">
              <button
                onClick={() => scrollGallery("west")}
                className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
                aria-label="Slide west"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={scrollRef}
                className="flex w-full snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-16 py-10 sm:px-24"
                style={{ scrollbarWidth: "none" }}
              >
                {memoriesPhotos.map((photo, i) => (
                  <div
                    key={photo.src + i}
                    className={`relative h-64 w-52 shrink-0 snap-center overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl sm:h-80 sm:w-64 ${
                      lightboxTilt[i % lightboxTilt.length]
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-navy-950/70 px-3 py-2 text-center text-xs text-white">
                      {photo.caption}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollGallery("east")}
                className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
                aria-label="Slide east"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Original stats bar, unchanged --- */}
      <section ref={ref} className="border-y border-navy-900/10 bg-white">
        <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-semibold text-navy-900 md:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-navy-700/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
