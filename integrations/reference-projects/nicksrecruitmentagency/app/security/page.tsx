import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "Security & Trust",
  description: "How Nicks Recruitment Agency protects candidate and employer data, and how to report a concern.",
};

const page = {
  slug: "security",
  title: "Security & Trust",
  eyebrow: "Legal",
  intro:
    "How we handle the personal and document data candidates and employers share with us.",
  sections: [
    {
      heading: "What we collect",
      body: "We collect the personal, educational, and work-history information needed to match you with employer partners — never more than the recruitment process requires.",
    },
    {
      heading: "Who sees your data",
      body: "Your documents are shared only with your prospective employer and the relevant government authorities involved in visa processing — never sold or shared for marketing purposes.",
    },
    {
      heading: "No placement fee, ever",
      body: "We never ask a candidate to pay a fee for an employer-sponsored role. If anyone claiming to represent us asks you for payment, contact our office directly to verify.",
    },
    {
      heading: "Reporting a concern",
      body: "If you believe your information has been misused, or you're contacted by someone falsely claiming to represent this agency, call or WhatsApp us on +254 746 030 545.",
    },
  ],
};

export default function SecurityPage() {
  return <PageTemplate page={page} />;
}
