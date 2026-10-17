"use client";

// Top bar. Mobile: compact app bar (logo, search, menu) — primary navigation
// is the notch tab bar at the bottom. Desktop: primary navigation is the
// glass sidebar, so this becomes a slim contact strip + search + Apply.
// (Previously a text-link navbar; every old destination is still reachable.)

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/app/Icon";
import { OPEN_MENU_EVENT, OPEN_SEARCH_EVENT } from "@/components/app/AppShell";
import { COMPANY } from "@/lib/site";
import { track } from "@/lib/analytics";

const open = (name: string) => () => window.dispatchEvent(new Event(name));

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* desktop contact strip */}
      <div className="hidden w-full bg-brand-purple lg:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-1.5 text-[12px] font-medium text-white/90">
          <div className="flex items-center gap-x-5">
            <a href={COMPANY.phoneHref} onClick={() => track("phone_clicked", { source: "topbar" })} className="flex items-center gap-1.5 transition hover:text-brand-orange">
              <Icon name="phone" className="h-3.5 w-3.5" /> {COMPANY.phoneDisplay}
            </a>
            <a href={`mailto:${COMPANY.primaryEmail}`} onClick={() => track("email_clicked", { source: "topbar" })} className="flex items-center gap-1.5 transition hover:text-brand-orange">
              <Icon name="mail" className="h-3.5 w-3.5" /> {COMPANY.primaryEmail}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="pin" className="h-3.5 w-3.5" /> {COMPANY.addressShort}
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="mx-3 mt-2 rounded-[22px] border border-white/60 bg-white/80 px-3 py-2 shadow-glass backdrop-blur-xl sm:mx-6 lg:mx-0 lg:mt-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 lg:hidden" aria-label="Ajira Majuu home">
            <span className="relative block h-10 w-10 flex-none overflow-hidden rounded-full ring-2 ring-white">
              <Image src="/logo.png" alt="" fill sizes="40px" className="object-cover" priority />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block font-display text-[16px] font-bold text-brand-purple">Ajira Majuu</span>
              <span className="block truncate text-[10px] font-medium text-slate-500">Private overseas recruitment agency</span>
            </span>
          </Link>

          {/* desktop: search pill */}
          <button
            type="button"
            onClick={open(OPEN_SEARCH_EVENT)}
            className="hidden h-11 flex-1 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 text-left text-sm text-slate-400 transition hover:border-brand-purple/40 lg:flex lg:max-w-md"
          >
            <Icon name="search" className="h-4 w-4" />
            <span className="flex-1">Search jobs, countries, guides…</span>
            <kbd className="rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">Ctrl K</kbd>
          </button>

          <div className="flex items-center gap-1.5">
            <button type="button" onClick={open(OPEN_SEARCH_EVENT)} aria-label="Search" className="flex h-11 w-11 items-center justify-center rounded-full text-brand-purple active:bg-brand-purple/10 lg:hidden">
              <Icon name="search" />
            </button>
            <Link href="/apply" onClick={() => track("apply_clicked", { source: "topbar" })} className="btn-primary hidden !py-2.5 lg:inline-flex">
              Apply Now
            </Link>
            <button type="button" onClick={open(OPEN_MENU_EVENT)} aria-label="Open menu" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-purple text-white lg:hidden">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
