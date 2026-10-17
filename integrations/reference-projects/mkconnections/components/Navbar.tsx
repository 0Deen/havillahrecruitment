"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleHelp,
  ClipboardCheck,
  Globe,
  Home,
  Images,
  Info,
  MapPinned,
  Phone,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/*
|--------------------------------------------------------------------------
| NAVIGATION
|--------------------------------------------------------------------------
| Same links as before (primary + "Explore" group) — now laid out like the
| dashboard reference: a rounded indigo sidebar, white active pill, search
| bar + date on top. Below the `lg` breakpoint the sidebar is replaced by a
| slim top bar and the floating pill tab bar (see MobileTabBar.tsx).
|--------------------------------------------------------------------------
*/

export const primaryNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/destinations", label: "Destinations", icon: MapPinned },
  { href: "/how-it-works", label: "How it works", icon: Info },
  { href: "/safety", label: "Safety", icon: ShieldCheck },
  { href: "/for-employers", label: "For employers", icon: Building2 },
];

export const exploreNav = [
  { href: "/about", label: "About us", icon: Users },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/success-stories", label: "Success stories", icon: Award },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/faqs", label: "FAQs", icon: CircleHelp },
  { href: "/responsibilities", label: "Responsibilities", icon: ClipboardCheck },
  { href: "/careers", label: "Careers", icon: Rocket },
  { href: "/contact", label: "Contact", icon: Phone },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

function SideLink({ href, label, Icon, active }: { href: string; label: string; Icon: typeof Home; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center gap-3 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors ${
        active ? "text-[#2f2aa5]" : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-full bg-white shadow-[0_8px_20px_rgba(10,8,70,0.28)]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <Icon size={16} className="relative z-10 shrink-0" />
      <span className="relative z-10 truncate">{label}</span>
    </Link>
  );
}

export function Navbar() {
  const { setShowSwitcher } = useLanguage();
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [today, setToday] = useState("");

  // Date is filled in after mount so server + client markup always match.
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs");
  };

  return (
    <>
      {/* DESKTOP SIDEBAR (dashboard reference, image 1) */}
      <aside
        aria-label="Main navigation"
        className="fixed bottom-4 left-4 top-4 z-[70] hidden w-[236px] flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#3a33c4] via-[#2f2aa5] to-[#241f87] text-white shadow-[0_30px_70px_rgba(36,31,135,0.35)] lg:flex"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

        <Link href="/" aria-label="MK Connection Limited home" className="relative mx-auto mt-6 block rounded-3xl bg-white p-2.5 shadow-[0_12px_30px_rgba(10,8,70,0.3)]">
          <Image src="/mk/logo-blue.jpeg" alt="MK Connection Limited" width={176} height={72} priority className="h-12 w-[150px] object-contain" />
        </Link>

        <nav className="relative mt-7 flex-1 space-y-1 overflow-y-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {primaryNav.map(({ href, label, icon: Icon }) => (
            <SideLink key={href} href={href} label={label} Icon={Icon} active={isActive(pathname, href)} />
          ))}

          <p className="px-4 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Explore</p>

          {exploreNav.map(({ href, label, icon: Icon }) => (
            <SideLink key={href} href={href} label={label} Icon={Icon} active={isActive(pathname, href)} />
          ))}
        </nav>

        {/* bottom slot (where the reference has "Logout") */}
        <div className="relative space-y-2 border-t border-white/10 p-3">
          <button
            onClick={() => setShowSwitcher(true)}
            className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <Globe size={16} /> Language
          </button>
          <Link
            href="/apply"
            className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[13px] font-extrabold text-[#2f2aa5] shadow-[0_10px_24px_rgba(10,8,70,0.3)] transition hover:-translate-y-0.5"
          >
            <Send size={15} /> Start an application
          </Link>
        </div>
      </aside>

      {/* DESKTOP TOP BAR (search + date, like the reference) */}
      <header className="sticky top-0 z-[60] hidden bg-[#f3f2ff]/90 backdrop-blur-xl lg:block">
        <div className="flex h-[76px] items-center gap-5 px-8">
          <form onSubmit={onSearch} role="search" className="flex h-12 max-w-xl flex-1 items-center rounded-full bg-white px-5 shadow-[0_8px_24px_rgba(47,42,165,0.08)] ring-1 ring-[#2f2aa5]/5 focus-within:ring-2 focus-within:ring-[#2f2aa5]/30">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, e.g. driver, caregiver…"
              aria-label="Search jobs"
              className="h-full flex-1 bg-transparent text-sm text-[#10233f] outline-none placeholder:text-slate-400"
            />
            <button type="submit" aria-label="Search" className="text-slate-500 transition hover:text-[#2f2aa5]">
              <Search size={18} />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-4">
            {today && (
              <span className="hidden items-center gap-2 text-xs text-slate-500 xl:inline-flex">
                <CalendarDays size={14} className="text-[#2f2aa5]" /> {today}
              </span>
            )}
            <Link href="/contact" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#2f2aa5] shadow-[0_8px_24px_rgba(47,42,165,0.1)] transition hover:scale-105" aria-label="Contact us">
              <Phone size={17} />
            </Link>
            <Link href="/apply" className="rounded-full bg-[#2f2aa5] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(47,42,165,0.3)] transition hover:bg-[#25218a]">
              Start an application
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE / TABLET TOP BAR (nav lives in the floating tab bar) */}
      <header className="sticky top-0 z-[70] border-b border-[#2f2aa5]/10 bg-white/90 backdrop-blur-xl lg:hidden">
        <div className="container-content flex h-[64px] items-center justify-between gap-3">
          <Link href="/" className="shrink-0" aria-label="MK Connection Limited home">
            <Image src="/mk/logo-blue.jpeg" alt="MK Connection Limited" width={176} height={72} className="h-11 w-[124px] object-contain object-left sm:w-[140px]" priority />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/jobs" aria-label="Search jobs" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f2ff] text-[#2f2aa5]">
              <Search size={17} />
            </Link>
            <button onClick={() => setShowSwitcher(true)} aria-label="Change language" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f2ff] text-[#2f2aa5]">
              <Globe size={17} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
