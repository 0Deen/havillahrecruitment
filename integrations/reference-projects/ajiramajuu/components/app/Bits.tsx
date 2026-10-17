"use client";

// Small client-side building blocks shared by server pages: tracked contact
// links, sticky mobile apply bar, accordion.

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { COMPANY } from "@/lib/site";

export function WhatsAppLink({ message, label = "WhatsApp us", source, className = "" }: { message: string; label?: string; source: string; className?: string }) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_clicked", { source })}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-md transition active:scale-95 ${className}`}
    >
      <Icon name="chat" className="h-5 w-5" strokeWidth={2} /> {label}
    </a>
  );
}

export function ContactLink({ kind, source, className = "", children }: { kind: "phone" | "email"; source: string; className?: string; children?: React.ReactNode }) {
  const href = kind === "phone" ? COMPANY.phoneHref : `mailto:${COMPANY.primaryEmail}`;
  const ev: AnalyticsEvent = kind === "phone" ? "phone_clicked" : "email_clicked";
  return (
    <a href={href} onClick={() => track(ev, { source })} className={className}>
      {children ?? (kind === "phone" ? COMPANY.phoneDisplay : COMPANY.primaryEmail)}
    </a>
  );
}

export function ApplyLink({ href, source, className = "", children }: { href: string; source: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={() => track("apply_clicked", { source })} className={className}>
      {children}
    </Link>
  );
}

/** Mobile-only sticky bar: Apply + WhatsApp. Marks <body> so floating buttons rise above it. */
export function StickyApplyBar({ applyHref, waMessage, label = "Apply for this position" }: { applyHref: string; waMessage: string; label?: string }) {
  useEffect(() => {
    document.body.dataset.stickyBar = "1";
    return () => {
      delete document.body.dataset.stickyBar;
    };
  }, []);
  return (
    <div className="fixed inset-x-0 z-40 px-3 lg:hidden" style={{ bottom: "calc(92px + env(safe-area-inset-bottom))" }}>
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-[22px] border border-white/70 bg-white/95 p-2 shadow-[0_12px_30px_-8px_rgba(42,15,79,0.35)] backdrop-blur-xl">
        <ApplyLink href={applyHref} source="sticky-bar" className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange text-[14.5px] font-bold text-[#2A0F4F] active:scale-[0.98]">
          {label} <Icon name="arrow" className="h-4 w-4" />
        </ApplyLink>
        <a href={buildWhatsAppUrl(waMessage)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp about this role" onClick={() => track("whatsapp_clicked", { source: "sticky-bar" })} className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-full bg-[#25D366] text-white active:scale-95">
          <Icon name="chat" className="h-5 w-5" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: { id?: string; q: string; a: string; link?: { label: string; href: string } }[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setOpenId(hash);
  }, []);
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => {
        const id = it.id ?? `q${i}`;
        const open = openId === id;
        return (
          <li key={id} id={id} className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-sm scroll-mt-28">
            <h3>
              <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpenId(open ? null : id)} className="flex min-h-[60px] w-full items-center justify-between gap-3 px-5 py-3 text-left">
                <span className="text-[14.5px] font-semibold text-ink">{it.q}</span>
                <Icon name={open ? "up" : "down"} className="h-5 w-5 flex-none text-brand-purple" />
              </button>
            </h3>
            {open && (
              <div id={`${id}-panel`} className="ajm-fade border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                <p>{it.a}</p>
                {it.link && <Link href={it.link.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">{it.link.label} <Icon name="arrow" className="h-4 w-4" /></Link>}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
