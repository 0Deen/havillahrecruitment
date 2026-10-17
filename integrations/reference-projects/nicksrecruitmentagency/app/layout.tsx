import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";

import { SEO } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.company.url),

  title: {
    default:
      "Nicks Recruitment Agency | Jobs Abroad, Recruitment Agency Kenya & Overseas Employment",
    template: "%s | Nicks Recruitment Agency",
  },

  description:
    "Nicks Recruitment Agency is a licensed recruitment agency in Kenya connecting job seekers with employers locally and internationally. We specialize in overseas jobs, Gulf jobs, healthcare recruitment, hospitality, construction, engineering, domestic workers, visa processing, pre-departure training and medical screening.We are located in Twiga Towers, Murang'a Road, Nairobi, Kenya",

  applicationName: SEO.company.name,

  authors: [
    {
      name: SEO.company.name,
      url: SEO.company.url,
    },
  ],

  creator: SEO.company.name,

  publisher: SEO.company.name,

  keywords: SEO.keywords,

  alternates: {
    canonical: SEO.company.url,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "PAJ4bA5V-D68dLwT3K3E0oZ3urxW65a9uk7yClSxvL8",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SEO.company.url,
    siteName: SEO.company.name,

    title:
      "Nicks Recruitment Agency | Jobs Abroad, Recruitment Agency Kenya",

    description:
      "Licensed recruitment agency in Kenya connecting job seekers with employers locally and internationally.",

    images: [
      {
        url: SEO.company.logo,
        width: 1200,
        height: 630,
        alt: SEO.company.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SEO.company.name,

    description:
      "Licensed recruitment agency in Kenya connecting job seekers with employers locally and internationally.",

    images: [SEO.company.logo],
  },

  category: "Business",

  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Anti-flash: set the theme class before first paint, based on a
            saved preference or the OS setting. Runs synchronously and
            never touches anything user-supplied. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nra-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-yellow-400 focus:text-black focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main-content">
          {children}
        </main>

        <SiteFooter />

        <WhatsAppButton />
        <Chatbot />
      </body>
    </html>
  );
}
