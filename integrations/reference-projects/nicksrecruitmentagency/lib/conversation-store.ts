/* ---------------------------------------------------------------------
   Conversation store for the AI chatbot.

   There is no database configured in this project yet, so conversations
   are persisted to a JSON file on disk. This is enough for local
   development and for single-instance/traditional hosting, and gives
   the admin dashboard something real to read from.

   IMPORTANT — production note:
   Serverless platforms (Vercel, etc.) use an ephemeral, read-only
   filesystem outside of /tmp, and /tmp is wiped between deployments and
   not shared across function instances. That means on serverless this
   file store should be treated as best-effort/dev-only. Because of that,
   app/api/chatbot/route.ts ALSO emails every conversation transcript to
   the admin inbox via Resend (the same provider already used for
   applications) — that's the channel that reliably reaches a human
   regardless of hosting. When you're ready for real persistence, swap
   the read/write functions below for calls to Postgres/Supabase/etc.
   and the rest of the app (admin page, API route) doesn't need to change
   shape.
--------------------------------------------------------------------- */

import fs from "fs";
import path from "path";

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
};

export type VisitorProfile = {
  name?: string;
  intent?: "job_seeker" | "employer" | "training" | "medical" | "general";
  country?: string;
  category?: string;
};

export type Conversation = {
  id: string;
  startedAt: string;
  updatedAt: string;
  page: string;
  messages: ChatMessage[];
  escalated: boolean;
  contactShared?: { name?: string; phone?: string; email?: string };
  // Guided-conversation state — lets the assistant ask a short series of
  // getting-to-know-you questions instead of behaving like a static FAQ box.
  stage?: string;
  profile?: VisitorProfile;
};

const STORE_DIR =
  process.env.NODE_ENV === "production" && process.env.VERCEL
    ? "/tmp"
    : path.join(process.cwd(), ".data");

const STORE_FILE = path.join(STORE_DIR, "conversations.json");

// In-memory fallback so a single running process still works even if
// the filesystem write fails (e.g. read-only environment).
let memoryStore: Conversation[] = [];
let usingMemoryOnly = false;

function ensureStore(): void {
  try {
    if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
    if (!fs.existsSync(STORE_FILE)) fs.writeFileSync(STORE_FILE, "[]", "utf-8");
  } catch {
    usingMemoryOnly = true;
  }
}

function readAll(): Conversation[] {
  if (usingMemoryOnly) return memoryStore;
  try {
    ensureStore();
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw) as Conversation[];
  } catch {
    usingMemoryOnly = true;
    return memoryStore;
  }
}

function writeAll(conversations: Conversation[]): void {
  if (usingMemoryOnly) {
    memoryStore = conversations;
    return;
  }
  try {
    ensureStore();
    fs.writeFileSync(STORE_FILE, JSON.stringify(conversations, null, 2), "utf-8");
  } catch {
    usingMemoryOnly = true;
    memoryStore = conversations;
  }
}

export function getConversation(id: string): Conversation | undefined {
  return readAll().find((c) => c.id === id);
}

export function listConversations(): Conversation[] {
  return readAll().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function appendMessage(
  id: string,
  page: string,
  message: ChatMessage
): Conversation {
  const all = readAll();
  let convo = all.find((c) => c.id === id);
  const now = new Date().toISOString();

  if (!convo) {
    convo = {
      id,
      startedAt: now,
      updatedAt: now,
      page,
      messages: [],
      escalated: false,
    };
    all.push(convo);
  }

  convo.messages.push(message);
  convo.updatedAt = now;
  convo.page = page;

  writeAll(all);
  return convo;
}

export function markEscalated(id: string): void {
  const all = readAll();
  const convo = all.find((c) => c.id === id);
  if (convo) {
    convo.escalated = true;
    writeAll(all);
  }
}

// Loads (or creates) a conversation without appending a message — used at
// the top of the chatbot route to read the current stage/profile before
// deciding how to respond.
export function getOrCreateConversation(id: string, page: string): Conversation {
  const all = readAll();
  let convo = all.find((c) => c.id === id);
  if (!convo) {
    const now = new Date().toISOString();
    convo = {
      id,
      startedAt: now,
      updatedAt: now,
      page,
      messages: [],
      escalated: false,
      stage: "awaiting_name",
      profile: {},
    };
    all.push(convo);
    writeAll(all);
  }
  return convo;
}

export function updateConversationState(
  id: string,
  stage: string,
  profile: VisitorProfile
): void {
  const all = readAll();
  const convo = all.find((c) => c.id === id);
  if (convo) {
    convo.stage = stage;
    convo.profile = profile;
    writeAll(all);
  }
}
