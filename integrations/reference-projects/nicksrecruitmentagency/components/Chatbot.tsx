"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Sparkles,
  Phone,
} from "lucide-react";
import { suggestedQuestionsFor } from "@/lib/chatbot";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  href?: string;
  failed?: boolean;
};

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text:
    "Hi there! I'm the Nicks Recruitment Agency assistant. Before we dive in — what's your name?",
  timestamp: Date.now(),
};

export default function Chatbot() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = "";
    try {
      id = sessionStorage.getItem("nra-chat-session") || "";
    } catch {}
    if (!id) {
      id = makeId();
      try {
        sessionStorage.setItem("nra-chat-session", id);
      } catch {}
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, sending, open]);

  const suggestions = suggestedQuestionsFor(pathname);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const userMessage: Message = {
      id: makeId(),
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, page: pathname, message: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      setMessages((m) => [
        ...m,
        {
          id: makeId(),
          role: "assistant",
          text: data.reply,
          href: data.href,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: makeId(),
          role: "assistant",
          text: "Sorry, that message didn't send. Please try again, or reach us directly on WhatsApp/phone at +254 746 030 545.",
          timestamp: Date.now(),
          failed: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function retryLast() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) sendMessage(lastUser.text);
  }

  function clearConversation() {
    setMessages([WELCOME]);
  }

  function copyMessage(id: string, text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  return (
    <>
      {/* Toggle button — stacked above the WhatsApp button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-lg transition hover:scale-105 hover:bg-navy-800"
      >
        {open ? <X /> : <MessageSquare />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Nicks Recruitment Agency assistant"
          className="fixed bottom-40 right-4 z-50 flex h-[min(600px,70vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-2xl sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-navy-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                <Sparkles size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Nicks Assistant</p>
                <p className="text-[11px] leading-tight text-sand-100/70">
                  Let&rsquo;s figure out what you need
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearConversation}
                aria-label="Clear conversation"
                className="rounded-md p-1.5 text-sand-100/70 transition hover:bg-white/10 hover:text-white"
                title="Clear conversation"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-sand-100/70 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-sand-50 px-3 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gold-500 text-navy-900"
                      : "rounded-bl-sm border border-navy-900/10 bg-white text-navy-800"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.href && (
                    <a
                      href={m.href}
                      className="mt-1.5 inline-block text-xs font-semibold underline decoration-dotted underline-offset-2 hover:text-gold-600"
                    >
                      View more →
                    </a>
                  )}
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[10px] opacity-50">
                      {new Date(m.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {m.role === "assistant" && m.id !== "welcome" && (
                      <button
                        onClick={() => copyMessage(m.id, m.text)}
                        aria-label="Copy message"
                        className="opacity-0 transition group-hover:opacity-60 hover:!opacity-100"
                      >
                        {copiedId === m.id ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    )}
                    {m.failed && (
                      <button
                        onClick={retryLast}
                        className="flex items-center gap-1 text-[10px] font-semibold text-navy-700 opacity-70 hover:opacity-100"
                      >
                        <RotateCcw size={11} /> Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-navy-900/10 bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-900/40 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-900/40 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-900/40" />
                </div>
              </div>
            )}

            {messages.length <= 1 && !sending && (
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-700/50">
                  Try asking
                </p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-xl border border-navy-900/10 bg-white px-3 py-2 text-left text-xs font-medium text-navy-800 shadow-sm transition hover:border-gold-400 hover:text-gold-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Escalation strip */}
          <div className="flex items-center justify-center gap-1.5 border-t border-navy-900/10 bg-white px-3 py-1.5 text-[11px] text-navy-700/60">
            <Phone size={11} /> Need a human? Call/WhatsApp{" "}
            <a href="tel:+254746030545" className="font-semibold text-navy-800 hover:text-gold-600">
              +254 746 030 545
            </a>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-navy-900/10 bg-white p-3"
          >
            <label htmlFor="chatbot-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about jobs, fees, countries…"
              autoComplete="off"
              className="flex-1 rounded-full border border-navy-900/15 bg-sand-50 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-gold-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
