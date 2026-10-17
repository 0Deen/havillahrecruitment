"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Structure copied directly from the reference: a numbered circle, a stem
// down to a colored pill label, a short line of body copy, and a shared
// dashed baseline underneath with a dot in each stage's color. Only the
// copy and the palette are ours — the layout logic is the same.
const stops = [
  {
    title: "Registration",
    body: "We verify your ID and paperwork first.",
    color: "#C9A227", // gold
  },
  {
    title: "Interview",
    body: "Matched to the right role and employer.",
    color: "#2F6F6B", // teal
  },
  {
    title: "Training",
    body: "Prepared by in-house certified instructors.",
    color: "#A8452E", // rust
  },
  {
    title: "Medical test",
    body: "On-site screening, accepted the first time.",
    color: "#7C3F58", // plum
  },
  {
    title: "Visa processing",
    body: "Every document and status visible to you.",
    color: "#1B2A4A", // navy
  },
  {
    title: "Departure",
    body: "Booked, briefed, and accompanied to the gate.",
    color: "#C2703D", // terracotta
  },
  {
    title: "Arrival",
    body: "Met on landing, handed to your employer.",
    color: "#4C7A3D", // olive
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".route-stop", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
      gsap.from(".route-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-sand-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">The route</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
            Recruitment process, start to arrival
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80">
            Seven stops, one file, no detours. Here&rsquo;s exactly what happens between signing up
            and being met at arrivals.
          </p>
        </div>

        {/* --- stage row: badge, pill, copy --- */}
        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-4 lg:grid-cols-7">
          {stops.map((stop, i) => (
            <div key={stop.title} className="route-stop flex flex-col items-center text-center">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-sm"
                style={{ backgroundColor: stop.color }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="h-5 w-px" style={{ backgroundColor: stop.color }} />
              <div
                className="rounded-full border-2 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide"
                style={{ borderColor: stop.color, color: stop.color }}
              >
                {stop.title}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-navy-700/70">{stop.body}</p>
            </div>
          ))}
        </div>

        {/* --- dashed baseline with matching dots, like the reference --- */}
        <div className="relative mt-10 hidden items-center lg:flex">
          <span className="h-2 w-2 shrink-0 rounded-full bg-navy-900/20" />
          <div className="route-line relative mx-2 h-0 flex-1 border-t-2 border-dashed border-navy-900/20">
            <div className="absolute inset-x-0 -top-[5px] flex justify-between">
              {stops.map((stop) => (
                <span
                  key={stop.title}
                  className="h-[10px] w-[10px] rounded-full ring-4 ring-sand-50"
                  style={{ backgroundColor: stop.color }}
                />
              ))}
            </div>
          </div>
          <ArrowRight size={16} className="shrink-0 text-navy-900/40" />
        </div>
      </div>
    </section>
  );
}
