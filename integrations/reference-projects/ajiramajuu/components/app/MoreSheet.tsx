"use client";

import Link from "next/link";
import { useEffect } from "react";
import Icon, { type IconName } from "./Icon";
import { COMPANY, NAV_MORE } from "@/lib/site";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/** Full menu as a bottom sheet (mobile) — everything not in the tab bar lives here. */
export default function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button aria-label="Close menu" onClick={onClose} className="ajm-fade absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <div className="ajm-sheet absolute inset-x-0 bottom-0 max-h-[88%] overflow-y-auto rounded-t-[32px] bg-[#F7F4FC] px-4 pb-8 pt-3 shadow-2xl" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="font-display text-xl font-bold text-brand-purple">Ajira Majuu</p>
            <p className="text-xs text-slate-500">{COMPANY.legalDescriptor}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
            <Icon name="x" />
          </button>
        </div>

        {/* instant contact actions */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <a href={COMPANY.phoneHref} onClick={() => track("phone_clicked", { source: "menu" })} className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white text-[12px] font-semibold text-brand-purple shadow-sm active:scale-95">
            <Icon name="phone" /> Call
          </a>
          <a href={buildWhatsAppUrl(generalWhatsAppMessage())} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_clicked", { source: "menu" })} className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#25D366] text-[12px] font-semibold text-white shadow-sm active:scale-95">
            <Icon name="chat" /> WhatsApp
          </a>
          <a href={`mailto:${COMPANY.primaryEmail}`} onClick={() => track("email_clicked", { source: "menu" })} className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white text-[12px] font-semibold text-brand-purple shadow-sm active:scale-95">
            <Icon name="mail" /> Email
          </a>
        </div>

        <Link href="/apply" onClick={onClose} className="mt-3 flex min-h-[56px] items-center justify-between rounded-2xl bg-brand-orange px-5 text-[15px] font-bold text-[#2A0F4F] shadow-md active:scale-[0.99]">
          Apply now — no account needed <Icon name="arrow" />
        </Link>

        <p className="px-2 pb-2 pt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">More</p>
        <ul className="overflow-hidden rounded-3xl bg-white shadow-sm">
          {NAV_MORE.map((m, i) => (
            <li key={m.href} className={i ? "border-t border-slate-100" : ""}>
              <Link href={m.href} onClick={onClose} className="flex min-h-[60px] items-center gap-3.5 px-4 py-2.5 active:bg-slate-50">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple">
                  <Icon name={m.icon as IconName} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-semibold text-ink">{m.label}</span>
                  <span className="block truncate text-xs text-slate-500">{m.hint}</span>
                </span>
                <Icon name="right" className="h-4 w-4 text-slate-300" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-3xl bg-white p-4 text-[12.5px] leading-relaxed text-slate-600 shadow-sm">
          <p className="font-semibold text-ink">{COMPANY.name}</p>
          <p>{COMPANY.address}</p>
          <p>{COMPANY.phoneDisplay}</p>
          <p>{COMPANY.primaryEmail}</p>
          <div className="mt-3 flex gap-4 text-xs font-semibold text-brand-purple">
            <Link href="/privacy-policy" onClick={onClose}>Privacy</Link>
            <Link href="/terms" onClick={onClose}>Terms</Link>
            <Link href="/recruitment-safety" onClick={onClose}>Candidate safety</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
