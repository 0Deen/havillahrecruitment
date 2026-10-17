"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, Headphones, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/Hero";
import { QuickStartPanel } from "@/components/QuickStartPanel";
import { StatsBar } from "@/components/StatsBar";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { WhyUs } from "@/components/WhyUs";
import { JourneySteps } from "@/components/JourneySteps";
import { DestinationHighlights } from "@/components/DestinationHighlights";
import { JobVisualGrid } from "@/components/JobVisualGrid";
import { LatestOpenings } from "@/components/LatestOpenings";
import { JourneyMosaic } from "@/components/JourneyMosaic";
import { DestinationMap } from "@/components/DestinationMap";
import { Categories } from "@/components/Categories";
import { GalleryPreview } from "@/components/GalleryPreview";
import { TrustSafety } from "@/components/TrustSafety";
import { EmployerSection } from "@/components/EmployerSection";
import { SuccessStories } from "@/components/SuccessStories";
import { ResourcesPreview } from "@/components/ResourcesPreview";
import { Newsletter } from "@/components/Newsletter";
import { QuickApplyModal } from "@/components/QuickApplyModal";
import { CountrySelector } from "@/components/jobs-by-country/CountrySelector";

const assurances = [
  [ShieldCheck, "Safety-first process", "Clear recruitment steps and scam-awareness guidance."],
  [FileCheck2, "Document guidance", "Know what to prepare before an employer or travel process moves forward."],
  [Headphones, "Human support", "Talk to the team when you need clarity — not a silent application form."],
  [CheckCircle2, "No login", "Browse, enquire and start an application without creating an account."],
] as const;

export default function HomePage() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div>
      <Hero />

      <section className="border-b border-blue-100 bg-white py-7">
        <div className="container-content grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map(([Icon, title, body]) => (
            <div key={title} className="flex gap-3 rounded-2xl border border-blue-100 bg-slate-50 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-100 text-[#0b4aa2]"><Icon size={17} /></span>
              <div><p className="text-sm font-extrabold text-[#10233f]">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{body}</p></div>
            </div>
          ))}
        </div>
      </section>

      <CountrySelector />

      <QuickStartPanel />
      <StatsBar />
      <FeaturedJobs />
      <LatestOpenings />
      <JobVisualGrid />
      <DestinationHighlights />
      <WhyUs />
      <JourneySteps />
      <JourneyMosaic />
      <DestinationMap />
      <Categories />
      <GalleryPreview />
      <TrustSafety />
      <EmployerSection />
      <SuccessStories />
      <ResourcesPreview />

      <section id="apply" className="scroll-mt-24 bg-[#073b82] py-16 text-white md:py-20">
        <div className="container-content grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Ready when you are</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">Tell MK Connection what kind of opportunity you are looking for.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">No account. No complicated dashboard. Start with your details and our team can guide the next step.</p>
          </div>
          <button onClick={() => setApplyOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#073b82] transition hover:bg-cyan-50">Start my application <ArrowRight size={17} /></button>
        </div>
      </section>

      <Newsletter />
      <QuickApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
