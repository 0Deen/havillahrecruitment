import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/site';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'Havillah Recruitment Agency | Connecting Dreams to New Opportunities', template: '%s | Havillah Recruitment Agency' },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: 'website', locale: 'en_KE', siteName: siteConfig.name },
  robots: { index: true, follow: true },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en-KE"><body>{children}<FloatingWhatsApp /></body></html>; }
