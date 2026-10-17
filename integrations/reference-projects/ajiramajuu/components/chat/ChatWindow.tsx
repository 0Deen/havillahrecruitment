"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickReplies, { DEFAULT_QUICK_REPLIES } from "./QuickReplies";
import Icon from "@/components/app/Icon";
import { track } from "@/lib/analytics";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hello — I'm the Ajira Majuu recruitment assistant. I can show you current jobs, explain the process and documents, and connect you with our team. I answer from Ajira Majuu's verified records, and if I don't know something I'll say so.\n\nWhat would you like to do?",
};

const STORAGE_KEY = "ajm-chat-history";

export default function ChatWindow({
  sessionId,
  initialQuery,
  variant = "panel",
  onUserText,
}: {
  sessionId: string;
  initialQuery?: string;
  variant?: "panel" | "full";
  /** Lets a parent (e.g. the /assistant context panel) follow the conversation. */
  onUserText?: (text: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Searching current opportunities…");
  const [quickReplies, setQuickReplies] = useState<string[]>(DEFAULT_QUICK_REPLIES);
  const [errorBanner, setErrorBanner] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);

  // Restore this tab's conversation (sessionStorage only — never persisted server-side).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    async (text: string, base?: ChatMessage[]) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setErrorBanner("");
      setQuickReplies([]);
      const history = base ?? messages;
      const nextMessages = [...history, { role: "user", content: trimmed } as ChatMessage];
      setMessages(nextMessages);
      setInput("");
      setIsTyping(true);
      setLoadingLabel(/status|application/i.test(trimmed) ? "Checking how to follow up…" : /country|qatar|oman|kuwait|saudi|uae|bahrain|destination/i.test(trimmed) ? "Checking destination information…" : "Searching current opportunities…");
      track("assistant_message", { length: trimmed.length });
      onUserText?.(trimmed);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // actions are UI-only; send plain role/content
          body: JSON.stringify({ sessionId, messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
        });
        if (!res.ok && res.status !== 429) throw new Error("Request failed");
        const data = await res.json();
        if (data.confidence === "low") track("assistant_escalated");
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply, actions: data.actions }]);
        setQuickReplies(Array.isArray(data.quickReplies) ? data.quickReplies : []);
      } catch {
        setErrorBanner("I'm having trouble connecting right now. Check your connection and try again — or reach our team directly on WhatsApp or by phone.");
        setQuickReplies(["Try again", "Talk to Ajira Majuu"]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, messages, sessionId, onUserText]
  );

  // /assistant?q=qatar deep link — runs once, on a fresh conversation
  useEffect(() => {
    if (initialQuery && !sentInitial.current) {
      sentInitial.current = true;
      void sendMessage(initialQuery, [WELCOME]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  function reset() {
    setMessages([WELCOME]);
    setQuickReplies(DEFAULT_QUICK_REPLIES);
    setErrorBanner("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={scrollRef} className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {isTyping && (
          <div>
            <TypingIndicator />
            <p className="ml-2 mt-1 text-[11px] text-slate-400">{loadingLabel}</p>
          </div>
        )}
        {errorBanner && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {errorBanner}
          </div>
        )}
      </div>

      <QuickReplies
        options={quickReplies}
        onSelect={(v) => (v === "Try again" ? sendMessage([...messages].reverse().find((m) => m.role === "user")?.content ?? "Hello") : sendMessage(v))}
        disabled={isTyping}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-brand-purple/10 bg-white/80 p-3 backdrop-blur"
        style={variant === "full" ? { paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" } : undefined}
      >
        {messages.length > 1 && (
          <button type="button" onClick={reset} aria-label="Clear conversation" className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-brand-purple">
            <Icon name="trash" className="h-[18px] w-[18px]" />
          </button>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about jobs, documents, how to apply…"
          maxLength={500}
          className="h-11 min-w-0 flex-1 rounded-full border border-brand-purple/15 bg-white px-4 text-base focus:border-brand-purple focus:outline-none"
          aria-label="Message"
          enterKeyHint="send"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-purple text-white transition hover:bg-brand-purple-deep active:scale-95 disabled:opacity-40"
          aria-label="Send message"
        >
          <Icon name="send" className="h-[18px] w-[18px]" />
        </button>
      </form>
      <p className="bg-white/80 px-4 pb-2 text-center text-[10.5px] text-slate-400">
        Don’t share passport numbers or payment details here. This chat is not stored on our servers except to alert our team when you share contact details.
      </p>
    </div>
  );
}
