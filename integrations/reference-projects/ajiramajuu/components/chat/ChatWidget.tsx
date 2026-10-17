"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import ChatWindow from "./ChatWindow";
import Icon from "@/components/app/Icon";
import { getDestinationBySlug, getJobBySlug } from "@/data/jobs";
import { buildWhatsAppUrl, whatsAppMessageForPath } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export const OPEN_CHAT_EVENT = "ajm:open-chat";

/**
 * Floating action stack: contextual WhatsApp + the AI assistant. Sits above
 * the mobile tab bar (and above the sticky apply bar on job pages), is
 * safe-area aware, and is hidden on /apply and /assistant where it would
 * compete with the task.
 */
export default function ChatWidget() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const existing = sessionStorage.getItem("ajira-session-id");
    if (existing) setSessionId(existing);
    else {
      const id = uuidv4();
      sessionStorage.setItem("ajira-session-id", id);
      setSessionId(id);
    }
    const openChat = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, openChat);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openChat);
  }, []);

  useEffect(() => {
    // lock background scroll while the full-screen mobile sheet is open
    document.body.style.overflow = open && window.innerWidth < 640 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  if (!sessionId) return null;
  const hidden = pathname.startsWith("/apply") || pathname.startsWith("/assistant");
  if (hidden) return null;

  const jobSlug = pathname.startsWith("/jobs/") ? pathname.split("/")[2] : undefined;
  const destSlug = pathname.startsWith("/destinations/") ? pathname.split("/")[2] : undefined;
  const waHref = buildWhatsAppUrl(
    whatsAppMessageForPath(pathname, {
      job: jobSlug ? getJobBySlug(jobSlug) : undefined,
      destination: destSlug ? getDestinationBySlug(destSlug) : undefined,
    })
  );

  return (
    <>
      <div className="ajm-fab-stack fixed right-4 z-[45] flex flex-col items-center gap-3 sm:right-6">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Ajira Majuu on WhatsApp"
          onClick={() => track("whatsapp_clicked", { source: "floating", path: pathname })}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-6px_rgba(37,211,102,0.65)] transition hover:scale-105 active:scale-95"
        >
          <Icon name="chat" className="h-6 w-6" strokeWidth={2} />
        </a>
        <button
          onClick={() => {
            setOpen((o) => !o);
            if (!open) track("assistant_opened", { source: "floating" });
          }}
          aria-label={open ? "Close assistant" : "Open the Ajira Majuu AI assistant"}
          aria-expanded={open}
          className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-light text-white shadow-glass-lg transition hover:scale-105 active:scale-95"
        >
          <Icon name={open ? "x" : "sparkles"} className="h-6 w-6" strokeWidth={2} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[620px] sm:w-[390px]"
          role="dialog"
          aria-label="Ajira Majuu AI recruitment assistant"
        >
          <div className="flex h-full w-full flex-col overflow-hidden border border-white/40 bg-[#F7F4FC] shadow-glass-lg sm:rounded-3xl" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            <div className="flex items-center justify-between bg-gradient-to-r from-brand-purple to-brand-purple-deep px-4 pb-3 text-white" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Icon name="sparkles" /></span>
                <div className="leading-tight">
                  <div className="font-display text-base font-bold">Ajira Majuu AI</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Recruitment assistant · answers from verified records
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href="/assistant" aria-label="Open full-screen assistant" className="flex h-11 w-11 items-center justify-center rounded-full text-white/85 hover:bg-white/10">
                  <Icon name="external" className="h-[18px] w-[18px]" />
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-11 w-11 items-center justify-center rounded-full text-white/85 hover:bg-white/10">
                  <Icon name="x" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <ChatWindow sessionId={sessionId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
