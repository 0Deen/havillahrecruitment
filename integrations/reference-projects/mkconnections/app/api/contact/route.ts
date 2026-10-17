import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    await db.collection("contact_messages").insertOne({
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      category: body.category || "General enquiry",
      message: body.message || "",
      status: "New",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Could not send your message right now." }, { status: 500 });
  }
}
