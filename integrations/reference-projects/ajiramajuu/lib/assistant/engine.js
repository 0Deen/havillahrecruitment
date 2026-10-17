"use strict";
// Deterministic "tool" layer for the AI assistant.
//
// Factual questions (jobs, salaries, benefits, contact, process, safety) are
// answered HERE, straight from the structured records in data/jobs.ts and
// data/content.ts — never from a language model's memory. Only when no tool
// matches does the API route fall back to OpenAI (with the same records
// injected as grounding). This is the "retrieve first, never guess" rule.
//
// Tools (mapped to the brief's names):
//   searchJobs / getJobDetails / getDestination / getDestinationJobs /
//   getSalary / getCompanyInformation / getRequiredDocuments /
//   getTrainingInformation / getMedicalInformation / contactSupport /
//   getApplicationStatus (always escalates — there is no candidate login)
Object.defineProperty(exports, "__esModule", { value: true });
exports.escalationReply = escalationReply;
exports.routeMessage = routeMessage;
exports.buildGroundingContext = buildGroundingContext;
const jobs_1 = require("@/data/jobs");
const content_1 = require("@/data/content");
const site_1 = require("@/lib/site");
const whatsapp_1 = require("@/lib/whatsapp");
/* ---------------------------------------------------------- shared bits */
const wa = (message) => ({
    label: "WhatsApp Ajira Majuu",
    href: (0, whatsapp_1.buildWhatsAppUrl)(message),
    kind: "whatsapp",
    external: true,
});
const call = { label: `Call ${site_1.COMPANY.phoneDisplay}`, href: site_1.COMPANY.phoneHref, kind: "call", external: true };
const link = (label, href, kind = "secondary") => ({ label, href, kind });
const KB = (id) => content_1.KNOWLEDGE.find((k) => k.id === id && k.status === "published");
const ESCALATE = "I don't currently have verified information for that. I can connect you with Ajira Majuu support.";
function escalationReply() {
    return {
        reply: `${ESCALATE} Our team can confirm the details directly.`,
        actions: [wa((0, whatsapp_1.generalWhatsAppMessage)()), call, link("Contact page", "/contact")],
        quickReplies: ["Find a job", "How do I apply?"],
        confidence: "low",
        topic: "escalation",
    };
}
/** Remembers the country / role mentioned most recently in the conversation. */
function conversationContext(messages) {
    const userTexts = messages.filter((m) => m.role === "user").map((m) => m.content);
    let destination;
    let jobs = [];
    for (let i = userTexts.length - 1; i >= 0; i--) {
        if (!destination)
            destination = (0, jobs_1.findDestinationInText)(userTexts[i]);
        if (jobs.length === 0)
            jobs = (0, jobs_1.detectJobsInText)(userTexts[i]);
        if (destination && jobs.length)
            break;
    }
    if (destination)
        jobs = jobs.filter((j) => j.countrySlug === destination.slug);
    return { destination, jobs };
}
/* ---------------------------------------------------------- reply parts */
function jobLine(j) {
    return `• ${j.title} — ${j.salary}`;
}
function jobsReply(ctx) {
    const { destination, jobs } = ctx;
    if (destination) {
        const list = jobs.length ? jobs : (0, jobs_1.getJobsByCountrySlug)(destination.slug);
        if (list.length === 0) {
            return {
                reply: `Ajira Majuu does recruit for ${destination.name}, but we don't currently have a matching opportunity listed on the website. Our team can confirm what is available right now.`,
                actions: [wa((0, whatsapp_1.destinationWhatsAppMessage)(destination.name)), link(`Explore ${destination.name}`, `/destinations/${destination.slug}`), link("Explore other destinations", "/destinations")],
                quickReplies: ["Show Qatar jobs", "How do I apply?"],
                confidence: "high",
                topic: "jobs-none",
            };
        }
        const single = list.length === 1 ? list[0] : undefined;
        return {
            reply: single
                ? `Yes — here is the ${destination.name} opportunity currently listed:\n\n${jobLine(single)}`
                : `Here are the ${destination.name} opportunities currently listed:\n\n${list.map(jobLine).join("\n")}\n\nWhich one would you like to explore?`,
            actions: single
                ? [link("View job", `/jobs/${single.slug}`, "primary"), link("Apply now", (0, jobs_1.jobApplyHref)(single), "primary"), link(`Explore ${destination.name}`, `/destinations/${destination.slug}`)]
                : [link(`View ${destination.name} jobs`, `/destinations/${destination.slug}`, "primary"), link("Apply now", (0, jobs_1.destinationApplyHref)(destination), "primary"), wa((0, whatsapp_1.destinationWhatsAppMessage)(destination.name))],
            quickReplies: single ? ["What are the benefits?", "How do I apply?"] : list.slice(0, 4).map((j) => j.title),
            confidence: "high",
            topic: "jobs",
        };
    }
    if (jobs.length) {
        const j = jobs[0];
        return {
            reply: jobs.length === 1
                ? `${j.title} (${j.country}): ${j.salary}.`
                : `These listed roles match:\n\n${jobs.map((x) => `${jobLine(x)} (${x.country})`).join("\n")}`,
            actions: jobs.length === 1
                ? [link("View job", `/jobs/${j.slug}`, "primary"), link("Apply now", (0, jobs_1.jobApplyHref)(j), "primary")]
                : [link("Browse all jobs", "/jobs", "primary")],
            quickReplies: ["What are the benefits?", "How do I apply?"],
            confidence: "high",
            topic: "jobs",
        };
    }
    const active = (0, jobs_1.getActiveJobs)();
    const countries = Array.from(new Set(active.map((j) => j.country)));
    const others = jobs_1.destinations.filter((d) => !countries.includes(d.name)).map((d) => d.name);
    return {
        reply: `Current structured opportunities are listed for ${countries.join(", ")}. We also recruit for ${others.join(", ")}, but specific roles there aren't listed yet — our team can confirm what's available.\n\nWhich destination or type of work are you interested in?`,
        actions: [link("Browse all jobs", "/jobs", "primary"), link("Destinations", "/destinations"), wa((0, whatsapp_1.generalWhatsAppMessage)())],
        quickReplies: ["Qatar jobs", "Driver jobs", "Caregiver jobs", "Other countries"],
        confidence: "high",
        topic: "jobs-overview",
    };
}
function salaryReply(ctx) {
    if (ctx.jobs.length) {
        const lines = ctx.jobs.map((j) => `• ${j.title}: ${j.salary}`).join("\n");
        const j = ctx.jobs[0];
        const driver = ctx.jobs.some((x) => x.slug === "house-drivers-qatar");
        return {
            reply: `For the supplied ${j.country} opportunity:\n\n${lines}${driver ? "\n\nThe driver figure is 1,200 QAR during training and 1,600 QAR after training." : ""}\n\nFinal terms are set out in your employment contract.`,
            actions: ctx.jobs.length === 1
                ? [link("View job", `/jobs/${j.slug}`, "primary"), link("Apply now", (0, jobs_1.jobApplyHref)(j), "primary")]
                : [link("View jobs", "/jobs", "primary")],
            quickReplies: ["What benefits are provided?", "How do I apply?"],
            confidence: "high",
            topic: "salary",
        };
    }
    if (ctx.destination && ctx.destination.slug !== "qatar") {
        return {
            reply: `We haven't published verified salary figures for ${ctx.destination.name}, so I won't guess. Our team can confirm current details.`,
            actions: [wa((0, whatsapp_1.destinationWhatsAppMessage)(ctx.destination.name)), link(`Explore ${ctx.destination.name}`, `/destinations/${ctx.destination.slug}`)],
            quickReplies: ["Show Qatar salaries"],
            confidence: "high",
            topic: "salary-unavailable",
        };
    }
    const qatar = (0, jobs_1.getJobsByCountrySlug)("qatar");
    return {
        reply: `Verified salaries for the Qatar opportunities currently listed:\n\n${qatar.map(jobLine).join("\n")}\n\nFinal terms are set out in your employment contract.`,
        actions: [link("View Qatar jobs", "/destinations/qatar", "primary"), link("Apply now", "/apply?country=Qatar", "primary")],
        quickReplies: ["Do they provide accommodation?", "How do I apply?"],
        confidence: "high",
        topic: "salary",
    };
}
function benefitsReply(ctx) {
    if (ctx.destination && ctx.destination.slug !== "qatar") {
        return {
            reply: `I don't have confirmed benefits information for ${ctx.destination.name} yet, and I don't want to assume it matches Qatar. Our team can confirm.`,
            actions: [wa((0, whatsapp_1.destinationWhatsAppMessage)(ctx.destination.name)), link("Contact page", "/contact")],
            quickReplies: ["Show Qatar benefits"],
            confidence: "high",
            topic: "benefits-unavailable",
        };
    }
    return {
        reply: `For the supplied Qatar employment information:\n\n${jobs_1.QATAR_CONFIRMED_BENEFITS.map((b) => `• ${b}`).join("\n")}\n\nThe signed employment contract governs your final terms.`,
        actions: [link("View Qatar opportunities", "/destinations/qatar", "primary"), link("Apply now", "/apply?country=Qatar", "primary")],
        quickReplies: ["What are the salaries?", "How do I apply?"],
        confidence: "high",
        topic: "benefits",
    };
}
const knowledgeReply = (id, topic, quick = []) => {
    const k = KB(id);
    if (!k)
        return escalationReply();
    return {
        reply: k.answer,
        actions: [...(k.link ? [link(k.link.label, k.link.href, "primary")] : []), wa((0, whatsapp_1.generalWhatsAppMessage)())],
        quickReplies: quick,
        confidence: "high",
        topic,
    };
};
/* --------------------------------------------------------------- router */
const has = (t, ...needles) => needles.some((n) => t.includes(n));
function routeMessage(messages) {
    const last = [...messages].reverse().find((m) => m.role === "user");
    if (!last)
        return null;
    const t = last.content.toLowerCase().trim();
    const ctx = conversationContext(messages);
    // greetings
    if (t.length < 28 && /^(hi|hello|hey|habari|mambo|jambo|sasa|niaje|good (morning|afternoon|evening))\b/.test(t)) {
        return {
            reply: "Hello — I can help you find current jobs, understand the process, or reach the Ajira Majuu team. What are you looking for?",
            actions: [],
            quickReplies: ["Find a job", "Destinations", "How do I apply?", "Talk to Ajira Majuu"],
            confidence: "high",
            topic: "greeting",
        };
    }
    // safety / money — highest priority, never improvise
    if (has(t, "asking me for money", "asked me for money", "asks for money", "send money", "send them money", "scam", "fraud", "fake agent", "is ajira majuu real", "are you legit", "legit", "genuine", "someone contacted", "mpesa", "m-pesa", "pay for the job", "deposit")) {
        return {
            reply: "Please be careful. I can't confirm any payment request, and I don't want to give you payment information I can't verify.\n\nDo not send money to an individual. Use the official Ajira Majuu channels to check whether a request is legitimate.",
            actions: [link("Recruitment safety", "/recruitment-safety", "primary"), wa("Hi Ajira Majuu, I want to verify a message/request I received about a job."), call],
            quickReplies: ["What are your official contacts?"],
            confidence: "high",
            topic: "safety",
        };
    }
    // application status — there is no login, so never claim to know a status
    if (has(t, "status", "track", "my application", "follow up", "follow-up", "did you receive", "check my application")) {
        return {
            reply: "There's no candidate login, and I can't see individual application records, so I won't guess a status. Quote your reference number (AJM-…) to the team and they'll update you directly.",
            actions: [wa("Hi Ajira Majuu, I'd like an update on my application. My reference number is: "), call, link("Contact page", "/contact")],
            quickReplies: ["What happens after I apply?"],
            confidence: "high",
            topic: "status",
        };
    }
    if (has(t, "account", "log in", "login", "sign up", "signup", "register", "password")) {
        return knowledgeReply("policy-account", "account", ["How do I apply?", "What documents do I need?"]);
    }
    if (has(t, "apply") && has(t, "whatsapp")) {
        return {
            reply: "You can message us on WhatsApp any time. For a complete record of your details, the application form is quickest — it works well on a phone and needs no account.",
            actions: [link("Start application", "/apply", "primary"), wa((0, whatsapp_1.generalWhatsAppMessage)())],
            quickReplies: ["What documents do I need?"],
            confidence: "high",
            topic: "apply-whatsapp",
        };
    }
    if (has(t, "employer", "manpower", "hire workers", "need workers", "recruit workers", "request workers", "looking for workers", "domestic workers for")) {
        return knowledgeReply("employers", "employer", ["Contact Ajira Majuu"]);
    }
    if (has(t, "contact", "phone number", "call you", "email", "whatsapp", "address", "office", "where are you", "location", "reach you", "talk to", "human", "agent", "support")) {
        return {
            reply: `You can reach Ajira Majuu here:\n\n• Phone / WhatsApp: ${site_1.COMPANY.phoneDisplay}\n• Email: ${site_1.COMPANY.primaryEmail}\n• Also: ${site_1.COMPANY.secondaryEmail}\n• Office: ${site_1.COMPANY.address}`,
            actions: [wa((0, whatsapp_1.generalWhatsAppMessage)()), call, { label: "Email us", href: `mailto:${site_1.COMPANY.primaryEmail}`, kind: "email", external: true }, link("Contact page", "/contact")],
            quickReplies: ["Find a job", "How do I apply?"],
            confidence: "high",
            topic: "contact",
        };
    }
    if (has(t, "document", "passport", " cv", "certificate", "what do i need", "requirement", "required")) {
        const base = knowledgeReply("documents", "documents", ["How do I apply?", "I don't have a passport"]);
        return { ...base, actions: [link("Start application", "/apply", "primary"), link("Passport guide", "/resources/passport-basics"), ...base.actions.slice(-1)] };
    }
    if (has(t, "training"))
        return knowledgeReply("training", "training", ["Driver salary", "How do I apply?"]);
    if (has(t, "medical", "health check", "blood test"))
        return knowledgeReply("medical", "medical", ["What is the process?"]);
    if (has(t, "visa", "flight", "ticket", "air ticket", "travel", "depart"))
        return knowledgeReply("travel", "travel", ["What is the process?"]);
    if (has(t, "accommodation", "food", "insurance", "off day", "vacation", "annual leave", "benefit", "housing", "meals", "provided"))
        return benefitsReply(ctx);
    if (has(t, "salary", "salaries", "earn", "how much", "wage", "income", "paid", "pay"))
        return salaryReply(ctx);
    if (has(t, "how do i apply", "how to apply", "apply", "application form", "start application", "i want to apply")) {
        const j = ctx.jobs[0];
        const href = j ? (0, jobs_1.jobApplyHref)(j) : ctx.destination ? (0, jobs_1.destinationApplyHref)(ctx.destination) : "/apply";
        return {
            reply: `Applying takes a few minutes and needs no account. ${j ? `I'll pre-select ${j.title} in ${j.country} for you.` : ctx.destination ? `I'll pre-select ${ctx.destination.name} for you.` : ""}\n\nAfter you submit you get a reference number, and our team contacts you by phone or WhatsApp. Submitting doesn't guarantee employment.`,
            actions: [link("Apply now", href, "primary"), wa(j ? (0, whatsapp_1.jobWhatsAppMessage)(j.title, j.country) : (0, whatsapp_1.generalWhatsAppMessage)())],
            quickReplies: ["What documents do I need?", "What happens after I apply?"],
            confidence: "high",
            topic: "apply",
        };
    }
    if (has(t, "process", "steps", "what happens", "after i apply", "how long", "how it works", "timeline")) {
        return knowledgeReply("process", "process", ["How do I apply?", "What documents do I need?"]);
    }
    if (has(t, "who are you", "about ajira", "what is ajira", "what do you do", "tell me about")) {
        return knowledgeReply("company", "company", ["Find a job", "Destinations"]);
    }
    if (has(t, "job", "jobs", "vacanc", "opportunit", "kazi", "hiring", "work in", "work as", "position", "show me", "find me", "available") || ctx.jobs.length || ctx.destination) {
        // Only treat a bare destination/role mention as a jobs request if the latest message contained it.
        const latest = { destination: (0, jobs_1.findDestinationInText)(t), jobs: (0, jobs_1.detectJobsInText)(t) };
        if (latest.destination || latest.jobs.length || has(t, "job", "jobs", "vacanc", "opportunit", "kazi", "hiring", "show me", "find me", "available")) {
            return jobsReply(latest.destination || latest.jobs.length ? { destination: latest.destination ?? ctx.destination, jobs: latest.jobs.length ? latest.jobs : ctx.jobs } : ctx);
        }
    }
    // Short chip answers like "yes" with a role in context
    return null;
}
/** Compact grounding text for the model fallback (never contains private data). */
function buildGroundingContext() {
    const jobs = (0, jobs_1.getActiveJobs)()
        .map((j) => `- ${j.title} (${j.country}): ${j.salary}. Page: /jobs/${j.slug}. Apply: /apply?country=${encodeURIComponent(j.country)}&job=${encodeURIComponent(j.title)}`)
        .join("\n");
    const benefits = jobs_1.QATAR_CONFIRMED_BENEFITS.join("; ");
    const kb = content_1.KNOWLEDGE.filter((k) => k.status === "published")
        .map((k) => `- [${k.category}] ${k.title}: ${k.answer}`)
        .join("\n");
    return `\n\n=== LIVE RECORDS (retrieved from Ajira Majuu's structured data; treat as the only source of truth) ===\nACTIVE JOBS:\n${jobs}\n\nCONFIRMED QATAR BENEFITS: ${benefits}\n\nCOMPANY KNOWLEDGE:\n${kb}\n\nSITE FACTS: No account/login is required to apply. Application statuses cannot be looked up through the assistant — direct people to WhatsApp/phone with their AJM reference. Official email: ${site_1.COMPANY.primaryEmail} (also ${site_1.COMPANY.secondaryEmail}). If a fact is not above, say you don't have verified information and offer human support.`;
}
