import type { Metadata } from "next";
import "./globals.css";

import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { LanguagePopup } from "@/components/LanguagePopup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { FloatingActions } from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "MK Connection Limited — Connecting talents to international opportunities",

  description:
    "MK Connection Limited helps Kenyans access safe and genuine international opportunities across Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/mk/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <LanguageProvider>
          <LanguagePopup />

          <div className="lg:pl-[260px]">
            <Navbar />
            <main className="pb-28 lg:pb-0">{children}</main>
            <Footer />
          </div>

          <MobileTabBar />
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}
