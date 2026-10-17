import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("newsletter_subscribers").updateOne(
      { email },
      { $set: { email, subscribedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
