"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatWindow from "@/components/chat/ChatWindow";
import Icon, { type IconName } from "@/components/app/Icon";
import { OPEN_MENU_EVENT } from "@/components/app/AppShell";
import { COMPANY } from "@/lib/site";
import { destinations, findDestinationInText, getActiveJobs, getJobsByCountrySlug } from "@/data/jobs";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const TILES: { label: string; prompt: string; icon: IconName }[] = [
  { label: "Find a job", prompt: "Show me current jobs", icon: "briefcase" },
  { label: "Explore destinations", prompt: "Which countries do you recruit for?", icon: "globe" },
  { label: "Check job requirements", prompt: "What are the requirements?", icon: "file" },
  { label: "How to apply", prompt: "How do I apply?", icon: "send" },
  { label: "Recruitment process", prompt: "What is the recruitment process?", icon: "route" },
  { label: "Follow up my application", prompt: "How do I check my application?", icon: "clock" },
  { label: "Document requirements", prompt: "What documents do I need?", icon: "upload" },
  { label: "Talk to Ajira Majuu", prompt: "I want to talk to someone", icon: "phone" },
];

const AUDIENCE = [
  { label: "I'm a job seeker", prompt: "I'm a job seeker" },
  { label: "I'm an employer", prompt: "I'm an employer looking for workers" },
  { label: "Just exploring", prompt: "I'm just exploring" },
];

export default function AssistantApp({ initialQuery }: { initialQuery?: string }) {
  const [sessionId, setSessionId] = useState("");
  const [seed, setSeed] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [focusSlug, setFocusSlug] = useState<string | undefined>();

  useEffect(() => {
    let id = sessionStorage.getItem("ajira-session-id");
    if (!id) {
      id = uuidv4();
      sessionStorage.setItem("ajira-session-id", id);
    }
    setSessionId(id);
    track("assistant_opened", { source: "assistant-page" });
    if (initialQuery) setSeed(initialQuery);
    else {
      try {
        const saved = JSON.parse(sessionStorage.getItem("ajm-chat-history") || "[]");
        if (Array.isArray(saved) && saved.length > 1) setSeed(""); // resume
      } catch {
        /* ignore */
      }
    }
  }, [initialQuery]);

  const follow = (t: string) => {
    const d = findDestinationInText(t);
    if (d) setFocusSlug(d.slug);
  };
  const start = (prompt: string) => {
    follow(prompt);
    setSeed(prompt);
  };
  const home = () => {
    try {
      sessionStorage.removeItem("ajm-chat-history");
    } catch {
      /* ignore */
    }
    setSeed(null);
    setFocusSlug(undefined);
  };

  const focus = destinations.find((d) => d.slug === focusSlug);
  const panelJobs = focus ? getJobsByCountrySlug(focus.slug) : getActiveJobs();

  return (
    <main className="flex h-[calc(100dvh-92px-env(safe-area-inset-bottom))] min-h-[520px] gap-4 lg:h-[calc(100dvh-2rem)] lg:py-4">
      {/* CENTER — conversation */}
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#F7F4FC] lg:rounded-[28px] lg:border lg:border-white/70 lg:shadow-glass">
        <header className="flex items-center gap-3 bg-gradient-to-r from-brand-purple to-brand-purple-deep px-4 pb-3 text-white" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
          {seed !== null ? (
            <button onClick={home} aria-label="Back to assistant home" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
              <Icon name="left" />
            </button>
          ) : (
            <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/60">
              <Image src="/logo.png" alt="" fill sizes="44px" className="object-cover" />
            </span>
          )}
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange-light">Ajira Majuu</p>
            <h1 className="truncate font-display text-lg font-bold">AI Recruitment Assistant</h1>
            <p className="flex items-center gap-1.5 text-[11px] text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online · answers from verified records</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event(OPEN_MENU_EVENT))} aria-label="Open menu" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 lg:hidden">
            <Icon name="menu" />
          </button>
        </header>

        {seed === null ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">Your journey to working abroad starts here</p>
              <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-ink">What would you like to do?</h2>
              <p className="mt-1 text-sm text-slate-600">{COMPANY.legalDescriptor}. No account needed.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {AUDIENCE.map((a) => (
                  <button key={a.label} onClick={() => start(a.prompt)} className="min-h-[40px] rounded-full border border-brand-purple/25 bg-white px-4 text-[13px] font-semibold text-brand-purple shadow-sm active:scale-95">
                    {a.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {TILES.map((t) => (
                  <button key={t.label} onClick={() => start(t.prompt)} className="flex min-h-[92px] flex-col items-start justify-between rounded-3xl bg-white p-4 text-left shadow-sm transition active:scale-[0.97] hover:shadow-md">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple"><Icon name={t.icon} /></span>
                    <span className="mt-3 text-[13.5px] font-semibold leading-snug text-ink">{t.label}</span>
                  </button>
                ))}
              </div>

              <Link href="/recruitment-safety" className="mt-4 flex items-center gap-3 rounded-3xl border border-brand-orange/40 bg-brand-orange/10 p-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-brand-orange/30 text-brand-purple"><Icon name="shield" /></span>
                <span className="text-sm text-slate-700"><strong className="block text-ink">Safety & fraud awareness</strong>Someone asked you for money? Check before you pay.</span>
              </Link>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (text.trim()) start(text.trim());
              }}
              className="flex items-center gap-2 border-t border-brand-purple/10 bg-white/80 p-3"
            >
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask me anything about working abroad with Ajira Majuu" maxLength={500} aria-label="Ask a question" className="h-12 min-w-0 flex-1 rounded-full border border-brand-purple/15 bg-white px-4 text-base focus:border-brand-purple focus:outline-none" />
              <button type="submit" disabled={!text.trim()} aria-label="Send" className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-purple text-white disabled:opacity-40"><Icon name="send" /></button>
            </form>
          </div>
        ) : (
          sessionId && (
            <div className="min-h-0 flex-1">
              <ChatWindow sessionId={sessionId} initialQuery={seed || undefined} variant="full" onUserText={follow} />
            </div>
          )
        )}
      </section>

      {/* RIGHT — contextual panel (xl and up) */}
      <aside className="hidden w-[300px] flex-none flex-col gap-4 overflow-y-auto xl:flex" aria-label="Related information">
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-glass">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{focus ? "Destination" : "Current opportunities"}</p>
          <h2 className="mt-1 font-display text-xl font-bold text-brand-purple">{focus ? `${focus.flag} ${focus.name}` : "Listed roles"}</h2>
          {panelJobs.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {panelJobs.map((j) => (
                <li key={j.slug}>
                  <Link href={`/jobs/${j.slug}`} className="block rounded-2xl bg-brand-purple/5 px-3 py-2.5 transition hover:bg-brand-purple/10">
                    <span className="block text-[13px] font-semibold text-ink">{j.title}</span>
                    <span className="block text-xs text-brand-purple">{j.salary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No structured listing for {focus?.name} yet. Our team can confirm what’s available.</p>
          )}
          {focus && <Link href={`/destinations/${focus.slug}`} className="btn-secondary mt-4 w-full">Explore {focus.name}</Link>}
          <Link href="/apply" className="btn-primary mt-2 w-full">Apply now</Link>
        </div>
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-glass">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Human support</p>
          <p className="mt-1 text-sm text-slate-600">Prefer to talk to a person?</p>
          <a href={buildWhatsAppUrl(generalWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white"><Icon name="chat" className="h-4 w-4" /> WhatsApp</a>
          <a href={COMPANY.phoneHref} className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-brand-purple/25 text-sm font-semibold text-brand-purple"><Icon name="phone" className="h-4 w-4" /> {COMPANY.phoneDisplay}</a>
        </div>
      </aside>
    </main>
  );
}
