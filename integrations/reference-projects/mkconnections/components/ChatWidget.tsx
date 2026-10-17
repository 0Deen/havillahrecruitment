"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Message = { from: "bot" | "user"; text: string };

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("mk-chat-session");
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("mk-chat-session", id);
  }
  return id;
}

export function ChatWidget({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: t("chat.greeting") }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [humanRequested, setHumanRequested] = useState(false);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const nextMessages: Message[] = [...messages, { from: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          messages: nextMessages.map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
        }),
      });

      if (!res.ok) throw new Error("Chat API unavailable");
      const data = await res.json();

      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
      if (data.humanRequested) setHumanRequested(true);
    } catch {
      // Graceful fallback if OPENAI_API_KEY isn't configured yet or the request fails.
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "I'm having trouble reaching the assistant service right now. You can always WhatsApp us directly using the button below.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { label: t("chat.q1"), value: "Find me a job" },
    { label: t("chat.q2"), value: "How does recruitment work?" },
    { label: t("chat.q3"), value: "I want to talk to a human" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex h-[520px] w-[340px] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-lift"
    >
      <div className="flex items-center gap-3 bg-ink px-4 py-3.5">
        <Image src="/logo.jpeg" alt="" width={30} height={30} className="rounded-full" />
        <div>
          <p className="text-sm font-medium text-white">{t("chat.title")}</p>
          <p className="flex items-center gap-1 text-xs text-white/50">
            <span className={`h-1.5 w-1.5 rounded-full ${humanRequested ? "bg-amber" : "bg-emerald-400"}`} />
            {humanRequested ? "Connecting you with staff" : "Online"}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-sand/40 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm ${
                m.from === "user" ? "bg-amber text-ink" : "bg-white text-ink shadow-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-3.5 py-2.5 text-sm text-slate shadow-sm">Typing…</div>
          </div>
        )}
      </div>

      {messages.length < 2 && (
        <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
          {quickActions.map((q) => (
            <button
              key={q.value}
              onClick={() => send(q.value)}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-ink transition hover:border-amber hover:text-amber"
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          className="flex-1 rounded-full border border-line px-4 py-2 text-sm outline-none focus:border-amber"
        />
        <button type="submit" disabled={loading} className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-ink disabled:opacity-50">
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}
