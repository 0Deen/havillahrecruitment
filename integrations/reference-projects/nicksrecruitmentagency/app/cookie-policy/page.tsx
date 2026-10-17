import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Nicks Recruitment Agency uses cookies and similar technologies on this website.",
};

const page = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  eyebrow: "Legal",
  intro:
    "This page explains what cookies are, and how and why we use them on this website.",
  sections: [
    {
      heading: "What cookies do",
      body: "Cookies are small text files stored on your device that help a website remember your preferences — such as your chosen theme (light or dark mode) — between visits.",
    },
    {
      heading: "Essential cookies",
      body: "Some cookies are required for the site to function correctly, such as keeping your chatbot session active while you browse.",
    },
    {
      heading: "Analytics",
      body: "We may use privacy-conscious analytics to understand which pages are useful to visitors, so we can improve the site. This does not identify you personally.",
    },
    {
      heading: "Managing cookies",
      body: "Most browsers let you clear or block cookies in their settings. Blocking essential cookies may affect features like theme preference or chat continuity.",
    },
  ],
};

export default function CookiePolicyPage() {
  return <PageTemplate page={page} />;
}
