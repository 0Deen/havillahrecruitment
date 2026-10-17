/* ---------------------------------------------------------------------
   Chatbot knowledge base + answer engine.

   This is a self-contained, dependency-free "retrieval" layer: it turns
   the site's own content (services, countries, jobs, FAQs, process)
   into a flat list of searchable knowledge entries, then scores a
   visitor's question against them with simple keyword overlap.

   WHY NOT CALL AN LLM DIRECTLY HERE
   ----------------------------------
   No LLM provider is configured in this environment, and secret keys
   must never be referenced from client code. This module is written so
   swapping in a real model later is a one-function change:

     1. Add OPENAI_API_KEY / ANTHROPIC_API_KEY etc. to your env (server-only,
        never NEXT_PUBLIC_*).
     2. In app/api/chatbot/route.ts, replace the call to `answerQuestion()`
        below with a call to your LLM provider, passing `buildKnowledgeContext()`
        as the system/context prompt (this is your RAG context — it's
        already just plain text built from the same source of truth as
        the rest of the site).
     3. Keep the escalation / off-topic / low-confidence guardrails —
        they're provider-agnostic and should wrap whichever model you use.

   Until then, this deterministic matcher gives real, accurate answers
   about services, countries, jobs, process and FAQs (nothing invented),
   and clearly says so and offers a human handoff when it doesn't know.
--------------------------------------------------------------------- */

import {
  services,
  countries,
  jobs,
  jobCategories,
  recruitmentProcess,
  stats,
  industries,
} from "@/lib/data";
import type { VisitorProfile } from "@/lib/conversation-store";

export type ConversationStage =
  | "awaiting_name"
  | "awaiting_intent"
  | "awaiting_detail"
  | "freeform";

export type ConverseResult = {
  text: string;
  href?: string;
  shouldEscalate: boolean;
  nextStage: ConversationStage;
  nextProfile: VisitorProfile;
};

export type KnowledgeEntry = {
  id: string;
  topic: string;
  keywords: string[];
  question: string;
  answer: string;
  href?: string;
};

/* -----------------------------------------------------------------------
   Build the knowledge base from the same data every other page reads
   from — so the chatbot never drifts out of sync with the real site.
----------------------------------------------------------------------- */
function buildKnowledgeBase(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  // Services
  for (const s of services) {
    entries.push({
      id: `service-${s.slug}`,
      topic: "Services",
      keywords: [s.name, s.slug, ...s.countries, "service", "services"],
      question: `What is ${s.name}?`,
      answer: `${s.name}: ${s.summary} Typical timeline: ${s.timeline} Cost: ${s.costs}`,
      href: `/services/${s.slug}`,
    });
    for (const f of s.faqs) {
      entries.push({
        id: `service-faq-${s.slug}-${f.q}`,
        topic: "Services",
        keywords: [s.name, s.slug, "faq"],
        question: f.q,
        answer: f.a,
        href: `/services/${s.slug}`,
      });
    }
  }

  // Countries
  for (const c of countries) {
    entries.push({
      id: `country-${c.slug}`,
      topic: "Countries",
      keywords: [c.name, c.slug, "jobs in " + c.name, "country", ...c.commonRoles],
      question: `What jobs are available in ${c.name}?`,
      answer: `${c.name}: ${c.jobsAvailable} jobs currently listed across ${c.verifiedEmployers} verified employers. Common roles: ${c.commonRoles.join(
        ", "
      )}. Typical pay range: ${c.avgSalaryRange}. Required docs: ${c.requiredDocs.join(", ")}.`,
      href: `/countries/${c.slug}`,
    });
  }

  // Job categories
  for (const jc of jobCategories) {
    entries.push({
      id: `category-${jc.slug}`,
      topic: "Job categories",
      keywords: [jc.name, jc.slug, jc.sector ?? "", "category", "categories"],
      question: `Do you have ${jc.name} jobs?`,
      answer: `Yes — ${jc.name} is one of our active job categories${jc.sector ? ` in ${jc.sector}` : ""}. Browse current openings on the Job Categories page.`,
      href: `/job-categories/${jc.slug}`,
    });
  }

  // Live job listings (small set — safe to summarise directly)
  entries.push({
    id: "jobs-overview",
    topic: "Jobs",
    keywords: ["job", "jobs", "vacancy", "vacancies", "openings", "hiring", "urgent"],
    question: "What jobs do you currently have open?",
    answer: `We currently list ${jobs.length}+ live roles, including ${jobs
      .slice(0, 4)
      .map((j) => `${j.title} (${j.country})`)
      .join(", ")}. Urgent roles are marked on the Jobs page — filter by country, category or urgency there.`,
    href: "/jobs",
  });

  // Process
  entries.push({
    id: "process",
    topic: "Process",
    keywords: ["process", "steps", "how does it work", "how it works", "apply", "application"],
    question: "How does the recruitment process work?",
    answer: `Our process has ${recruitmentProcess.length} stages: ${recruitmentProcess.join(
      " → "
    )}. Start by applying on the Apply Now page.`,
    href: "/apply-now",
  });

  // Company stats / trust
  entries.push({
    id: "stats",
    topic: "About",
    keywords: ["how many", "track record", "experience", "trust", "reputation", "stats"],
    question: "How experienced is Nicks Recruitment Agency?",
    answer: stats.map((s) => `${s.value} ${s.label}`).join(", ") + ".",
    href: "/about",
  });

  // Industries
  entries.push({
    id: "industries",
    topic: "Industries",
    keywords: ["industries", "sectors", "which industries"],
    question: "Which industries do you recruit for?",
    answer: `We recruit across ${industries.join(", ")}.`,
    href: "/job-categories",
  });

  // Core policy facts (fees, medicals, tracking) — kept short and literal
  entries.push(
    {
      id: "fees",
      topic: "Policy",
      keywords: ["fee", "fees", "cost", "pay", "charge", "money", "price"],
      question: "Do candidates pay a recruitment fee?",
      answer:
        "No fee is charged to candidates for employer-sponsored roles. Any government or visa costs are disclosed to you in writing before you sign anything.",
      href: "/faqs",
    },
    {
      id: "medical",
      topic: "Policy",
      keywords: ["medical", "clinic", "health check", "screening", "test"],
      question: "Is the medical lab a hospital?",
      answer:
        "No — our medical lab performs pre-employment screening only, not general hospital care. You can book a slot on the Book Medical page.",
      href: "/book-medical",
    },
    {
      id: "track",
      topic: "Policy",
      keywords: ["track", "status", "where is my application", "reference number"],
      question: "Can I track my application?",
      answer:
        "Yes — use the Track Application page with your reference/ID number to check your current status.",
      href: "/track-application",
    },
    {
      id: "timeline",
      topic: "Policy",
      keywords: ["how long", "timeline", "duration", "when will i fly", "wait"],
      question: "How long does the whole process take?",
      answer: "Typically 4-10 weeks from registration to departure, depending on the role and destination country's visa processing.",
      href: "/faqs",
    },
    {
      id: "contact",
      topic: "Contact",
      keywords: ["contact", "phone", "call", "email", "whatsapp", "office", "address", "location"],
      question: "How do I contact Nicks Recruitment Agency?",
      answer:
        "Call or WhatsApp +254 746 030 545 (24/7 support), or use the Contact page — we're based at Twiga Towers, Murang'a Road, Nairobi, Kenya.",
      href: "/contact",
    }
  );

  return entries;
}

export const knowledgeBase = buildKnowledgeBase();

/* -----------------------------------------------------------------------
   Plain-text context block — this is what you'd hand to a real LLM as
   the RAG context/system prompt once one is wired up.
----------------------------------------------------------------------- */
export function buildKnowledgeContext(): string {
  return knowledgeBase
    .map((e) => `Q: ${e.question}\nA: ${e.answer}${e.href ? ` (link: ${e.href})` : ""}`)
    .join("\n\n");
}

/* -----------------------------------------------------------------------
   Per-page suggested prompts — the widget reads the current pathname
   and shows relevant starter questions instead of a generic list.
----------------------------------------------------------------------- */
export function suggestedQuestionsFor(pathname: string): string[] {
  if (pathname.startsWith("/services")) {
    return [
      "What services do you offer?",
      "Do candidates pay any fee?",
      "How long does placement take?",
    ];
  }
  if (pathname.startsWith("/countries")) {
    return [
      "What jobs are available in the UAE?",
      "What documents do I need?",
      "What's the average salary in Qatar?",
    ];
  }
  if (pathname.startsWith("/jobs") || pathname.startsWith("/job-categories")) {
    return [
      "What jobs do you currently have open?",
      "Are there urgent roles right now?",
      "How do I apply?",
    ];
  }
  if (pathname.startsWith("/training-school")) {
    return ["What courses do you offer?", "How do I book training?"];
  }
  if (pathname.startsWith("/medical") || pathname.startsWith("/book-medical")) {
    return ["Is the medical lab a hospital?", "How do I book a medical test?"];
  }
  if (pathname.startsWith("/track-application")) {
    return ["How do I track my application?", "How long does the process take?"];
  }
  if (pathname.startsWith("/faqs") || pathname.startsWith("/contact")) {
    return ["Do candidates pay a recruitment fee?", "How do I contact the office?"];
  }
  return [
    "Do candidates pay a recruitment fee?",
    "What jobs do you currently have open?",
    "How does the recruitment process work?",
  ];
}

/* -----------------------------------------------------------------------
   Very small guardrail list — topics the bot should decline and hand
   off to a human rather than guess about.
----------------------------------------------------------------------- */
const ESCALATE_KEYWORDS = [
  "legal advice",
  "lawsuit",
  "visa refused",
  "complaint",
  "refund",
  "scam",
  "not paid",
  "unpaid",
  "emergency",
  "passport confiscated",
  "abuse",
];

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export type ChatAnswer = {
  text: string;
  href?: string;
  confidence: number;
  shouldEscalate: boolean;
};

/* -----------------------------------------------------------------------
   Guided conversation engine.

   The widget used to be a bare Q&A box. This turns the first few turns
   into an actual conversation: the assistant introduces itself, asks
   the visitor's name, asks what they're here for, and asks one relevant
   follow-up — then settles into free-form Q&A, using what it learned to
   personalise replies and suggested links. A visitor who just asks a
   direct question at any point gets a direct answer instead of being
   forced through the script — the guided questions are a fallback for
   when there's nothing more specific to respond to, not a gate.
--------------------------------------------------------------------- */

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function extractName(message: string): string | undefined {
  // Visitors type all sorts of things here ("hi", "It's Grace", "grace
  // wanjiru") — take the first alphabetic token that isn't a greeting
  // filler word, and title-case it.
  const fillers = new Set([
    "hi",
    "hello",
    "hey",
    "its",
    "it's",
    "im",
    "i'm",
    "iam",
    "i",
    "am",
    "is",
    "my",
    "name",
    "the",
    "a",
  ]);
  const tokens = message
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const first = tokens.find((t) => !fillers.has(t.toLowerCase()) && t.length > 1);
  return first ? titleCase(first) : undefined;
}

function detectIntent(message: string): VisitorProfile["intent"] {
  const lower = message.toLowerCase();
  if (/(hire|employer|staff|recruit|workforce|candidates? for|company)/.test(lower)) {
    return "employer";
  }
  if (/(train|course|school|certificat)/.test(lower)) {
    return "training";
  }
  if (/(medical|clinic|health|screening|lab)/.test(lower)) {
    return "medical";
  }
  if (/(job|work|vacan|abroad|overseas|apply|hire me|employment)/.test(lower)) {
    return "job_seeker";
  }
  return "general";
}

function detailQuestionFor(intent: VisitorProfile["intent"]): string | null {
  switch (intent) {
    case "job_seeker":
      return "Which country are you most interested in — UAE, Qatar, Saudi Arabia, or somewhere else?";
    case "employer":
      return "What roles are you looking to fill, and roughly how many staff do you need?";
    case "training":
      return "Which course are you interested in — or would you like a list of what we offer?";
    case "medical":
      return "Have you already registered as a candidate with us, or is this your first contact?";
    default:
      return null;
  }
}

export function converse(
  stage: ConversationStage,
  profile: VisitorProfile,
  message: string
): ConverseResult {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  // Escalation guardrail applies at every stage.
  if (ESCALATE_KEYWORDS.some((k) => lower.includes(k))) {
    return {
      text:
        "That sounds like something our team needs to look at directly rather than me guessing. I've flagged this conversation for a staff member — you can also reach us right now on WhatsApp/phone at +254 746 030 545, or via the Contact page.",
      href: "/contact",
      shouldEscalate: true,
      nextStage: "freeform",
      nextProfile: profile,
    };
  }

  // A visitor who asks a real, confidently-matched question at any point
  // gets answered directly rather than being funnelled through the script.
  const directHit = trimmed ? answerQuestion(trimmed) : null;
  const strongDirectHit = directHit && directHit.confidence >= 0.7;

  if (stage === "awaiting_name") {
    if (strongDirectHit) {
      return {
        text: `${directHit!.text} And before we go further — what's your name?`,
        href: directHit!.href,
        shouldEscalate: false,
        nextStage: "awaiting_name",
        nextProfile: profile,
      };
    }
    const name = extractName(trimmed);
    const greeting = name
      ? `Nice to meet you, ${name}! `
      : "Thanks! ";
    return {
      text: `${greeting}What brings you here today — are you looking for a job abroad, looking to hire staff, interested in training, or something else?`,
      shouldEscalate: false,
      nextStage: "awaiting_intent",
      nextProfile: { ...profile, name: name ?? profile.name },
    };
  }

  if (stage === "awaiting_intent") {
    if (strongDirectHit) {
      return {
        text: directHit!.text,
        href: directHit!.href,
        shouldEscalate: false,
        nextStage: "freeform",
        nextProfile: profile,
      };
    }
    const intent = detectIntent(trimmed);
    const detail = detailQuestionFor(intent);
    const namePrefix = profile.name ? `Got it, ${profile.name}. ` : "Got it. ";
    if (!detail) {
      return {
        text: `${namePrefix}What would you like to know — our services, current jobs, fees, or something else?`,
        shouldEscalate: false,
        nextStage: "freeform",
        nextProfile: { ...profile, intent },
      };
    }
    return {
      text: `${namePrefix}${detail}`,
      shouldEscalate: false,
      nextStage: "awaiting_detail",
      nextProfile: { ...profile, intent },
    };
  }

  if (stage === "awaiting_detail") {
    const detailValue = trimmed;
    const namePrefix = profile.name ? `Thanks, ${profile.name}. ` : "Thanks. ";
    let text: string;
    let href: string | undefined;

    if (profile.intent === "job_seeker") {
      text = `${namePrefix}You can browse current openings and apply directly — I'll also answer any specific questions about fees, documents, or the process along the way.`;
      href = "/countries";
    } else if (profile.intent === "employer") {
      text = `${namePrefix}Our team can put together a shortlist for that. You can submit the details on our Request Staff page, or ask me anything about how the employer process works.`;
      href = "/employers/request-staff";
    } else if (profile.intent === "training") {
      text = `${namePrefix}You can see our full course list and book a slot directly — ask me anything about duration, cost, or certification.`;
      href = "/training-school/courses";
    } else if (profile.intent === "medical") {
      text = `${namePrefix}You can book a slot directly, or ask me anything about what the medical screening covers.`;
      href = "/book-medical";
    } else {
      text = `${namePrefix}What would you like to know?`;
    }

    return {
      text,
      href,
      shouldEscalate: false,
      nextStage: "freeform",
      nextProfile: { ...profile, category: detailValue },
    };
  }

  // stage === "freeform" — ordinary knowledge-base Q&A from here on,
  // personalised with the visitor's name when we have it.
  const answer = directHit ?? answerQuestion(trimmed);
  return {
    text: answer.text,
    href: answer.href,
    shouldEscalate: answer.shouldEscalate,
    nextStage: "freeform",
    nextProfile: profile,
  };
}

export function answerQuestion(question: string): ChatAnswer {
  const q = question.trim();
  if (!q) {
    return {
      text: "Could you tell me a bit more about what you're looking for — a job, a service, or help with your application?",
      confidence: 0,
      shouldEscalate: false,
    };
  }

  const lower = q.toLowerCase();
  if (ESCALATE_KEYWORDS.some((k) => lower.includes(k))) {
    return {
      text:
        "That sounds like something our team needs to look at directly rather than me guessing. I've flagged this conversation for a staff member — you can also reach us right now on WhatsApp/phone at +254 746 030 545, or via the Contact page.",
      href: "/contact",
      confidence: 1,
      shouldEscalate: true,
    };
  }

  const qTokens = new Set(normalize(q));
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const haystack = normalize(
      [entry.question, entry.topic, ...entry.keywords].join(" ")
    );
    let score = 0;
    for (const token of haystack) {
      if (qTokens.has(token)) score += 1;
    }
    // small boost for keyword phrase containment (e.g. "uae" inside question)
    for (const kw of entry.keywords) {
      if (kw.length > 2 && lower.includes(kw.toLowerCase())) score += 2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore >= 2) {
    return {
      text: best.answer,
      href: best.href,
      confidence: Math.min(1, bestScore / 6),
      shouldEscalate: false,
    };
  }

  return {
    text:
      "I don't have a confident answer for that from our site content yet. I don't want to guess — you can ask me about our services, countries we place in, current jobs, fees, the application process, or medical/training bookings. For anything else, our team is on WhatsApp/phone at +254 746 030 545, or the Contact page.",
    href: "/contact",
    confidence: 0,
    shouldEscalate: true,
  };
}
