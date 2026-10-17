import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Our commitment to making this website usable for people of all abilities.",
};

const page = {
  slug: "accessibility-statement",
  title: "Accessibility Statement",
  eyebrow: "Legal",
  intro:
    "We want every candidate and employer to be able to use this website, regardless of ability.",
  sections: [
    {
      heading: "Our approach",
      body: "We aim to follow established accessibility practices: visible keyboard focus states, sufficient colour contrast in both light and dark mode, and semantic page structure for screen readers.",
    },
    {
      heading: "Keyboard navigation",
      body: "Every interactive element on this site — navigation, search, forms, and the chat assistant — is reachable and operable using a keyboard alone.",
    },
    {
      heading: "Ongoing work",
      body: "Accessibility is an ongoing effort. If you encounter a barrier using this site, please tell us — we treat it as a priority fix.",
    },
    {
      heading: "Let us know",
      body: "Reach us by phone/WhatsApp on +254 746 030 545, or via the Contact page, and describe the issue and the device/browser you were using.",
    },
  ],
};

export default function AccessibilityStatementPage() {
  return <PageTemplate page={page} />;
}
