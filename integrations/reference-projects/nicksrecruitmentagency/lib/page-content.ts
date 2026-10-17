// Shared content for straightforward informational pages, grouped by
// section. Each entry becomes one real, statically generated route via
// the section's [slug]/page.tsx + generateStaticParams. Add a row here
// to add a live page — this is what keeps a 40-70 page site from
// meaning 70 hand-duplicated files.

export type SimplePage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const aboutPages: SimplePage[] = [
  {
    slug: "story",
    title: "Our Story",
    eyebrow: "About Us",
    intro: "Nicks Recruitment Agency began as a small domestic placement office and grew into a licensed overseas recruitment agency serving five Gulf countries.",
    sections: [
      { heading: "How we started", body: "Founded to connect local talent with dignified, well-documented overseas employment, at a time when informal brokers dominated the market." },
      { heading: "Where we are today", body: "A full recruitment, training and medical-screening operation, with a dedicated training centre and in-house laboratory." },
    ],
  },
  {
    slug: "mission-vision",
    title: "Mission & Vision",
    eyebrow: "About Us",
    intro: "Our mission is dignified, transparent overseas employment. Our vision is to be the most trusted recruitment partner in the region.",
    sections: [
      { heading: "Mission", body: "Place every candidate with a verified employer, under a fair contract, with no hidden costs." },
      { heading: "Vision", body: "To set the regional standard for ethical, transparent labour recruitment." },
    ],
  },
  {
    slug: "ceo-message",
    title: "CEO Message",
    eyebrow: "About Us",
    intro: "A message from our leadership on the standards we hold ourselves to.",
    sections: [
      { heading: "Our commitment", body: "Every candidate who walks through our door is someone's son, daughter, or parent. We treat every file that way." },
    ],
  },
  {
    slug: "why-choose-us",
    title: "Why Choose Us",
    eyebrow: "About Us",
    intro: "Licensed, transparent, and present at every stage of your journey — from registration to employer pickup.",
    sections: [
      { heading: "Full-service model", body: "Recruitment, training and medical screening under one roof, so nothing falls between providers." },
    ],
  },
  {
    slug: "timeline",
    title: "Company Timeline",
    eyebrow: "About Us",
    intro: "Key milestones in our growth as a recruitment agency.",
    sections: [
      { heading: "Milestones", body: "From first licensing through to opening our training school and medical laboratory." },
    ],
  },
  {
    slug: "licenses",
    title: "Licenses",
    eyebrow: "About Us",
    intro: "Our recruitment operations are licensed and regularly audited by the relevant government authorities.",
    sections: [{ heading: "Licensing", body: "License documentation is available on request for verification by candidates and employer partners." }],
  },
  {
    slug: "certifications",
    title: "Certifications",
    eyebrow: "About Us",
    intro: "Certifications held by our agency and training school.",
    sections: [{ heading: "Standards", body: "Our training school issues recognised completion certificates for each course." }],
  },
  {
    slug: "partners",
    title: "Partners",
    eyebrow: "About Us",
    intro: "We work with 300+ verified employers across construction, hospitality, healthcare and more.",
    sections: [{ heading: "Partner network", body: "Every employer partner is vetted before we place a candidate with them." }],
  },
  {
    slug: "anti-trafficking-policy",
    title: "Anti-Human Trafficking Policy",
    eyebrow: "About Us",
    intro: "We maintain a zero-tolerance policy on human trafficking and forced labour at every stage of recruitment.",
    sections: [{ heading: "Our stance", body: "No candidate pays a placement fee for employer-sponsored roles, and no candidate's documents are withheld against their will." }],
  },
  {
    slug: "equal-opportunity-policy",
    title: "Equal Opportunity Policy",
    eyebrow: "About Us",
    intro: "We recruit and place candidates without discrimination on the basis of ethnicity, religion, or gender, within the bounds of role-specific employer requirements.",
    sections: [{ heading: "Our commitment", body: "Every candidate is assessed on qualification and fit for the role." }],
  },
  {
    slug: "careers",
    title: "Careers at Nicks",
    eyebrow: "About Us",
    intro: "Join our internal team across recruitment, training, and operations.",
    sections: [{ heading: "Open internal roles", body: "Contact us directly to enquire about internal opportunities." }],
  },
];

export const medicalPages: SimplePage[] = [
  {
    slug: "required-tests",
    title: "Required Gulf Medicals",
    eyebrow: "Medical Laboratory",
    intro: "Each destination country requires a standard pre-employment medical fitness assessment before a visa is issued.",
    sections: [
      { heading: "Standard panel", body: "Blood tests, urine tests, chest X-ray, vision, hearing and a general physical examination." },
      { heading: "Scope", body: "This laboratory performs pre-employment screening only — it does not provide treatment." },
    ],
  },
  {
    slug: "faqs",
    title: "Medical Laboratory FAQs",
    eyebrow: "Medical Laboratory",
    intro: "Common questions about the pre-employment medical process.",
    sections: [
      { heading: "Is this a hospital?", body: "No. We conduct pre-employment screening only and do not treat illness." },
      { heading: "How long do results take?", body: "Most panels are processed within 3-5 working days." },
    ],
  },
  {
    slug: "preparation",
    title: "Preparation Before Medical",
    eyebrow: "Medical Laboratory",
    intro: "How to prepare for your pre-employment medical appointment.",
    sections: [{ heading: "Before you arrive", body: "Bring a valid ID, fast if instructed for blood work, and bring any existing prescription documentation." }],
  },
];

// Resource/guide library — practical, on-topic articles for candidates
// going through overseas recruitment (not generic filler pages). Each
// row becomes a real route via app/resources/[slug]/page.tsx.
export const resourcePages: SimplePage[] = [
  {
    slug: "visa-guide",
    title: "Visa & Documentation Guide",
    eyebrow: "Resources",
    intro: "A plain-language walkthrough of the visa and documentation steps involved in an overseas placement.",
    sections: [
      { heading: "Core documents", body: "Valid passport (12+ months validity), national ID, birth certificate, police clearance certificate, and passport photos are needed for most applications." },
      { heading: "Employer-side documents", body: "Your employer's offer letter and work permit are processed once your application and medical clearance are complete." },
      { heading: "Timeline", body: "Visa processing typically runs alongside medical and training, so it rarely adds extra waiting time on its own." },
    ],
  },
  {
    slug: "passport-guide",
    title: "How to Get or Renew a Kenyan Passport",
    eyebrow: "Resources",
    intro: "What you need before you can start an overseas application — a valid passport.",
    sections: [
      { heading: "New applications", body: "Apply through the Immigration Department's eCitizen portal; you'll need your national ID and a passport photo meeting the official specification." },
      { heading: "Renewals", body: "If your passport has less than a year of validity left, renew it early — most destination countries require at least 6-12 months validity to issue a visa." },
    ],
  },
  {
    slug: "cv-writing-tips",
    title: "CV Writing Tips for Overseas Jobs",
    eyebrow: "Resources",
    intro: "How to put together a CV that gets shortlisted by our verified employer partners.",
    sections: [
      { heading: "Keep it factual", body: "List your real work history, dates, and specific duties — employers verify experience during interviews." },
      { heading: "Highlight relevant skills", body: "For trade and hospitality roles, certifications and hands-on experience matter more than a long CV." },
    ],
  },
  {
    slug: "interview-preparation",
    title: "Interview Preparation Guide",
    eyebrow: "Resources",
    intro: "What to expect and how to prepare for employer interviews, whether in person or by video call.",
    sections: [
      { heading: "Before the interview", body: "Review the job description and be ready to explain your relevant experience clearly and honestly." },
      { heading: "During the interview", body: "Employers commonly ask about availability, physical requirements for the role, and prior experience in similar work." },
    ],
  },
  {
    slug: "salary-expectations",
    title: "Salary & Cost of Living Guide",
    eyebrow: "Resources",
    intro: "Understanding take-home pay and cost of living in common destination countries.",
    sections: [
      { heading: "Reading a salary offer", body: "Check whether accommodation, meals, and transport are included separately from the stated salary — this varies by employer." },
      { heading: "Country pages", body: "See each destination's country page for typical salary ranges by role." },
    ],
  },
  {
    slug: "contract-review-guide",
    title: "Understanding Your Employment Contract",
    eyebrow: "Resources",
    intro: "What to check in your contract before you sign it.",
    sections: [
      { heading: "Key clauses", body: "Confirm your job title, salary, working hours, leave entitlement, and contract duration match what you were told verbally." },
      { heading: "Ask before you sign", body: "You're entitled to ask questions about any clause you don't understand before signing — our team can walk through it with you." },
    ],
  },
  {
    slug: "pre-departure-checklist",
    title: "Pre-Departure Checklist",
    eyebrow: "Resources",
    intro: "Everything to sort out in the final weeks before you fly.",
    sections: [
      { heading: "Documents to carry", body: "Passport, visa, contract copy, medical certificate, and employer contact details — keep both physical and digital copies." },
      { heading: "Final steps", body: "Confirm your flight details, airport pickup arrangements, and how to reach our team while you travel." },
    ],
  },
  {
    slug: "life-in-uae",
    title: "Life in the UAE: What to Expect",
    eyebrow: "Resources",
    intro: "A practical overview of daily life, culture, and customs for workers relocating to the UAE.",
    sections: [
      { heading: "Culture and customs", body: "The UAE is a multicultural country; dress modestly in public spaces and be aware of local laws around conduct and public behaviour." },
      { heading: "Day to day", body: "Most employer-sponsored roles include accommodation and transport; your contract will specify the details." },
    ],
  },
  {
    slug: "life-in-qatar",
    title: "Life in Qatar: What to Expect",
    eyebrow: "Resources",
    intro: "A practical overview of daily life for workers relocating to Qatar.",
    sections: [
      { heading: "Culture and customs", body: "Qatar is a conservative Gulf state — modest dress and respectful public conduct are expected of all residents." },
      { heading: "Support on arrival", body: "Your employer and our partner network provide orientation support in your first weeks." },
    ],
  },
  {
    slug: "life-in-saudi-arabia",
    title: "Life in Saudi Arabia: What to Expect",
    eyebrow: "Resources",
    intro: "A practical overview of daily life for workers relocating to Saudi Arabia.",
    sections: [
      { heading: "Culture and customs", body: "Saudi Arabia has specific local laws and customs around dress and public conduct that differ from Kenya — your pre-departure training covers this in detail." },
      { heading: "Getting settled", body: "Most roles include employer-arranged housing; ask your recruitment consultant what's included in your specific offer." },
    ],
  },
  {
    slug: "worker-rights",
    title: "Know Your Rights as an Overseas Worker",
    eyebrow: "Resources",
    intro: "A summary of the protections that apply to you as a legally placed overseas worker.",
    sections: [
      { heading: "Your contract is binding", body: "Your employer must honour the salary, role, and conditions stated in your signed contract." },
      { heading: "Your documents", body: "Your passport should not be permanently withheld from you against your will. If you experience a problem, contact us or the Kenyan embassy in your host country." },
    ],
  },
  {
    slug: "avoiding-recruitment-scams",
    title: "How to Avoid Recruitment Scams",
    eyebrow: "Resources",
    intro: "Warning signs of fraudulent recruiters, and how to verify a legitimate agency.",
    sections: [
      { heading: "Red flags", body: "Be cautious of agents who demand large upfront cash payments, refuse to give a written contract, or pressure you to travel immediately." },
      { heading: "Verify us", body: "You can verify our licensing directly with us, and we never ask candidates to pay a placement fee for employer-sponsored roles." },
    ],
  },
  {
    slug: "remittance-guide",
    title: "Sending Money Home: A Remittance Guide",
    eyebrow: "Resources",
    intro: "Practical guidance on sending money home safely and affordably once you're working abroad.",
    sections: [
      { heading: "Comparing providers", body: "Compare exchange rates and transfer fees across mobile money and bank transfer providers before committing to one regularly." },
      { heading: "Budgeting", body: "Many workers set a fixed monthly remittance amount aligned with their pay cycle to keep finances predictable for family at home." },
    ],
  },
  {
    slug: "family-support-guide",
    title: "Support for Families Left Behind",
    eyebrow: "Resources",
    intro: "Guidance for the families of candidates working overseas.",
    sections: [
      { heading: "Staying in touch", body: "Most employer-provided accommodation includes wifi or a local SIM allowance for regular contact home." },
      { heading: "If you need to reach us", body: "Families can contact our office directly for updates or if they're unable to reach their relative abroad." },
    ],
  },
  {
    slug: "returning-home-guide",
    title: "Returning Home: Reintegration Guide",
    eyebrow: "Resources",
    intro: "What to plan for when your contract ends and you return to Kenya.",
    sections: [
      { heading: "Before you fly back", body: "Confirm your final settlement, end-of-service benefits, and exit clearance with your employer before departure." },
      { heading: "Contract renewal", body: "If you'd like to extend or renew your contract, speak to your consultant well before your current contract ends." },
    ],
  },
  {
    slug: "domestic-worker-guide",
    title: "A Guide for Domestic Workers",
    eyebrow: "Resources",
    intro: "Role-specific guidance for candidates placed in domestic work positions.",
    sections: [
      { heading: "Typical duties", body: "Housekeeping, childcare, or eldercare duties vary by household — your contract should specify your exact role." },
      { heading: "Rest and leave", body: "Your contract should state your weekly rest day and annual leave entitlement clearly." },
    ],
  },
  {
    slug: "construction-worker-guide",
    title: "A Guide for Construction Workers",
    eyebrow: "Resources",
    intro: "Role-specific guidance for candidates placed in construction and trade positions.",
    sections: [
      { heading: "Site safety", body: "Employers are required to provide safety equipment (PPE) appropriate to your trade — our training school covers basic site safety before you travel." },
      { heading: "Trade certification", body: "Relevant trade certificates from our training school can strengthen your placement and pay grade." },
    ],
  },
  {
    slug: "healthcare-worker-guide",
    title: "A Guide for Healthcare Support Workers",
    eyebrow: "Resources",
    intro: "Role-specific guidance for candidates placed in healthcare support positions.",
    sections: [
      { heading: "Qualifications", body: "Healthcare support roles typically require relevant certification or documented prior experience, verified before placement." },
      { heading: "Licensing", body: "Some destination countries require a local licensing exam or credential verification — our team will advise if this applies to your role." },
    ],
  },
  {
    slug: "hospitality-worker-guide",
    title: "A Guide for Hospitality Workers",
    eyebrow: "Resources",
    intro: "Role-specific guidance for candidates placed in hotel, restaurant, and hospitality positions.",
    sections: [
      { heading: "Typical duties", body: "Roles range from housekeeping and food service to front-of-house — your contract specifies your exact department and duties." },
      { heading: "Growth opportunities", body: "Hospitality employers in the Gulf often promote internally, so strong performance can lead to role advancement." },
    ],
  },
  {
    slug: "diaspora-community",
    title: "Our Diaspora Community Network",
    eyebrow: "Resources",
    intro: "How past and current candidates stay connected with each other and with us after departure.",
    sections: [
      { heading: "Peer support", body: "Many candidates find it helpful to connect with others already placed in the same country or city before they travel." },
      { heading: "Staying in touch with us", body: "Our team remains reachable by phone and WhatsApp throughout your contract, not just before departure." },
    ],
  },
];

export const employerPages: SimplePage[] = [
  {
    slug: "hire-workers",
    title: "Hire Workers",
    eyebrow: "For Employers",
    intro: "Submit your staffing requirement and receive a shortlist of screened, trained candidates.",
    sections: [{ heading: "How it works", body: "Share your role specification, and our team sources, screens and shortlists candidates against it." }],
  },
  {
    slug: "recruitment-process",
    title: "Recruitment Process (Employers)",
    eyebrow: "For Employers",
    intro: "Our employer-side process, from specification to arrival.",
    sections: [{ heading: "Process", body: "Specification, sourcing, screening, interview, medical, visa, deployment, and post-arrival support." }],
  },
  {
    slug: "industries-served",
    title: "Industries Served",
    eyebrow: "For Employers",
    intro: "We place candidates across construction, hospitality, healthcare support, domestic work, security, manufacturing and more.",
    sections: [{ heading: "Sectors", body: "See our full industries list for the complete range of roles we recruit for." }],
  },
  {
    slug: "candidate-database",
    title: "Candidate Database",
    eyebrow: "For Employers",
    intro: "Employer partners can request access to our screened candidate database by contacting our team directly.",
    sections: [{ heading: "Access", body: "Candidate shortlists are shared directly with registered employer partners — get in touch to set up access." }],
  },
  {
    slug: "request-staff",
    title: "Request Staff",
    eyebrow: "For Employers",
    intro: "Submit a staffing request and our team will respond with a shortlist timeline.",
    sections: [{ heading: "Submitting a request", body: "Complete the request form with role, headcount, and timeline." }],
  },
];
