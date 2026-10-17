import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crumbs, PageHero } from "@/components/app/Cards";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Ajira Majuu handles applicant and enquiry information.", alternates: { canonical: "/privacy-policy" } };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <article className="mx-auto w-full max-w-2xl space-y-3 px-4 py-6 text-[15px] leading-relaxed text-slate-700 sm:px-6">
        <p className="rounded-2xl border border-brand-orange/50 bg-brand-orange/10 p-4 text-sm"><strong>Draft for legal review.</strong> This summary describes what the website does today. Have it reviewed against Kenya’s Data Protection Act before relying on it.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">What we collect</h2>
        <p>Details you submit through the application, contact and employer forms (such as name, phone, email, location, work history, passport status and any documents you choose to upload), and your chat messages if you contact our assistant.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">How we use it</h2>
        <p>To process your application, contact you, and respond to enquiries. Applications and documents are emailed to the {COMPANY.name} recruitment team. If you provide an email address, we send you a confirmation.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">Sharing</h2>
        <p>Your details are used by {COMPANY.name} to run the recruitment process and may be shared with employers or other parties involved in a specific opportunity as that process requires. [Business to confirm exact sharing and retention terms.]</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">Your choices</h2>
        <p>Applying needs no account. You may ask us to correct or delete your information by contacting <a className="font-semibold text-brand-purple underline" href={`mailto:${COMPANY.primaryEmail}`}>{COMPANY.primaryEmail}</a>.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">Browser storage</h2>
        <p>Your in-progress application draft and chat history are kept in your browser tab only and are cleared when you close it. Draft storage excludes your passport number and uploaded files.</p>
        <h2 className="font-display text-xl font-bold text-brand-purple">Contact</h2>
        <p>{COMPANY.name}, {COMPANY.address}. {COMPANY.phoneDisplay}.</p>
      </article>
      <Footer />
    </main>
  );
}
