export type ChatRole = "user" | "assistant";

export interface ChatAction {
  label: string;
  href: string;
  kind?: "primary" | "secondary" | "whatsapp" | "call" | "email";
  external?: boolean;
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
  timestamp?: string;
  /** Contextual buttons rendered under an assistant message. */
  actions?: ChatAction[];
}

export type LeadIntent =
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "SUPPORT"
  | "EMPLOYER"
  | "GENERAL";

export interface LeadData {
  sessionId: string;
  /** Human-readable reference shown to the candidate, e.g. "AJM-2026-7F3Q2". */
  reference?: string;
  name?: string;
  phone?: string;
  email?: string;
  preferredCountry?: string;
  preferredJob?: string;
  experience?: string;
  passportStatus?: string;
  applicationStatus?: string;
  intent: LeadIntent;
  leadScore: number;
  language?: string;
  summary: string;
  transcript: ChatMessage[];
  timestamp: string;
}

export interface ChatRequestBody {
  sessionId: string;
  messages: ChatMessage[];
}

export interface ChatResponseBody {
  reply: string;
  quickReplies?: string[];
  actions?: ChatAction[];
  /** high = answered from verified records; low = escalated to human support */
  confidence?: "high" | "medium" | "low";
}
