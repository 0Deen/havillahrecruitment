"use strict";
// Centralized, versioned company content: FAQs, process, safety, resources,
// employer services. Pages AND the AI assistant read from here, so staff
// update copy in one place. Every record carries status/version/updatedAt so
// a future admin dashboard (or CMS) can publish, retire and audit entries.
//
// RULE: nothing here may state a fee, visa outcome, timeline, salary or
// government requirement that Ajira Majuu has not confirmed. When unknown we
// say "confirmed by the recruitment team".
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNOWLEDGE = exports.RESOURCES = exports.EMPLOYER_SERVICES = exports.SAFETY_TIPS = exports.HOW_IT_WORKS = exports.FAQS = void 0;
exports.getResource = getResource;
const site_1 = require("@/lib/site");
const META = { status: "published", version: 1, updatedAt: "2026-10-01", source: "ajira-majuu" };
const f = (id, category, q, a, link) => ({
    id, category, q, a, link, ...META,
});
exports.FAQS = [
    f("apply-how", "Applications", "How do I apply?", "Open any job or destination and tap Apply, or go to the Apply page. The form takes a few minutes and works well on a phone. You can also message us on WhatsApp.", { label: "Start an application", href: "/apply" }),
    f("apply-account", "Applications", "Do I need an account?", "No. There is no login, signup or password. You apply directly and our recruitment team follows up using the contact details you give."),
    f("apply-after", "Applications", "What happens after I apply?", "You receive an application reference number on screen (and by email if you provide one). Our team reviews your details and contacts you by phone or WhatsApp. Submitting an application does not guarantee employment.", { label: "See the full process", href: "/how-it-works" }),
    f("apply-whatsapp", "Applications", "Can I apply through WhatsApp?", "You can start a conversation with us on WhatsApp any time. For a complete record of your details, the application form is the quickest way, and it can be filled in on your phone.", { label: "Open the application form", href: "/apply" }),
    f("apply-status", "Applications", "How do I check my application?", "There is no candidate login. Keep your reference number and message or call us — quote the reference and our team will update you.", { label: "Contact Ajira Majuu", href: "/contact" }),
    f("jobs-which", "Jobs", "What jobs are available?", "Current structured listings are shown on the Jobs page. Roles currently listed are for Qatar. Other destinations are active — contact us for roles not yet listed.", { label: "Browse jobs", href: "/jobs" }),
    f("jobs-changes", "Jobs", "Do jobs change?", "Yes. Availability changes with employer demand. Always confirm a role with our team before making any arrangements."),
    f("dest-which", "Destinations", "Which countries do you recruit for?", "Saudi Arabia, the United Arab Emirates, Qatar, Kuwait, Bahrain and Oman, depending on current employer demand.", { label: "View destinations", href: "/destinations" }),
    f("docs-which", "Documents", "What documents do I need?", "It depends on the specific opportunity and destination. The application form asks about your passport status and lets you upload a CV or certificates if you have them. Our team confirms exactly what is required for your role — you are not asked for unnecessary documents."),
    f("docs-passport", "Documents", "I don't have a passport yet. Can I still apply?", "Yes — the form has an option for applicants who still need a passport. Passports are issued by the government, so apply through official government channels only.", { label: "Passport guide", href: "/resources/passport-basics" }),
    f("salary-qatar", "Salaries", "What salaries are offered for Qatar?", "Current Qatar listings: House Help (Experienced Cooks) 1,200 QAR; House Help (First Time) 900 – 1,000 QAR; House Drivers 1,200 QAR during training and 1,600 QAR after; Nannys 1,200 – 1,400 QAR; Home Tutors 1,500 – 1,600 QAR; Caregivers 1,500 QAR; Beauticians 1,500 – 1,600 QAR. Final terms are in the employment contract.", { label: "View Qatar jobs", href: "/destinations/qatar" }),
    f("salary-other", "Salaries", "What about salaries for other countries?", "We have not published verified salary figures for other destinations yet. Contact us for current details rather than relying on figures from other sources."),
    f("benefits-qatar", "Salaries", "Are accommodation and food provided in Qatar?", "For the Qatar roles currently listed, Ajira Majuu has confirmed: accommodation provided, food provided, health insurance provided, off days as per employer agreement, and vacation as per Qatar Labour Law. The signed contract is what governs your terms."),
    f("contract-read", "Contracts", "Why should I read my contract carefully?", "Your employment contract sets out your actual terms. Read it before signing, ask about anything unclear, and keep a copy.", { label: "Contract guide", href: "/resources/understanding-your-contract" }),
    f("travel-promise", "Travel", "Are flights and visas included?", "We do not promise tickets, visas or accommodation unless they are confirmed for a specific role. Ask our team what applies to the opportunity you are considering."),
    f("safety-money", "Safety", "Someone is asking me for money. What should I do?", "Pause and verify. Do not send money to any individual claiming to represent Ajira Majuu. Contact us through the official phone, email or WhatsApp on this website to confirm whether a request is genuine.", { label: "Recruitment safety", href: "/recruitment-safety" }),
    f("safety-official", "Safety", "What are Ajira Majuu's official contact channels?", `Phone ${site_1.COMPANY.phoneDisplay}, email ${site_1.COMPANY.primaryEmail} (also ${site_1.COMPANY.secondaryEmail}), WhatsApp on ${site_1.COMPANY.phoneDisplay}, and our office at ${site_1.COMPANY.address}.`, { label: "Contact page", href: "/contact" }),
    f("process-time", "Recruitment process", "How long does recruitment take?", "Timing depends on the opportunity, the employer and the documents involved, so we do not quote a fixed duration. Our team gives you the current expectation for your role."),
    f("process-steps", "Recruitment process", "What are the steps?", "Application, screening, employer matching, interview or assessment, documentation, required medical checks, training where applicable, pre-departure preparation and deployment.", { label: "How it works", href: "/how-it-works" }),
];
/* -------------------------------------------------------- HOW IT WORKS */
exports.HOW_IT_WORKS = [
    { title: "Find an opportunity", body: "Browse current jobs or a destination page. If your role isn't listed, message us — other destinations are active too." },
    { title: "Submit your application", body: "Fill in the application form on your phone. No account, no password. You receive a reference number straight away." },
    { title: "Candidate screening", body: "Our recruitment team reviews your details and experience and contacts you by phone or WhatsApp." },
    { title: "Employer matching", body: "Where your profile fits a current opportunity, we put it forward. Matching depends on live employer demand — it is never guaranteed." },
    { title: "Interview / assessment", body: "Where the role needs it, qualifying candidates are interviewed or assessed." },
    { title: "Documentation", body: "We guide you through the documents your specific opportunity needs. You are not asked for unnecessary paperwork." },
    { title: "Required medical checks", body: "Completed where required for your destination and role. Our team explains the exact steps when you reach this stage." },
    { title: "Training where applicable", body: "Some roles include training (for example the Qatar house driver role, which lists a training salary and an after-training salary)." },
    { title: "Pre-departure preparation", body: "A briefing and preparation before you travel, including what to carry and what to expect." },
    { title: "Deployment", body: "You travel to begin the confirmed opportunity, with your employment contract." },
];
/* -------------------------------------------------------------- SAFETY */
exports.SAFETY_TIPS = [
    { title: "Use official channels only", body: `Contact us on ${site_1.COMPANY.phoneDisplay} or ${site_1.COMPANY.primaryEmail}. Be cautious of messages from numbers or accounts you have not verified with us.` },
    { title: "Verify before you pay anyone", body: "Do not send money to an individual on the strength of a message or call. Check with Ajira Majuu through our official contacts first." },
    { title: "Read your contract", body: "Your employment contract sets out your real terms. Read it fully, ask questions, and keep your own copy." },
    { title: "Protect your information", body: "Share passport and ID details only through our application form or when our team asks for them through an official channel." },
    { title: "Confirm job details", body: "Salary, duties, location and employer should be clear before you commit. If something is vague, ask — and expect a clear answer." },
    { title: "Report suspicious messages", body: `If someone claims to represent Ajira Majuu and asks for money or documents in a way that feels wrong, tell us at ${site_1.COMPANY.primaryEmail} or on WhatsApp.` },
];
/* ----------------------------------------------------------- EMPLOYERS */
exports.EMPLOYER_SERVICES = [
    { title: "Candidate sourcing", body: "We source Kenyan candidates for the roles you need." },
    { title: "Screening", body: "Our team reviews applicants before they are put forward." },
    { title: "Candidate matching", body: "We match candidate profiles to your requirements. Availability is confirmed case by case — we never promise candidates in advance." },
    { title: "Documentation support", body: "We coordinate candidate documentation for the opportunity." },
    { title: "Recruitment coordination", body: "One team coordinating interviews, communication and next steps." },
    { title: "Pre-departure preparation", body: "Candidates are briefed and prepared before travel." },
];
const R = (r) => ({ ...r, ...META, source: "editorial" });
exports.RESOURCES = [
    R({
        slug: "understanding-your-contract",
        title: "Understanding your employment contract",
        category: "Understanding Employment Contracts",
        summary: "What to check before you sign anything for a job abroad.",
        sections: [
            { heading: "Why the contract matters", body: ["The contract — not a phone call or a chat message — sets out what you and the employer have agreed. If a promise matters to you, it should be written in it."] },
            { heading: "What to look for", body: ["Your job title and main duties.", "Salary amount and currency, and how and when it is paid.", "Working hours, off days and leave.", "Accommodation, food and health cover, if offered.", "Contract length and what happens at the end.", "Who to contact if there is a problem."] },
            { heading: "Before you sign", body: ["Read the whole document. Ask about anything unclear and ask for it in a language you understand. Keep your own copy and take a photo of every page."] },
        ],
        related: [{ label: "Browse jobs", href: "/jobs" }, { label: "Candidate FAQ", href: "/faq" }],
    }),
    R({
        slug: "passport-basics",
        title: "Passport basics for first-time applicants",
        category: "Passport & Documents",
        summary: "What to know if you don't yet have a passport.",
        sections: [
            { heading: "You can still apply", body: ["Our application form has an option for applicants who still need a passport, so you don't have to wait to start."] },
            { heading: "Use official channels", body: ["Kenyan passports are issued by the government. Apply only through official government channels and never pay an individual who promises to speed things up."] },
            { heading: "Keep it safe", body: ["Keep your passport yourself. Keep clear copies and photos separately. Share it only through official recruitment steps."] },
        ],
        related: [{ label: "Start an application", href: "/apply" }, { label: "Documents FAQ", href: "/faq" }],
    }),
    R({
        slug: "preparing-for-your-interview",
        title: "Preparing for a recruitment interview",
        category: "Preparing for Interviews",
        summary: "Simple preparation that helps candidates present themselves well.",
        sections: [
            { heading: "Know the role", body: ["Re-read the job page. Be ready to explain your experience for that specific role in your own words."] },
            { heading: "Be ready to answer clearly", body: ["Previous jobs and responsibilities.", "Languages you speak.", "Why you want to work abroad.", "Your availability."] },
            { heading: "Be honest", body: ["Only claim experience you have. Employers value honesty, and misstatements cause problems later in the process."] },
        ],
        related: [{ label: "How it works", href: "/how-it-works" }, { label: "View jobs", href: "/jobs" }],
    }),
    R({
        slug: "pre-departure-checklist",
        title: "Pre-departure preparation checklist",
        category: "Pre-departure Preparation",
        summary: "A practical list to work through before you travel.",
        sections: [
            { heading: "Paperwork", body: ["Copy of your signed employment contract.", "Copies of your passport and key documents, stored separately from the originals.", "The names and contact details of your employer and of Ajira Majuu."] },
            { heading: "People", body: ["Tell a trusted family member your destination, employer and contacts.", "Agree how you will stay in touch."] },
            { heading: "Mindset", body: ["Ask your recruitment contact anything you are unsure about before departure, not after."] },
        ],
        related: [{ label: "How it works", href: "/how-it-works" }, { label: "Contact us", href: "/contact" }],
    }),
    R({
        slug: "working-in-gulf-countries",
        title: "Working in the Gulf: questions to ask first",
        category: "Working in Gulf Countries",
        summary: "Good questions to ask any recruiter or employer.",
        sections: [
            { heading: "About the job", body: ["What exactly will I be doing, and where?", "Who is my employer?", "What is the salary, and how is it paid?"] },
            { heading: "About daily life", body: ["Where will I live?", "Are meals and health cover included?", "What are my off days and leave?"] },
            { heading: "About the process", body: ["What are the next steps and who will contact me?", "What documents will you need from me, and why?"] },
        ],
        related: [{ label: "Destinations", href: "/destinations" }, { label: "Recruitment safety", href: "/recruitment-safety" }],
    }),
    R({
        slug: "recognising-recruitment-scams",
        title: "Recognising recruitment scams",
        category: "Recruitment Safety",
        summary: "Warning signs to watch for when someone offers you a job abroad.",
        sections: [
            { heading: "Warning signs", body: ["Pressure to pay quickly to a personal account.", "A job offer with no clear employer, duties or contract.", "Promises that sound guaranteed.", "Contact only through an unverified number or account."] },
            { heading: "What to do", body: ["Stop and verify with the agency through its official website and contact details. If in doubt, don't pay and don't share documents."] },
        ],
        related: [{ label: "Recruitment safety", href: "/recruitment-safety" }, { label: "Contact Ajira Majuu", href: "/contact" }],
    }),
];
function getResource(slug) {
    return exports.RESOURCES.find((r) => r.slug === slug && r.status === "published");
}
const k = (id, category, title, answer, link) => ({ id, category, title, answer, link, ...META });
/** The assistant answers factual company questions from here first. */
exports.KNOWLEDGE = [
    k("company", "COMPANY", "About Ajira Majuu", `${site_1.COMPANY.name} is a ${site_1.COMPANY.legalDescriptor.toLowerCase()}. ${site_1.COMPANY.tagline} We are an independent private business — not a government agency or programme.`, { label: "About us", href: "/about" }),
    k("process", "APPLICATION PROCESS", "Recruitment process", "Application, screening, employer matching, interview or assessment, documentation, required medical checks, training where applicable, pre-departure preparation, then deployment.", { label: "How it works", href: "/how-it-works" }),
    k("documents", "DOCUMENTS", "Documents", "Requirements depend on the specific role and destination. The application form asks about your passport status and lets you upload a CV, passport copy or certificates if you have them. Our team confirms exactly what your opportunity needs — I don't want to guess a legal requirement.", { label: "Application form", href: "/apply" }),
    k("training", "TRAINING", "Training", "Some roles include training. For Qatar House Drivers the verified package is 1,200 QAR during training and 1,600 QAR after training. For what training covers and when it happens, our team confirms the details for your role.", { label: "Qatar House Drivers", href: "/jobs/house-drivers-qatar" }),
    k("medical", "MEDICAL", "Medical & health checks", "Required medical checks are part of the process where they apply to your destination and role. Our team tells you the exact steps when you reach that stage. I can't give medical advice or predict results.", { label: "How it works", href: "/how-it-works" }),
    k("travel", "TRAVEL", "Travel & departure", "Pre-departure preparation is part of the process. Flights, visas and accommodation are not promised unless confirmed for a specific role — the team confirms what applies to yours.", { label: "Pre-departure checklist", href: "/resources/pre-departure-checklist" }),
    k("employers", "EMPLOYERS", "For employers", "Employers can request recruitment support covering sourcing, screening, matching, documentation support, coordination and pre-departure preparation. Candidate availability is confirmed case by case.", { label: "Request recruitment support", href: "/for-employers" }),
    k("contact", "CONTACT", "Contact", `Phone/WhatsApp ${site_1.COMPANY.phoneDisplay}. Email ${site_1.COMPANY.primaryEmail} or ${site_1.COMPANY.secondaryEmail}. Office: ${site_1.COMPANY.address}.`, { label: "Contact page", href: "/contact" }),
    k("policy-account", "POLICIES", "No account required", "You do not need an account to apply. No login, signup or password.", { label: "Apply", href: "/apply" }),
    k("policy-fees", "POLICIES", "Fees & payments", "I don't have a verified fee or payment policy to quote, so I won't guess. Please confirm directly with Ajira Majuu through the official channels, and never send money to an individual based on a message alone.", { label: "Recruitment safety", href: "/recruitment-safety" }),
];
