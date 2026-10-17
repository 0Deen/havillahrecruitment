import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_FILE = 5 * 1024 * 1024;
const FILE_FIELDS = ["cv", "photo", "passportCopy"] as const;
const FULL_REQUIRED = ["fullName", "gender", "dob", "nationalId", "phone", "county", "category", "destinations", "passport"];

function genReference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `MKC-${new Date().getFullYear()}-${n}`;
}

/* ------------------------------------------------------------------ */
/* GET: look up an application by reference (unchanged)                */
/* ------------------------------------------------------------------ */
export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get("reference")?.trim();
    if (!reference) return NextResponse.json({ error: "Missing reference" }, { status: 400 });

    const db = await getDb();
    const application = await db.collection("applications").findOne(
      { reference },
      { projection: { name: 1, reference: 1, status: 1, category: 1, destination: 1, createdAt: 1 } }
    );

    if (!application) return NextResponse.json({ found: false }, { status: 200 });
    return NextResponse.json({ found: true, application }, { status: 200 });
  } catch (err) {
    console.error("Application lookup error:", err);
    return NextResponse.json({ error: "Could not look that up right now." }, { status: 500 });
  }
}

/* ------------------------------------------------------------------ */
/* POST: accepts BOTH forms                                            */
/*  - QuickApplyModal  -> JSON body                                    */
/*  - /apply full form -> multipart FormData ("data" JSON + files)     */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  try {
    const isMultipart = (req.headers.get("content-type") || "").includes("multipart/form-data");
    return isMultipart ? await handleFullApplication(req) : await handleQuickApply(req);
  } catch (err) {
    console.error("Application submit error:", err);
    return NextResponse.json({ error: "Could not submit application right now. Please try again." }, { status: 500 });
  }
}

/* ---------- 1. Quick apply (original logic kept exactly as-is below; ---------- */
/* ----             extra optional fields only ADDED, nothing removed) ---------- */
async function handleQuickApply(req: NextRequest) {
  const body = await req.json();
  const reference = genReference();

  const db = await getDb();
  await db.collection("applications").insertOne({
    reference,
    name: body.name || "",
    phone: body.phone || "",
    email: body.email || "",
    county: body.county || "",
    category: body.category || "",
    destination: body.destination || "",
    experience: body.experience || "",
    occupation: body.occupation || "",
    status: "Submitted",
    source: body.source || "homepage-quick-apply",
    // ---- added for the "Jobs by Country" quick-apply sheet; always optional ----
    age: body.age || "",
    nationality: body.nationality || "",
    currentLocation: body.currentLocation || "",
    passportStatus: body.passportStatus || "",
    message: body.message || "",
    jobTitle: body.jobTitle || body.occupation || "",
    cvFileName: body.cvFileName || "",
    createdAt: new Date(),
  });

  return NextResponse.json({ reference, ref: reference }, { status: 201 });
}

/* ---------- 2. Full application form (/apply) ---------- */
async function handleFullApplication(req: NextRequest) {
  const form = await req.formData();
  const data = JSON.parse(String(form.get("data") ?? "{}"));

  // bots fill the hidden "website" field: pretend success, save nothing
  if (data.website) return NextResponse.json({ reference: "MKC-OK", ref: "MKC-OK" }, { status: 201 });

  for (const k of FULL_REQUIRED) {
    const v = data[k];
    if (!v || (Array.isArray(v) && !v.length)) {
      return NextResponse.json({ error: `Missing required field: ${k}` }, { status: 400 });
    }
  }
  if (!data.agreeTruth || !data.agreeData || !data.agreeFees) {
    return NextResponse.json({ error: "Please accept all the confirmations." }, { status: 400 });
  }

  // read + size-check uploads before saving anything
  const files: { field: string; name: string; type: string; size: number; data: Buffer }[] = [];
  for (const field of FILE_FIELDS) {
    const f = form.get(field);
    if (f instanceof File && f.size) {
      if (f.size > MAX_FILE) return NextResponse.json({ error: `${field} is larger than 5 MB.` }, { status: 400 });
      files.push({ field, name: f.name, type: f.type, size: f.size, data: Buffer.from(await f.arrayBuffer()) });
    }
  }

  const reference = genReference();
  const db = await getDb();

  // Same top-level fields as the quick form, so lookup + any admin list keeps working,
  // plus the complete answers under `details`.
  const { website, agreeTruth, agreeData, agreeFees, ...details } = data;
  await db.collection("applications").insertOne({
    reference,
    name: data.fullName,
    phone: data.phone,
    email: data.email || "",
    county: data.county,
    category: data.category,
    destination: (data.destinations as string[]).join(", "),
    experience: data.years || "",
    occupation: data.position || data.lastJob || "",
    status: "Submitted",
    source: "apply-page",
    consent: { truth: true, dataSharing: true, noFees: true },
    details,
    files: files.map(({ field, name, type, size }) => ({ field, name, type, size })),
    createdAt: new Date(),
  });

  if (files.length) {
    await db.collection("application_files").insertMany(
      files.map((f) => ({ reference, ...f, createdAt: new Date() }))
    );
  }

  return NextResponse.json({ reference, ref: reference }, { status: 201 });
}