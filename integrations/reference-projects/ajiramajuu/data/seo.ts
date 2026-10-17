import { getActiveJobs } from "@/data/jobs";

export interface SeoLanding {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  links: { label: string; href: string; description: string }[];
}

const currentJobs = getActiveJobs();

export const SEO_LANDINGS: Record<string, SeoLanding> = {
  "jobs-in-kenya": {
    slug: "jobs-in-kenya",
    metaTitle: "Jobs in Kenya & Jobs Abroad for Kenyans | Ajira Majuu",
    title: "Jobs in Kenya and opportunities beyond Kenya",
    description: "Explore Ajira Majuu job opportunities for Kenyan candidates, including overseas jobs, Gulf vacancies and recruitment support from Kenya.",
    eyebrow: "Ajira · Kazi · Opportunities",
    intro: "Looking for ajira, kazi or a genuine overseas opportunity? Ajira Majuu brings current recruitment information, job openings and application guidance into one clear place for Kenyan candidates.",
    sections: [
      { heading: "A clearer way to search for work", paragraphs: [
        "Use the Jobs section for current vacancies and the destination pages for country-specific opportunities. Each live listing is presented with the information Ajira Majuu has on file, rather than invented details.",
        "For overseas work, start with Gulf destinations such as Qatar, Kuwait, Saudi Arabia, the United Arab Emirates and Oman. Availability changes with employer demand, so always confirm a role before making arrangements.",
      ]},
      { heading: "Ajira Majuu for Kenyan job seekers", paragraphs: [
        "Ajira Majuu is a private overseas recruitment agency in Kenya focused on connecting Kenyan candidates with international employment opportunities. Applications can be started without creating an account.",
        "If your preferred role is not listed, you can still register your interest and contact the recruitment team for current opportunities.",
      ]},
    ],
    links: [
      { label: "Browse current jobs", href: "/jobs", description: `${currentJobs.length} structured opportunities are currently listed.` },
      { label: "Jobs abroad for Kenyans", href: "/jobs-for-kenyans-abroad", description: "Explore the overseas recruitment pathway." },
      { label: "Recruitment agency in Kenya", href: "/recruitment-agency-kenya", description: "Learn how Ajira Majuu supports candidates and employers." },
    ],
  },
  "overseas-jobs": {
    slug: "overseas-jobs",
    metaTitle: "Overseas Jobs for Kenyans | Ajira Majuu",
    title: "Overseas jobs for Kenyans",
    description: "Current overseas job opportunities and recruitment guidance for Kenyans through Ajira Majuu, including Gulf jobs and country-specific vacancies.",
    eyebrow: "Work abroad from Kenya",
    intro: "Find overseas opportunities, understand the recruitment process and apply directly through Ajira Majuu — without needing a candidate account.",
    sections: [
      { heading: "International opportunities, clearly presented", paragraphs: [
        "Ajira Majuu publishes current vacancies by destination and job type, with salary information only where it has been supplied or confirmed. This keeps the job search useful without guessing.",
        "Open roles can change quickly. A listing on this website is an opportunity to discuss with the recruitment team; it is not a promise of employment or a visa outcome.",
      ]},
      { heading: "From application to deployment", paragraphs: [
        "The recruitment pathway can include application, screening, employer matching, interview or assessment, documentation, required checks, preparation and deployment. The exact steps depend on the opportunity.",
      ]},
    ],
    links: [
      { label: "See current overseas jobs", href: "/jobs", description: "Browse live structured vacancies." },
      { label: "Explore Gulf jobs", href: "/gulf-jobs", description: "See Gulf destinations and current openings." },
      { label: "How recruitment works", href: "/how-it-works", description: "Understand each stage before you apply." },
    ],
  },
  "gulf-jobs": {
    slug: "gulf-jobs",
    metaTitle: "Gulf Jobs for Kenyans | Qatar, Kuwait, Saudi, UAE & Oman | Ajira Majuu",
    title: "Gulf jobs for Kenyans",
    description: "Gulf job opportunities for Kenyans through Ajira Majuu across Qatar, Kuwait, Saudi Arabia, UAE and Oman, with current vacancies and application guidance.",
    eyebrow: "Gulf opportunities",
    intro: "Qatar, Kuwait, Saudi Arabia, the UAE and Oman are among the destinations Ajira Majuu recruits for. Explore the country that matches your skills and check the live vacancies.",
    sections: [
      { heading: "One Gulf recruitment hub", paragraphs: [
        "Our Gulf pages bring together destination information, current job listings, salary details where confirmed, application routes and recruitment-safety guidance.",
        "Do not rely on an old salary screenshot or a forwarded message. Confirm the exact role, employer terms and current availability with Ajira Majuu before committing.",
      ]},
      { heading: "Popular Gulf job categories", paragraphs: [
        "The current listings include household work, caregiving, driving, hospitality, cleaning, construction, warehouse work, beauty services, healthcare and education. Availability varies by country and employer demand.",
      ]},
    ],
    links: [
      { label: "Qatar jobs", href: "/qatar-jobs", description: "View Qatar vacancies and destination guidance." },
      { label: "Kuwait jobs", href: "/kuwait-jobs", description: "View current Kuwait listings." },
      { label: "Saudi Arabia jobs", href: "/saudi-arabia-jobs", description: "Explore Saudi opportunities." },
      { label: "UAE jobs", href: "/uae-jobs", description: "Explore UAE construction and driving roles." },
      { label: "Oman jobs", href: "/oman-jobs", description: "Explore Oman opportunities." },
      { label: "Bahrain jobs", href: "/bahrain-jobs", description: "Explore Bahrain recruitment." },
    ],
  },
  "recruitment-agency-kenya": {
    slug: "recruitment-agency-kenya",
    metaTitle: "Recruitment Agency in Kenya | Ajira Majuu",
    title: "Recruitment agency in Kenya",
    description: "Ajira Majuu is a private overseas recruitment agency in Kenya connecting Kenyan candidates with international employment opportunities.",
    eyebrow: "Recruitment in Kenya",
    intro: "Ajira Majuu is a Kenya-based private overseas recruitment agency helping candidates navigate international job opportunities, applications and pre-departure preparation.",
    sections: [
      { heading: "What Ajira Majuu does", paragraphs: [
        "We connect Kenyan candidates with overseas employment opportunities according to live employer demand. Our website gives candidates a direct place to review current roles and start an application.",
        "Recruitment is handled opportunity by opportunity. Job availability, salary, requirements and employment conditions can differ between employers and destinations.",
      ]},
      { heading: "Candidate-first recruitment", paragraphs: [
        "Clear job information, direct application, official contact channels and recruitment-safety guidance are central to the experience. Candidates should read and keep their employment contract and verify important requests before sending money or documents.",
      ]},
    ],
    links: [
      { label: "Current jobs", href: "/jobs", description: "See vacancies currently listed." },
      { label: "How it works", href: "/how-it-works", description: "Follow the recruitment journey." },
      { label: "Recruitment safety", href: "/recruitment-safety", description: "Learn how to verify recruitment communications." },
      { label: "Contact Ajira Majuu", href: "/contact", description: "Use the official contact channels." },
    ],
  },
  "overseas-recruitment-agency-kenya": {
    slug: "overseas-recruitment-agency-kenya",
    metaTitle: "Overseas Recruitment Agency Kenya | Ajira Majuu",
    title: "Overseas recruitment agency in Kenya",
    description: "Ajira Majuu helps Kenyan candidates explore overseas employment opportunities in Gulf destinations and beyond, with direct applications and recruitment guidance.",
    eyebrow: "Kenya → Global",
    intro: "For Kenyan candidates looking for work abroad, Ajira Majuu combines current vacancies with a straightforward recruitment and application experience.",
    sections: [
      { heading: "International recruitment from Kenya", paragraphs: [
        "Ajira Majuu's destination network includes Qatar, Kuwait, Saudi Arabia, the UAE, Bahrain and Oman. Each destination page shows current opportunities where they are available and explains how to register interest when a role is not yet listed.",
        "The website is designed around real vacancy information: salary figures are not guessed, job availability is not guaranteed, and the final employment contract governs your terms.",
      ]},
      { heading: "A direct path to application", paragraphs: [
        "Candidates can browse a role, review its requirements, start an application and contact the recruitment team. No account or password is required for the application flow.",
      ]},
    ],
    links: [
      { label: "Jobs for Kenyans abroad", href: "/jobs-for-kenyans-abroad", description: "Start with the overseas job search." },
      { label: "Gulf recruitment", href: "/gulf-recruitment-agency", description: "Explore Gulf recruitment services." },
      { label: "Apply", href: "/apply", description: "Start an application." },
    ],
  },
  "gulf-recruitment-agency": {
    slug: "gulf-recruitment-agency",
    metaTitle: "Gulf Recruitment Agency Kenya | Ajira Majuu",
    title: "Gulf recruitment from Kenya",
    description: "Ajira Majuu connects Kenyan candidates with Gulf employment opportunities across Qatar, Kuwait, Saudi Arabia, UAE, Bahrain and Oman.",
    eyebrow: "Gulf recruitment",
    intro: "Explore Gulf recruitment opportunities from Kenya through Ajira Majuu, with destination pages, live vacancies and a direct application route.",
    sections: [
      { heading: "Countries covered", paragraphs: [
        "Ajira Majuu's Gulf destination network includes Qatar, Kuwait, Saudi Arabia, the United Arab Emirates, Bahrain and Oman. The exact roles available in each country depend on current employer demand.",
      ]},
      { heading: "Roles across multiple sectors", paragraphs: [
        "Current listings span domestic and care work, driving and delivery, hospitality, cleaning, construction and trades, beauty services, warehouse work, healthcare and education. Always check the individual vacancy for the details that apply to it.",
      ]},
    ],
    links: [
      { label: "Gulf jobs", href: "/gulf-jobs", description: "Browse the Gulf job hub." },
      { label: "Qatar", href: "/qatar-jobs", description: "Current Qatar opportunities." },
      { label: "Kuwait", href: "/kuwait-jobs", description: "Current Kuwait opportunities." },
      { label: "Saudi Arabia", href: "/saudi-arabia-jobs", description: "Current Saudi opportunities." },
      { label: "UAE", href: "/uae-jobs", description: "Current UAE opportunities." },
    ],
  },
  "jobs-for-kenyans-abroad": {
    slug: "jobs-for-kenyans-abroad",
    metaTitle: "Jobs Abroad for Kenyans | Overseas Jobs | Ajira Majuu",
    title: "Jobs abroad for Kenyans",
    description: "Find overseas job opportunities for Kenyan candidates with Ajira Majuu, including Gulf jobs, country pages and direct application support.",
    eyebrow: "Kenyans abroad",
    intro: "Searching for jobs abroad from Kenya? Start with current vacancies, choose a destination and use Ajira Majuu's direct application process.",
    sections: [
      { heading: "Choose a destination", paragraphs: [
        "Qatar, Kuwait, Saudi Arabia, the UAE, Bahrain and Oman are active recruitment destinations. The jobs available change as employers request candidates.",
        "If you do not see your exact role, contact Ajira Majuu rather than assuming there are no opportunities. Some destination recruitment activity is not yet represented by a structured vacancy on the website.",
      ]},
      { heading: "Apply safely", paragraphs: [
        "Use the official Ajira Majuu website and contact details. Verify unexpected payment requests, protect your personal documents and read your employment contract before signing.",
      ]},
    ],
    links: [
      { label: "Browse jobs", href: "/jobs", description: "See live vacancies." },
      { label: "Destinations", href: "/destinations", description: "Explore every recruitment destination." },
      { label: "Safety guide", href: "/recruitment-safety", description: "Protect yourself from recruitment scams." },
    ],
  },
  "ajira-kazi-kenya": {
    slug: "ajira-kazi-kenya",
    metaTitle: "Ajira na Kazi Kenya | Ajira Majuu",
    title: "Ajira na kazi — opportunities for Kenyans",
    description: "Ajira Majuu helps Kenyan candidates explore kazi and overseas employment opportunities, including Gulf jobs and direct applications.",
    eyebrow: "Ajira · Kazi · Kazi Ughaibuni",
    intro: "Unatafuta ajira au kazi? Ajira Majuu inaweka nafasi za kazi zinazopatikana, taarifa za nchi na njia ya kuomba kazi mahali pamoja.",
    sections: [
      { heading: "Kazi na ajira za ughaibuni", paragraphs: [
        "Tazama nafasi zilizopo sasa, chagua nchi unayotaka na soma mahitaji ya nafasi hiyo kabla ya kutuma maombi. Ajira na mishahara hubadilika kulingana na mahitaji ya waajiri.",
        "Kwa nafasi ambazo hazijaorodheshwa, unaweza kuwasiliana na timu ya Ajira Majuu na kusajili nia yako ya kutafuta kazi.",
      ]},
      { heading: "Usalama wa mwombaji", paragraphs: [
        "Tumia mawasiliano rasmi ya Ajira Majuu. Usitume pesa kwa mtu binafsi kwa sababu ya ujumbe au simu bila kuthibitisha ombi hilo. Soma mkataba wako kabla ya kusaini.",
      ]},
    ],
    links: [
      { label: "Tazama kazi zilizopo", href: "/jobs", description: "Browse current vacancies." },
      { label: "Kazi za Gulf", href: "/gulf-jobs", description: "Explore Gulf opportunities." },
      { label: "Jinsi ya kuomba", href: "/how-it-works", description: "See the recruitment process." },
    ],
  },

  "recruitment-agencies-kenya": {
    slug: "recruitment-agencies-kenya",
    metaTitle: "Recruitment Agencies in Kenya | Ajira Majuu",
    title: "Recruitment agencies in Kenya",
    description: "Looking for a recruitment agency in Kenya? Learn what to verify, then explore Ajira Majuu's overseas jobs, destinations and application process.",
    eyebrow: "Compare with confidence",
    intro: "If you are searching for recruitment agencies in Kenya, start with the things that matter: real vacancies, clear job information, official contacts, a visible application route and recruitment-safety guidance.",
    sections: [
      { heading: "What to look for in a recruitment agency", paragraphs: [
        "A strong recruitment website should make it easy to identify the company, contact the team through official channels, understand the opportunity and see how to apply. It should also be clear about what is confirmed and what still needs verification.",
        "Ajira Majuu publishes individual vacancy pages, destination information, application guidance and a recruitment-safety section so candidates can make decisions with more information.",
      ]},
      { heading: "Why candidates can start with Ajira Majuu", paragraphs: [
        "Ajira Majuu is a private overseas recruitment agency in Kenya focused on international opportunities for Kenyan candidates. Current jobs are organized by role and destination, with salaries shown where they have been supplied.",
        "No website can honestly guarantee employment, a visa or a Google ranking. The useful promise is a clear route to a real opportunity and a recruitment team you can verify through official channels.",
      ]},
    ],
    links: [
      { label: "Ajira Majuu recruitment agency", href: "/recruitment-agency-kenya", description: "See the agency's recruitment approach." },
      { label: "Private employment agency", href: "/private-employment-agency-kenya", description: "Learn about private overseas recruitment." },
      { label: "Current jobs", href: "/jobs", description: "Review live opportunities." },
      { label: "Contact", href: "/contact", description: "Use official Ajira Majuu channels." },
    ],
  },
  "private-employment-agency-kenya": {
    slug: "private-employment-agency-kenya",
    metaTitle: "Private Employment Agency in Kenya | Ajira Majuu",
    title: "Private employment agency in Kenya",
    description: "Ajira Majuu is a private overseas recruitment agency in Kenya helping candidates explore international employment opportunities and apply directly.",
    eyebrow: "Private recruitment · Kenya",
    intro: "Ajira Majuu provides private overseas recruitment support for Kenyan candidates looking for verified opportunities abroad, with a direct application process and official contact channels.",
    sections: [
      { heading: "Private recruitment, clearly explained", paragraphs: [
        "The website connects candidates to current opportunities according to employer demand. Each vacancy has its own requirements, salary information and application route.",
        "Being a recruitment agency does not mean every applicant will be placed. Screening, employer selection, documentation and other steps depend on the opportunity.",
      ]},
      { heading: "A safer way to communicate", paragraphs: [
        "Use the official Ajira Majuu website, phone, email and WhatsApp channels. If someone claims to represent the agency and asks for money or sensitive documents in an unusual way, verify the request before taking action.",
      ]},
    ],
    links: [
      { label: "Recruitment agency Kenya", href: "/recruitment-agency-kenya", description: "Learn about Ajira Majuu recruitment services." },
      { label: "Current jobs", href: "/jobs", description: "Browse live opportunities." },
      { label: "Safety guide", href: "/recruitment-safety", description: "Verify recruitment communications." },
    ],
  },
  "qatar-jobs": {
    slug: "qatar-jobs",
    metaTitle: "Qatar Jobs for Kenyans | Ajira Majuu",
    title: "Qatar jobs for Kenyans",
    description: "Current Qatar job opportunities for Kenyan candidates through Ajira Majuu, including household, driving, caregiving, hospitality and beauty roles.",
    eyebrow: "🇶🇦 Qatar",
    intro: "Explore Qatar opportunities currently listed by Ajira Majuu. Review the individual vacancy, check the requirements and apply directly without an account.",
    sections: [
      { heading: "Current Qatar opportunities", paragraphs: [
        "Ajira Majuu currently lists household, driving, childcare, education, caregiving, beauty and additional Qatar openings including an elderly caregiver, female driver, female cook, housemaid/childcare worker and private family beautician.",
        "Where a salary or benefit is not confirmed for a specific new opening, the listing says so. Do not treat an older salary figure as applying automatically to a different vacancy.",
      ]},
    ],
    links: [
      { label: "All Qatar vacancies", href: "/destinations/qatar", description: "Open the full Qatar destination page." },
      { label: "Apply for Qatar", href: "/apply?country=Qatar", description: "Start a Qatar application." },
      { label: "Qatar safety & process", href: "/how-it-works", description: "Understand recruitment before travel." },
    ],
  },
  "kuwait-jobs": {
    slug: "kuwait-jobs",
    metaTitle: "Kuwait Jobs for Kenyans | Ajira Majuu",
    title: "Kuwait jobs for Kenyans",
    description: "Kuwait job opportunities for Kenyan candidates through Ajira Majuu, including driving, warehouse, delivery and female barista vacancies.",
    eyebrow: "🇰🇼 Kuwait",
    intro: "Explore current Kuwait vacancies listed by Ajira Majuu, including three female barista positions and other roles in driving, warehouse work and delivery.",
    sections: [
      { heading: "Kuwait vacancies", paragraphs: [
        "The current batch includes Light Driver, Warehouse Worker, Bike Rider and three Female Barista positions. The barista listing starts at 120 KWD and requires candidates willing to work in Kuwait.",
      ]},
    ],
    links: [
      { label: "All Kuwait vacancies", href: "/destinations/kuwait", description: "Open the full Kuwait destination page." },
      { label: "Apply", href: "/apply?country=Kuwait", description: "Start an application." },
    ],
  },
  "saudi-arabia-jobs": {
    slug: "saudi-arabia-jobs",
    metaTitle: "Saudi Arabia Jobs for Kenyans | Ajira Majuu",
    title: "Saudi Arabia jobs for Kenyans",
    description: "Saudi Arabia job opportunities for Kenyan candidates through Ajira Majuu, including household, driving, healthcare, cleaning, caregiving and education roles.",
    eyebrow: "🇸🇦 Saudi Arabia",
    intro: "Explore Saudi Arabia opportunities listed by Ajira Majuu, with individual job pages that show the salary information supplied for each role.",
    sections: [
      { heading: "Current Saudi roles", paragraphs: [
        "The current batch includes Housemaid, Private Driver, Female Driver, Registered Nurse, Teacher, Heavy Truck Driver, Cleaners and Caregivers. The Teacher source figure is marked for verification rather than being silently changed.",
      ]},
    ],
    links: [
      { label: "All Saudi vacancies", href: "/destinations/saudi-arabia", description: "Open the full Saudi Arabia destination page." },
      { label: "Apply", href: "/apply?country=Saudi%20Arabia", description: "Start an application." },
    ],
  },
  "uae-jobs": {
    slug: "uae-jobs",
    metaTitle: "UAE Jobs for Kenyans | Ajira Majuu",
    title: "UAE jobs for Kenyans",
    description: "UAE job opportunities for Kenyan candidates through Ajira Majuu, including construction, trades and driving roles.",
    eyebrow: "🇦🇪 United Arab Emirates",
    intro: "Explore UAE opportunities including plumber, mason, steel fixer, construction helper, painter, shuttering carpenter and driver roles.",
    sections: [
      { heading: "Construction and trade opportunities", paragraphs: [
        "The current UAE batch contains construction and trade roles alongside driving. The source notes did not include a currency for these figures, so the public listings deliberately mark the currency for confirmation rather than assuming AED.",
      ]},
    ],
    links: [
      { label: "All UAE vacancies", href: "/destinations/uae", description: "Open the full UAE destination page." },
      { label: "Apply", href: "/apply?country=United%20Arab%20Emirates", description: "Start an application." },
    ],
  },
  "bahrain-jobs": {
    slug: "bahrain-jobs",
    metaTitle: "Bahrain Jobs for Kenyans | Ajira Majuu",
    title: "Bahrain jobs for Kenyans",
    description: "Bahrain recruitment opportunities for Kenyan candidates through Ajira Majuu, with destination information and a direct application route.",
    eyebrow: "🇧🇭 Bahrain",
    intro: "Ajira Majuu recruits for Bahrain according to current employer demand. Explore the destination page and contact the recruitment team for roles that are not yet listed.",
    sections: [
      { heading: "Bahrain recruitment", paragraphs: [
        "Bahrain is one of Ajira Majuu's active recruitment destinations. Structured vacancies are published when the relevant job information has been confirmed.",
      ]},
    ],
    links: [
      { label: "Bahrain destination", href: "/destinations/bahrain", description: "See Bahrain recruitment information." },
      { label: "Apply / register interest", href: "/apply?country=Bahrain", description: "Start an application." },
    ],
  },
  "oman-jobs": {
    slug: "oman-jobs",
    metaTitle: "Oman Jobs for Kenyans | Ajira Majuu",
    title: "Oman jobs for Kenyans",
    description: "Oman job opportunities for Kenyan candidates through Ajira Majuu, including domestic worker, head chef and gardener roles.",
    eyebrow: "🇴🇲 Oman",
    intro: "Explore Oman vacancies currently listed by Ajira Majuu, with the supplied salary figures shown on individual job pages.",
    sections: [
      { heading: "Current Oman roles", paragraphs: [
        "The current batch includes Domestic Worker at 80–100 OMR, Head Chef at 250 OMR and Gardener at 140 OMR. The gardener figure is flagged for verification because the source note was difficult to read.",
      ]},
    ],
    links: [
      { label: "All Oman vacancies", href: "/destinations/oman", description: "Open the full Oman destination page." },
      { label: "Apply", href: "/apply?country=Oman", description: "Start an application." },
    ],
  },
};

export const SEO_LANDING_SLUGS = Object.keys(SEO_LANDINGS);
