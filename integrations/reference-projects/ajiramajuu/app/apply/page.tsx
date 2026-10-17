import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply Now — No Account Needed",
  description:
    "Apply for an overseas job opportunity with Ajira Majuu, a private overseas recruitment agency in Kenya. No account or password — submit your details and our recruitment team will follow up.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />
      <section className="mx-auto w-full max-w-2xl px-4 pb-10 pt-6 sm:pt-10">
        <div className="mb-5 text-center">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">No account needed</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-brand-purple sm:text-4xl">Apply now</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            See job, understand job, apply. You get a reference number straight away and our team follows up by phone or WhatsApp. Submitting does not guarantee employment.
          </p>
        </div>
        <Suspense fallback={<div className="rounded-3xl bg-white p-8 text-center text-sm text-slate-500 shadow-glass">Loading form…</div>}>
          <ApplyForm />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
