"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SearchPalette from "@/components/SearchPalette";
import ThemeToggle from "@/components/ThemeToggle";
import { resourcePages } from "@/lib/page-content";

const RESOURCE_NAV_ITEMS: [string, string][] = [
  ["All Guides", "/resources"],
  ...resourcePages.slice(0, 6).map((r) => [r.title, `/resources/${r.slug}`] as [string, string]),
];

const nav = [
  {
    label: "About",
    items: [
      ["Our Story", "/about/story"],
      ["Mission & Vision", "/about/mission-vision"],
      ["CEO Message", "/about/ceo-message"],
      ["Why Choose Us", "/about/why-choose-us"],
      ["Company Timeline", "/about/timeline"],
      ["Licenses", "/about/licenses"],
      ["Certifications", "/about/certifications"],
      ["Partners", "/about/partners"],
    ],
  },
  {
    label: "Services",
    items: [
      ["Overseas Recruitment", "/services/overseas-recruitment"],
      ["Executive Recruitment", "/services/executive-recruitment"],
      ["Domestic Recruitment", "/services/domestic-recruitment"],
      ["Temporary Staffing", "/services/temporary-staffing"],
      ["Permanent Staffing", "/services/permanent-staffing"],
      ["Talent Outsourcing", "/services/talent-outsourcing"],
      ["HR Consultancy", "/services/hr-consultancy"],
      ["Visa Processing", "/services/visa-processing"],
      ["Airport Assistance", "/services/airport-assistance"],
    ],
  },
  {
    label: "Jobs",
    items: [
      ["All Jobs", "/jobs"],
      ["Jobs in UAE", "/countries/uae"],
      ["Jobs in Qatar", "/countries/qatar"],
      ["Jobs in Saudi Arabia", "/countries/saudi-arabia"],
      ["Jobs by Category", "/job-categories"],
      ["Urgent Hiring", "/jobs?urgent=true"],
      ["Featured Jobs", "/jobs?featured=true"],
    ],
  },
  {
    label: "Training School",
    items: [
      ["About Training Centre", "/training-school"],
      ["Available Courses", "/training-school/courses"],
      ["Equipment & Facilities", "/training-school/equipment"],
      ["Book Training", "/book-training"],
    ],
  },
  {
    label: "Medical Lab",
    items: [
      ["About the Lab", "/medical-laboratory"],
      ["Required Gulf Medicals", "/medical-laboratory/required-tests"],
      ["Book Medical", "/book-medical"],
      ["FAQs", "/medical-laboratory/faqs"],
    ],
  },
  {
    label: "For Employers",
    items: [
      ["Hire Workers", "/employers/hire-workers"],
      ["Recruitment Process", "/employers/recruitment-process"],
      ["Industries Served", "/employers/industries-served"],
      ["Request Staff", "/employers/request-staff"],
    ],
  },
  {
    label: "Resources",
    items: RESOURCE_NAV_ITEMS,
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-800/10 bg-sand-50/95 backdrop-blur">
      <div className="bg-navy-900 text-sand-100 text-xs">
        <div className="container-page flex items-center justify-between py-1.5">
          <span className="flex items-center gap-1.5">
            <Phone size={12} /> 24/7 Support · +254746030545
          </span>
          <div className="hidden gap-4 md:flex">
            <Link href="/track-application" className="hover:text-gold-400">Track Application</Link>
            <Link href="/resources" className="hover:text-gold-400">Resources</Link>
            <Link href="/contact" className="hover:text-gold-400">Contact</Link>
          </div>
        </div>
      </div>


      <div className="container-page flex items-center justify-between py-4">





     <Link
  href="/"
  className="flex items-center gap-3 shrink-0"
>
  <Image
    src="/logo.jpg"
    alt="Nicks Recruitment Agency"
    width={58}
    height={58}
    priority
    className="object-contain rounded-md"
  />

  <div className="leading-tight">
    <h1 className="font-display text-xl font-bold tracking-tight text-navy-900">
      Nicks
    </h1>

    <p className="font-display text-lg font-semibold text-gold-500">
      Recruitment
    </p>
  </div>
</Link>

        <nav
  className="hidden items-center gap-1 lg:flex"
  onMouseLeave={() => setOpen(null)}
>
          {nav.map((section) => (
            <div key={section.label} className="relative" onMouseEnter={() => setOpen(section.label === open ? open : (setOpen(section.label as any), section.label))}>
              <button
                onClick={() => setOpen(open === section.label ? null : section.label)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-gold-600"
              >
                {section.label} <ChevronDown size={14} />
              </button>
              {open === section.label && (
                <div className="absolute left-0 top-full w-64 rounded-lg border border-navy-900/10 bg-white p-2 shadow-xl">
                  {section.items.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block rounded-md px-3 py-2 text-sm text-navy-800 hover:bg-sand-100 hover:text-gold-600"
                      onClick={() => setOpen(null)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/blog" className="px-3 py-2 text-sm font-medium hover:text-gold-600">Blog</Link>
          <Link href="/contact" className="px-3 py-2 text-sm font-medium hover:text-gold-600">Contact</Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SearchPalette />
          <ThemeToggle />
          <Link
            href="/apply-now"
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-400"
          >
            Apply Now
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <SearchPalette />
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

      {mobileOpen && (
        <div className="border-t border-navy-900/10 bg-white p-4 lg:hidden">
          {nav.map((section) => (
            <details key={section.label} className="border-b border-navy-900/5 py-2">
              <summary className="cursor-pointer py-1 text-sm font-semibold">{section.label}</summary>
              <div className="mt-1 flex flex-col gap-1 pl-3">
                {section.items.map(([label, href]) => (
                  <Link key={href} href={href} className="py-1 text-sm text-navy-700">
                    {label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="/apply-now" className="mt-3 block rounded-full bg-gold-500 px-5 py-2.5 text-center text-sm font-semibold text-navy-900">
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}
