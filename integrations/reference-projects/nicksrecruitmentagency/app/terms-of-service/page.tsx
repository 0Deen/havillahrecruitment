import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the Nicks Recruitment Agency website and our recruitment services.",
};

const page = {
  slug: "terms-of-service",
  title: "Terms of Service",
  eyebrow: "Legal",
  intro:
    "These terms govern your use of this website and, where applicable, our recruitment, training and medical screening services.",
  sections: [
    {
      heading: "Using this website",
      body: "This website is provided for candidates and employers to learn about our services, browse job listings, and submit enquiries. Content is for general information and does not constitute a binding job offer until a formal contract is signed.",
    },
    {
      heading: "No placement fee",
      body: "We do not charge candidates a placement fee for employer-sponsored roles. Any legitimate government or visa-related cost is disclosed to you in writing before you commit to anything.",
    },
    {
      heading: "Accuracy of information you provide",
      body: "You're responsible for the accuracy of the personal, educational and work-history information you submit to us — this information is used to match you with employer partners.",
    },
    {
      heading: "Changes to these terms",
      body: "We may update these terms from time to time to reflect changes in our services or legal requirements. Continued use of the site after an update constitutes acceptance of the revised terms.",
    },
    {
      heading: "Contact",
      body: "Questions about these terms can be directed to our office at Twiga Towers, Murang'a Road, Nairobi, or by phone/WhatsApp on +254 746 030 545.",
    },
  ],
};

export default function TermsOfServicePage() {
  return <PageTemplate page={page} />;
}
