import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contact = (body.contact || "").trim();

    if (!contact) {
      return NextResponse.json({ error: "Please provide an email or phone number." }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("job_alerts").insertOne({
      contact,
      country: body.country || "",
      category: body.category || "",
      keyword: body.keyword || "",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Job alert error:", err);
    return NextResponse.json({ error: "Could not save your alert right now." }, { status: 500 });
  }
}
