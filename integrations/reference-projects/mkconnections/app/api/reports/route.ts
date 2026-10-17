import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    const result = await db.collection("fraud_reports").insertOne({
      description: body.description || "",
      contact: body.contact || "",
      status: "New",
      createdAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Fraud report error:", err);
    return NextResponse.json({ error: "Could not submit your report right now." }, { status: 500 });
  }
}
