"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Stethoscope,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowUpRight,
  HardHat,
  Home,
  Plane,
  FileText,
  ShieldCheck,
  Hotel,
} from "lucide-react";
import HeroGlobe from "./HeroGlobe";

const ctas = [
  { label: "Apply for Jobs", href: "/apply-now", icon: Briefcase, primary: true },
  { label: "Hire Workers", href: "/employers/hire-workers", icon: Users, primary: false },
  { label: "Book Medical", href: "/book-medical", icon: Stethoscope, primary: false },
  { label: "Book Training", href: "/book-training", icon: GraduationCap, primary: false },
];

/* =======================================================================
   BENTO HERO (Photo 1 redesign, v2)

   Pared down to exactly 2 photos + 1 video, in small rounded containers,
   matching the reference layout's mix of: a small photo tile, a couple
   of short value blurbs, a stat badge, an icon list card, a big center
   image card with an overlay headline, a services list card, and a CTA
   tile. Every list item (services, categories) is pulled from content
   that already exists on the site — nothing here is a fabricated
   testimonial, name, or photo of a person.
======================================================================= */

const heroImage1 = "/images/IMG-20260730-WA0045.jpg";
const heroImage2 = "/images/IMG-20260730-WA0066.jpg";
const heroVideo = "/videos/VID-20260730-WA0050.mp4";

const categories = [
  { label: "Construction", icon: HardHat },
  { label: "Hospitality", icon: Hotel },
  { label: "Domestic Work", icon: Home },
  { label: "Healthcare Support", icon: Stethoscope },
];

const services = [
  { label: "Overseas Recruitment", icon: Briefcase },
  { label: "Visa Processing", icon: Plane },
  { label: "Documentation", icon: FileText },
  { label: "Airport Assistance", icon: ShieldCheck },
];

function BentoHero() {
  return (
    <section className="relative overflow-hidden bg-sand-50 py-10 sm:py-14">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          {/* --- Row 1 --- */}

          {/* Small photo tile */}
          <div className="col-span-1 h-36 overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm sm:h-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage1} alt="" className="h-full w-full object-cover" />
          </div>

          {/* Two short value blurbs, stacked in one card */}
          <div className="col-span-1 flex h-36 flex-col justify-center gap-2 rounded-2xl border border-navy-900/10 bg-white p-4 shadow-sm sm:h-40">
            <div>
              <p className="text-xs font-semibold text-navy-900">Verified Employers</p>
              <p className="mt-0.5 text-[11px] leading-snug text-navy-700/60">
                Every vacancy comes from a licensed sponsor.
              </p>
            </div>
            <div className="border-t border-navy-900/10 pt-2">
              <p className="text-xs font-semibold text-navy-900">Full Support</p>
              <p className="mt-0.5 text-[11px] leading-snug text-navy-700/60">
                From registration to arrival, we stay with you.
              </p>
            </div>
          </div>

          {/* Stat / "hiring now" badge tile */}
          <div className="col-span-1 flex h-36 flex-col justify-center gap-1 rounded-2xl bg-navy-950 p-4 text-white shadow-sm sm:h-40">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Hiring now
            </span>
            <p className="font-display text-2xl font-bold">10,000+</p>
            <p className="text-[11px] uppercase tracking-wide text-sand-200/60">
              Workers placed
            </p>
          </div>

          {/* Eyebrow / licence badge tile */}
          <div className="col-span-1 flex h-36 flex-col justify-center gap-1 rounded-2xl border border-navy-900/10 bg-gold-500 p-4 text-navy-950 shadow-sm sm:h-40">
            <p className="text-xs font-semibold uppercase tracking-wide">
              Licensed Overseas
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide">
              Recruitment Agency
            </p>
            <p className="mt-1 text-[11px] text-navy-900/70">
              98% visa success rate
            </p>
          </div>

          {/* --- Row 2: the featured middle band --- */}

          {/* Categories list card */}
          <div className="col-span-2 flex flex-col rounded-2xl border border-navy-900/10 bg-white p-5 shadow-sm sm:col-span-1">
            <p className="font-display text-sm font-semibold text-navy-900">
              Job Categories
            </p>
            <p className="mt-1 text-[11px] text-navy-700/60">
              Explore the roles we place most.
            </p>
            <ul className="mt-3 space-y-2.5">
              {categories.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-navy-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700">
                    <Icon size={12} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <Link
              href="/job-categories"
              className="mt-4 inline-flex w-fit items-center rounded-full bg-navy-950 px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-navy-900"
            >
              Check Categories
            </Link>
          </div>

          {/* Big center image card with overlay headline */}
          <div className="relative col-span-2 min-h-[280px] overflow-hidden rounded-2xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage2} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-white">
                  Nicks Recruitment
                </span>
                <Link
                  href="/apply-now"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                >
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl"
                >
                  One route,{" "}
                  <span className="font-display italic text-gold-400">
                    fully accompanied
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-2 max-w-sm text-xs text-sand-100/80"
                >
                  We recruit, train, medically screen and place workers with
                  verified employers across the UAE, Qatar, Oman, Saudi Arabia
                  and Kuwait — no hidden charges, at any stage.
                   we are located in Twiga Towers, Murang'a Road, Nairobi, Kenya
                </motion.p>
              </div>
            </div>
          </div>

          {/* Services list card */}
          <div className="col-span-2 flex flex-col rounded-2xl border border-navy-900/10 bg-white p-5 shadow-sm sm:col-span-1">
            <p className="font-display text-sm font-semibold text-navy-900">
              What We Offer
            </p>
            <p className="mt-1 text-[11px] text-navy-700/60">
              End-to-end recruitment services.
            </p>
            <ul className="mt-3 space-y-2.5">
              {services.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-navy-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <Icon size={12} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* --- Row 3 --- */}

          {/* Video tile */}
          <div className="col-span-1 h-36 overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm sm:h-40">
            <video
              src={heroVideo}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Promises card */}
          <div className="col-span-1 flex h-36 flex-col justify-center gap-2 rounded-2xl border border-navy-900/10 bg-white p-4 shadow-sm sm:col-span-2 sm:h-40">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {[
                "Genuine job opportunities",
                "Support from start to finish",
                "Trusted by families across Kenya",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-navy-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA tile */}
          <Link
            href="/apply-now"
            className="col-span-2 flex h-36 flex-col items-start justify-center gap-2 rounded-2xl bg-gold-500 p-5 text-navy-950 shadow-sm transition hover:bg-gold-400 sm:col-span-1 sm:h-40"
          >
            <Briefcase size={20} />
            <p className="font-display text-sm font-semibold">Apply for Jobs</p>
            <p className="text-[11px] text-navy-900/70">Start your registration today</p>
          </Link>

        </div>
      </div>
    </section>
  );
}

/* =======================================================================
   PHOTO 2 SECTION — untouched, exactly as it already was.
======================================================================= */

type MediaItem = { type: "image" | "video"; src: string; alt?: string };

// Only .jpg / .png / video sources — no .jfif anywhere.
const kuwaitMedia: MediaItem[] = [
  { type: "image", src: "/images/kuuwait.png", alt: "Kuwait skyline" },
  { type: "image", src: "/images/thekuwait.png", alt: "Kuwait city" },
  { type: "video", src: "/videos/VID-20260730-WA0060.mp4" },
];

const qatarMedia: MediaItem[] = [
  { type: "image", src: "/images/dohadoha.png", alt: "Doha" },
  { type: "image", src: "/images/dohaqatar.png", alt: "Doha, Qatar" },
  { type: "image", src: "/images/qaatar.png", alt: "Qatar" },
  { type: "image", src: "/images/qatar.png", alt: "Qatar skyline" },
];

const uaeMedia: MediaItem[] = [
  { type: "image", src: "/images/uae.png", alt: "UAE" },
  // Add more .jpg/.png UAE/Dubai photos here when you have them —
  // the .jfif files that used to fill this out have been removed.
];

const candidatesMedia: MediaItem[] = [
  { type: "image", src: "/images/IMG-20260730-WA0045.jpg", alt: "Departure send-off" },
  { type: "image", src: "/images/IMG-20260730-WA0047.jpg", alt: "At the airport" },
  { type: "image", src: "/images/IMG-20260730-WA0064.jpg", alt: "Candidates group photo" },
  { type: "image", src: "/images/IMG-20260730-WA0074.jpg", alt: "Orientation day" },
  { type: "image", src: "/images/IMG-20260730-WA0083.jpg", alt: "Ready for departure" },
  { type: "video", src: "/videos/VID-20260730-WA0050.mp4" },
  { type: "video", src: "/videos/VID-20260730-WA0084.mp4" },
];

function MediaCarousel({
  items,
  label,
}: {
  items: MediaItem[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const current = items[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="group relative aspect-[4/3] overflow-hidden">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-900 shadow-sm backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>

        {total > 1 && (
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm backdrop-blur transition hover:bg-gold-500 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm backdrop-blur transition hover:bg-gold-500 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.src}
            src={current.src}
            alt={current.alt ?? label}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-gold-500" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-semibold text-navy-900">{label}</p>
      </div>
    </div>
  );
}

const promises = [
  "Genuine job opportunities",
  "Support from start to finish",
  "Trusted by families across Kenya",
];

function MediaShowcase() {
  return (
    <section className="relative bg-gray-50 pt-28 pb-20 md:pt-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              Our Journey, Your Next Chapter
            </span>
            <h2 className="font-display text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
              More than a recruitment agency
            </h2>
            <p className="mt-4 max-w-md text-gray-600">
              We believe every hardworking person deserves a real
              opportunity. That&apos;s why we focus on genuine jobs, honest
              advice and full support — from the day you apply until you
              settle into your new workplace. We&apos;re here because your
              future matters. Every journey starts with hope, and a better
              future starts with one simple step. We are located  in
              Twiga Towers, Murang'a Road, Nairobi, Kenya
            </p>

            <ul className="mt-6 space-y-3">
              {promises.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] overflow-hidden">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-900 shadow-sm backdrop-blur">
                01
              </span>
              <HeroGlobe variant="card" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MediaCarousel label="Life in Kuwait" items={kuwaitMedia} />
          <MediaCarousel label="Welcome to Qatar" items={qatarMedia} />
          <MediaCarousel label="Working in Dubai" items={uaeMedia} />
          <MediaCarousel label="Success Stories" items={candidatesMedia} />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <BentoHero />
      <MediaShowcase />
    </>
  );
}
