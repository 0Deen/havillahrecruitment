"use client";

// Desktop glass sidebar — the collapsible rail from the design reference:
// logo + collapse control, MENU section, active state, count badge, tooltip
// pill when collapsed, a "quick contact" card (the reference's Messages
// panel) with an action pill, and a company block pinned at the bottom.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";
import { COMPANY } from "@/lib/site";
import { getActiveJobs } from "@/data/jobs";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const MENU: { href: string; label: string; icon: IconName; badge?: number }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/jobs", label: "Jobs", icon: "briefcase", badge: getActiveJobs().length },
  { href: "/destinations", label: "Destinations", icon: "globe" },
  { href: "/apply", label: "Apply Now", icon: "send" },
  { href: "/how-it-works", label: "How It Works", icon: "route" },
  { href: "/assistant", label: "AI Assistant", icon: "sparkles" },
];

const EXPLORE: { href: string; label: string; icon: IconName }[] = [
  { href: "/about", label: "About", icon: "building" },
  { href: "/resources", label: "Resources", icon: "book" },
  { href: "/faq", label: "FAQ", icon: "help" },
  { href: "/recruitment-safety", label: "Recruitment Safety", icon: "shield" },
  { href: "/for-employers", label: "For Employers", icon: "users" },
  { href: "/contact", label: "Contact", icon: "phone" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname() || "/";

  const renderItem = ({ href, label, icon, badge }: { href: string; label: string; icon: IconName; badge?: number }) => {
    const active = isActive(pathname, href);
    return (
      <li key={href} className="group relative">
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13.5px] transition ${
            active ? "bg-white/80 font-semibold text-ink shadow-sm" : "font-medium text-slate-600 hover:bg-white/50 hover:text-ink"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-xl ${active ? "bg-brand-purple text-white" : "text-slate-500"}`}>
            <Icon name={icon} className="h-[18px] w-[18px]" />
          </span>
          {!collapsed && <span className="flex-1 truncate">{label}</span>}
          {!collapsed && badge ? (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-purple px-1.5 text-[11px] font-semibold text-white">{badge}</span>
          ) : null}
        </Link>
        {collapsed && (
          <span
            role="tooltip"
            className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand-purple px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {label}
          </span>
        )}
      </li>
    );
  };

  return (
    <aside
      aria-label="Site navigation"
      className="fixed bottom-4 left-4 top-4 z-40 hidden flex-col rounded-[28px] border border-white/70 bg-gradient-to-b from-white/70 via-[#EEE8FA]/60 to-[#E4DAF6]/60 shadow-[0_20px_60px_-15px_rgba(75,30,140,0.35)] backdrop-blur-2xl transition-[width] duration-300 lg:flex"
      style={{ width: "var(--sbw)" }}
    >
      {/* header */}
      <div className={`flex items-center gap-3 px-4 pb-3 pt-5 ${collapsed ? "flex-col" : "justify-between"}`}>
        <Link href="/" className="flex items-center gap-3" aria-label="Ajira Majuu home">
          <span className="relative block h-11 w-11 flex-none overflow-hidden rounded-full ring-2 ring-white">
            <Image src="/logo.png" alt="Ajira Majuu" fill sizes="44px" className="object-cover" priority />
          </span>
          {!collapsed && (
            <span className="leading-tight">
              <span className="block font-display text-[17px] font-bold text-brand-purple">Ajira Majuu</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Overseas recruitment</span>
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:text-brand-purple"
        >
          <Icon name={collapsed ? "right" : "left"} className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-4 border-t border-white/70" />

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {!collapsed && <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Menu</p>}
        <ul className="space-y-1">{MENU.map(renderItem)}</ul>
        {!collapsed && <p className="px-3 pb-1.5 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Explore</p>}
        {collapsed && <div className="mx-3 my-3 border-t border-white/70" />}
        <ul className="space-y-1">{EXPLORE.map((m) => renderItem(m))}</ul>
      </nav>

      {/* quick contact — plays the role of the reference's "Messages" card */}
      {!collapsed ? (
        <div className="mx-3 mb-3 rounded-3xl bg-white/85 p-3 shadow-sm">
          <div className="flex items-center justify-between px-1 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Talk to us</p>
          </div>
          <ul className="divide-y divide-slate-100 text-[13px]">
            <li>
              <a href={COMPANY.phoneHref} onClick={() => track("phone_clicked", { source: "sidebar" })} className="flex items-center gap-2.5 px-1 py-2 text-slate-700 hover:text-brand-purple">
                <Icon name="phone" className="h-4 w-4" /> <span className="flex-1">{COMPANY.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.primaryEmail}`} onClick={() => track("email_clicked", { source: "sidebar" })} className="flex items-center gap-2.5 px-1 py-2 text-slate-700 hover:text-brand-purple">
                <Icon name="mail" className="h-4 w-4" /> <span className="flex-1 truncate">{COMPANY.primaryEmail}</span>
              </a>
            </li>
          </ul>
          <a
            href={buildWhatsAppUrl(generalWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { source: "sidebar" })}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-purple px-4 py-2.5 text-[13px] font-semibold text-white shadow-md transition hover:bg-brand-purple-deep"
          >
            <Icon name="chat" className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      ) : (
        <div className="mb-3 flex flex-col items-center gap-2 px-2">
          <a href={buildWhatsAppUrl(generalWhatsAppMessage())} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Ajira Majuu" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-purple text-white shadow-md">
            <Icon name="chat" className="h-5 w-5" />
          </a>
        </div>
      )}

      {/* company block (the reference's profile row) */}
      <div className={`mx-3 mb-3 flex items-center gap-3 rounded-2xl bg-white/70 p-2.5 ${collapsed ? "justify-center" : ""}`}>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-orange/20 text-brand-purple">
          <Icon name="pin" className="h-[18px] w-[18px]" />
        </span>
        {!collapsed && (
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[12.5px] font-semibold text-ink">{COMPANY.name}</span>
            <span className="block truncate text-[11px] text-slate-500">{COMPANY.addressShort}</span>
          </span>
        )}
      </div>
    </aside>
  );
}
