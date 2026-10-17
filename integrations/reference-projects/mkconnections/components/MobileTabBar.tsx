"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Briefcase, MapPinned, Send, LayoutGrid, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { exploreNav, primaryNav } from "@/components/Navbar";

/*
|--------------------------------------------------------------------------
| MOBILE FLOATING PILL TAB BAR  (reference: image 2)
|--------------------------------------------------------------------------
| White rounded pill, thin line icons, active item = solid indigo circle
| that glides between tabs. "More" opens a sheet that contains EVERY link
| from the desktop sidebar, so nothing is lost on phones.
|--------------------------------------------------------------------------
*/

const tabs = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/jobs", label: "Jobs", Icon: Briefcase },
  { href: "/destinations", label: "Destinations", Icon: MapPinned },
  { href: "/#apply", label: "Apply", Icon: Send },
];

// Everything not already a tab, plus the tab destinations' siblings.
const tabHrefs = new Set(tabs.map((t) => t.href.split("#")[0]));
const moreLinks = [...primaryNav, ...exploreNav].filter((l) => !tabHrefs.has(l.href));

export function MobileTabBar() {
  const pathname = usePathname() ?? "/";
  const { setShowSwitcher } = useLanguage();
  const [open, setOpen] = useState(false);

  // close the sheet whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  const isTabActive = (href: string) => {
    if (href.includes("#")) return false; // Apply is an action, not a page
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };
  const moreActive = open || moreLinks.some((l) => pathname.startsWith(l.href));
  const activeKey = open ? "more" : tabs.find((t) => isTabActive(t.href))?.href ?? (moreActive ? "more" : "");

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#10113a]/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-x-4 bottom-[104px] max-h-[70vh] overflow-y-auto rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_rgba(30,27,120,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f2aa5]">Explore MK Connection</p>
                  <p className="mt-1 text-sm text-slate-500">Everything is available here — no account needed.</p>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f2ff] text-[#2f2aa5]">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {moreLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${
                      pathname.startsWith(href) ? "bg-[#2f2aa5] text-white" : "bg-[#f3f2ff] text-slate-700 hover:bg-[#e8e6ff]"
                    }`}
                  >
                    <Icon size={17} className={pathname.startsWith(href) ? "text-white" : "text-[#2f2aa5]"} /> {label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowSwitcher(true);
                  }}
                  className="flex items-center gap-3 rounded-2xl bg-[#f3f2ff] px-3.5 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-[#e8e6ff]"
                >
                  <Globe size={17} className="text-[#2f2aa5]" /> Language
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav aria-label="Mobile quick navigation" className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-[420px] lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <ul className="flex items-center justify-between rounded-full bg-white/95 px-3 py-2.5 shadow-[0_18px_44px_rgba(30,27,120,0.28)] ring-1 ring-[#2f2aa5]/10 backdrop-blur-xl">
          {tabs.map(({ href, label, Icon }) => {
            const active = activeKey === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="relative grid h-12 w-12 place-items-center rounded-full"
                >
                  {active && (
                    <motion.span layoutId="tab-active" className="absolute inset-0 rounded-full bg-[#2f2aa5] shadow-[0_8px_18px_rgba(47,42,165,0.45)]" transition={{ type: "spring", stiffness: 450, damping: 32 }} />
                  )}
                  <Icon size={21} strokeWidth={1.8} className={`relative z-10 transition-colors ${active ? "text-white" : "text-slate-800"}`} />
                  <span className="sr-only">{label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="More"
              aria-expanded={open}
              className="relative grid h-12 w-12 place-items-center rounded-full"
            >
              {activeKey === "more" && (
                <motion.span layoutId="tab-active" className="absolute inset-0 rounded-full bg-[#2f2aa5] shadow-[0_8px_18px_rgba(47,42,165,0.45)]" transition={{ type: "spring", stiffness: 450, damping: 32 }} />
              )}
              <LayoutGrid size={21} strokeWidth={1.8} className={`relative z-10 transition-colors ${activeKey === "more" ? "text-white" : "text-slate-800"}`} />
              <span className="sr-only">More</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
