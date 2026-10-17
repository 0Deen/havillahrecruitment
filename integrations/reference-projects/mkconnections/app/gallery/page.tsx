import type { Metadata } from "next";
import { GalleryShowcase } from "@/components/GalleryShowcase";

export const metadata: Metadata = {
  title: "Gallery — MK Connection Limited",
  description:
    "A visual tour of the overseas job categories and destinations offered through MK Connection Limited.",
};

export default function GalleryPage() {
  return (
    <div className="container-content py-14 md:py-20">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-deep">Gallery</p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">Our Global Job Opportunities</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate">
          Explore the overseas job categories and destinations offered through MK Connection
          Agency — from home care in Saudi Arabia to hospitality in Bahrain. Tap any photo to see more.
        </p>
      </div>
      <GalleryShowcase />
    </div>
  );
}
