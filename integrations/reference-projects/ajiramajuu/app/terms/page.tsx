import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions", description: "Terms for using the Ajira Majuu website.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <PageHero eyebrow="Legal" title="Terms & conditions" />
      <article className="mx-auto w-full max-w-2xl space-y-3 px-4 py-6 text-[15px] leading-relaxed text-slate-700 sm:px-6">
        <p className="rounded-2xl border border-brand-orange/50 bg-brand-orange/10 p-4 text-sm"><strong>Draft for legal review.</strong> Have these terms reviewed by a qualified lawyer before relying on them.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">About {COMPANY.name}</h2>
        <p>{COMPANY.name} is a {COMPANY.legalDescriptor.toLowerCase()}. It is not a government agency.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">No guarantee</h2>
        <p>Submitting an application does not guarantee employment, a visa or travel. Job listings, salaries and conditions depend on verified employers and may change; your signed employment contract governs your final terms.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">Accuracy of your information</h2>
        <p>You confirm the information you provide is accurate to the best of your knowledge.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">AI assistant</h2>
        <p>The assistant answers from {COMPANY.name}’s records and may be unable to answer everything. It does not give legal or medical advice and cannot see application records. Confirm important details with our team.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">Fees and payments</h2>
        <p>[Business to state its official fee and payment policy here.] Do not pay any individual claiming to represent {COMPANY.name}; verify through our official channels first.</p>
        <p>Contact: <a className="font-semibold text-brand-purple underline" href={`mailto:${COMPANY.primaryEmail}`}>{COMPANY.primaryEmail}</a></p>
      </article>
      <Footer />
    </main>
  );
}
