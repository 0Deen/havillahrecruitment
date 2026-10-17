import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ajiraSystemPrompt } from "@/lib/ajira-system-prompt";
import { jobs } from "@/data/jobs";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Real jobs data grounds the model so it never invents a listing.
const jobsContext = jobs
  .map((j) => `- ${j.title} | ${j.employer} | ${j.city}, ${j.country} | ${j.salary} | ${j.category} | verified: ${j.verified}`)
  .join("\n");

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  if (!openai) {
    return NextResponse.json(
      { error: "AI concierge is not configured. Set OPENAI_API_KEY in your environment." },
      { status: 503 }
    );
  }

  try {
    const { messages, sessionId } = (await req.json()) as { messages: ChatMessage[]; sessionId?: string };

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const wantsHuman = /\b(human|agent|talk to someone|real person|mtu|binadamu|إنسان|شخص)\b/i.test(lastUserMessage);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      messages: [
        { role: "system", content: ajiraSystemPrompt },
        { role: "system", content: `Currently live job listings (only ones you may reference):\n${jobsContext}` },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I didn't catch that — could you say it again?";

    // Log the human-attention event so staff can follow up (Section 108-110 of the build spec).
    if (wantsHuman && process.env.MONGODB_URI) {
      try {
        const db = await getDb();
        await db.collection("chat_escalations").insertOne({
          sessionId: sessionId || null,
          message: lastUserMessage,
          priority: "medium",
          status: "new",
          createdAt: new Date(),
        });
      } catch (e) {
        console.error("Failed to log chat escalation:", e);
      }
    }

    return NextResponse.json({ reply, humanRequested: wantsHuman });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong talking to the assistant." }, { status: 500 });
  }
}
