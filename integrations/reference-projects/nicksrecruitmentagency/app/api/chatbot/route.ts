import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { converse, type ConversationStage } from "@/lib/chatbot";
import {
  appendMessage,
  markEscalated,
  getOrCreateConversation,
  updateConversationState,
  type ChatMessage,
} from "@/lib/conversation-store";

/* ---------------------------------------------------------------------
   POST /api/chatbot
   { sessionId: string, page: string, message: string }

   1) Answers the question from the site knowledge base (lib/chatbot.ts).
   2) Persists both the user message and the reply to the conversation
      store for the team to review internally.
   3) Emails the admin inbox with the running transcript — this is the
      reliable "the admin gets the conversation" channel, since file
      storage on serverless hosting is not guaranteed to persist (see
      lib/conversation-store.ts for details).

   Swap `answerQuestion()` for a real LLM call here later — see the
   comment at the top of lib/chatbot.ts for exactly what that involves.
--------------------------------------------------------------------- */

const resend = new Resend(process.env.RESEND_API_KEY);
const DESTINATION_EMAIL = "nicks@nicksrecruitmentagency.com";
const FROM_EMAIL = "noreply@nicksrecruitmentagency.com";

// Extremely simple in-memory rate limit: max 20 messages / 60s per session.
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(sessionId: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(sessionId);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(sessionId, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > 20;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId: string = String(body?.sessionId ?? "").slice(0, 100);
    const page: string = String(body?.page ?? "/").slice(0, 200);
    const message: string = String(body?.message ?? "").slice(0, 2000);

    if (!sessionId || !message.trim()) {
      return NextResponse.json({ error: "Missing sessionId or message" }, { status: 400 });
    }

    if (isRateLimited(sessionId)) {
      return NextResponse.json(
        { error: "Too many messages — please slow down." },
        { status: 429 }
      );
    }

    const now = new Date().toISOString();
    const userMsg: ChatMessage = { role: "user", text: message, timestamp: now };
    appendMessage(sessionId, page, userMsg);

    // Load (or start) the guided-conversation state for this session, then
    // decide the next turn from it.
    const existing = getOrCreateConversation(sessionId, page);
    const stage = (existing.stage as ConversationStage) ?? "awaiting_name";
    const profile = existing.profile ?? {};

    const answer = converse(stage, profile, message);
    updateConversationState(sessionId, answer.nextStage, answer.nextProfile);

    const botMsg: ChatMessage = {
      role: "assistant",
      text: answer.text,
      timestamp: new Date().toISOString(),
    };
    const convo = appendMessage(sessionId, page, botMsg);

    if (answer.shouldEscalate) {
      markEscalated(sessionId);
    }

    // Best-effort: notify the admin inbox with the transcript so far.
    // Never let an email failure break the chat response for the visitor.
    notifyAdmin(convo.id, page, convo.messages, answer.shouldEscalate).catch((e) =>
      console.error("Chatbot admin notification failed:", e)
    );

    return NextResponse.json({
      reply: answer.text,
      href: answer.href,
      escalated: answer.shouldEscalate,
      conversationId: convo.id,
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function notifyAdmin(
  conversationId: string,
  page: string,
  messages: ChatMessage[],
  escalated: boolean
) {
  if (!process.env.RESEND_API_KEY) return; // no provider configured — skip silently

  const transcript = messages
    .map(
      (m) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;color:${
          m.role === "user" ? "#0B1F3A" : "#A87A15"
        };">${m.role === "user" ? "Visitor" : "Assistant"}</td><td style="padding:4px 0;">${escapeHtml(
          m.text
        )}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: FROM_EMAIL,
    to: DESTINATION_EMAIL,
    subject: `${escalated ? "⚠️ Needs follow-up — " : ""}Chatbot conversation (${page})`,
    html: `
      <div style="font-family: sans-serif; font-size: 14px; color: #111;">
        <h2 style="margin-bottom:4px;">Chatbot conversation${escalated ? " — flagged for follow-up" : ""}</h2>
        <p style="color:#555;margin-top:0;">Page: ${escapeHtml(page)} · Session: ${conversationId}</p>
        <table style="border-collapse: collapse; margin-top: 12px; width: 100%;">${transcript}</table>
        <p style="margin-top:16px;color:#555;">This is the full transcript so far.</p>
      </div>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
