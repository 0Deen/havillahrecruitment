import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    await db.collection("employer_leads").insertOne({
      company: body.company || "",
      country: body.country || "",
      contactPerson: body.contactPerson || "",
      email: body.email || "",
      phone: body.phone || "",
      positions: body.positions || "",
      numberNeeded: body.numberNeeded || "",
      details: body.details || "",
      status: "New",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Employer lead error:", err);
    return NextResponse.json({ error: "Could not submit your request right now." }, { status: 500 });
  }
}
