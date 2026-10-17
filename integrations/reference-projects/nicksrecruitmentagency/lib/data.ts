// Central content source. Every dynamic route (services, countries,
// job categories, courses, jobs) reads from here, so adding a row
// here automatically creates a new live page — this is how a
// recruitment site this size stays maintainable at 40-70+ pages
// instead of 70 hand-duplicated files.

export type Service = {
  slug: string;
  name: string;
  summary: string;
  whoQualifies: string[];
  requirements: string[];
  countries: string[];
  timeline: string;
  costs: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "overseas-recruitment",
    name: "Overseas Recruitment",
    summary:
      "End-to-end placement of skilled and semi-skilled workers with licensed employers across the Gulf.",
    whoQualifies: [
      "Aged 21-45 depending on role and destination country",
      "Valid passport with 2+ years validity",
      "Relevant trade experience or willingness to train",
      "Medically fit for overseas deployment",
    ],
    requirements: [
      "Passport (original + copy)",
      "Educational and trade certificates",
      "Experience letters, if applicable",
      "Passport-size photographs",
      "Police clearance certificate",
    ],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman"],
    timeline: "4-10 weeks from registration to departure, role dependent.",
    costs:
      "No placement fee is charged to candidates for employer-sponsored roles. Government and visa costs are disclosed upfront, in writing, before you sign anything.",
    faqs: [
      { q: "Do I pay any fee to apply?", a: "No recruitment fee is charged to candidates for employer-sponsored positions." },
      { q: "How long until I fly out?", a: "Typically 4-10 weeks after your file is complete, depending on visa processing in the destination country." },
    ],
  },
  {
    slug: "executive-recruitment",
    name: "Executive Recruitment",
    summary: "Confidential search and placement for management and senior technical roles.",
    whoQualifies: ["5+ years in a leadership or specialist role", "Relevant degree or professional certification"],
    requirements: ["CV", "Reference contacts", "Certificates"],
    countries: ["UAE", "Qatar", "Saudi Arabia"],
    timeline: "6-12 weeks, search-dependent.",
    costs: "Employer-funded search; no cost to candidates.",
    faqs: [{ q: "Is this confidential?", a: "Yes, executive searches are handled discreetly throughout." }],
  },
  {
    slug: "domestic-recruitment",
    name: "Domestic Recruitment",
    summary: "Local placement services for employers hiring within the home market.",
    whoQualifies: ["Valid national ID", "Role-relevant experience"],
    requirements: ["ID", "CV", "References"],
    countries: ["Domestic"],
    timeline: "1-3 weeks.",
    costs: "No candidate fee.",
    faqs: [{ q: "Is travel involved?", a: "No, domestic recruitment places you locally." }],
  },
  {
    slug: "temporary-staffing",
    name: "Temporary Staffing",
    summary: "Short-term and seasonal staffing for peak periods and project work.",
    whoQualifies: ["Available for flexible/short contracts"],
    requirements: ["ID", "CV"],
    countries: ["UAE", "Qatar", "Domestic"],
    timeline: "1-4 weeks.",
    costs: "No candidate fee.",
    faqs: [{ q: "Can this lead to permanent work?", a: "Many temporary placements convert to permanent roles with strong performance." }],
  },
  {
    slug: "permanent-staffing",
    name: "Permanent Staffing",
    summary: "Long-term placement into full-time roles with our partner employers.",
    whoQualifies: ["Trade or professional qualification", "Clean employment record"],
    requirements: ["Passport", "Certificates", "Experience letters"],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman"],
    timeline: "4-10 weeks.",
    costs: "No candidate fee for employer-sponsored roles.",
    faqs: [{ q: "What's the minimum contract length?", a: "Most permanent contracts run 2 years, renewable." }],
  },
  {
    slug: "talent-outsourcing",
    name: "Talent Outsourcing",
    summary: "We manage payroll, compliance and workforce administration for outsourced teams.",
    whoQualifies: ["Employer-side service"],
    requirements: ["Employer agreement"],
    countries: ["UAE", "Qatar", "Saudi Arabia"],
    timeline: "2-4 weeks to onboard a workforce.",
    costs: "Quoted per contract.",
    faqs: [{ q: "Who manages compliance?", a: "We handle labour-law compliance and payroll administration on your behalf." }],
  },
  {
    slug: "hr-consultancy",
    name: "HR Consultancy",
    summary: "Advisory services on Gulf labour law, workforce planning and compliance.",
    whoQualifies: ["Employer-side service"],
    requirements: ["Initial consultation"],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman"],
    timeline: "Ongoing or project-based.",
    costs: "Quoted per engagement.",
    faqs: [{ q: "Do you advise on contracts?", a: "Yes, including contract structuring and labour law compliance." }],
  },
  {
    slug: "employer-recruitment",
    name: "Employer Recruitment",
    summary: "Sourcing, screening and shortlisting workers against your exact specification.",
    whoQualifies: ["Employer-side service"],
    requirements: ["Job specification", "Licence documentation"],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman"],
    timeline: "2-6 weeks to first shortlist.",
    costs: "Quoted per role or per contract.",
    faqs: [{ q: "How are candidates screened?", a: "Document verification, interview, trade test where relevant, and medical clearance." }],
  },
  {
    slug: "visa-processing",
    name: "Visa Processing",
    summary: "End-to-end visa application handling for approved candidates.",
    whoQualifies: ["Candidates with confirmed employer offer"],
    requirements: ["Passport", "Photos", "Medical certificate", "Employment contract"],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman"],
    timeline: "2-6 weeks depending on country.",
    costs: "Government fees disclosed upfront in writing.",
    faqs: [{ q: "What is your visa success rate?", a: "Our current visa approval rate is 98% across all destination countries." }],
  },
  {
    slug: "documentation",
    name: "Documentation",
    summary: "Attestation, translation and certificate legalisation support.",
    whoQualifies: ["Any candidate in process"],
    requirements: ["Original certificates"],
    countries: ["All"],
    timeline: "1-3 weeks.",
    costs: "Varies by document and country.",
    faqs: [{ q: "Do you handle attestation?", a: "Yes, we coordinate attestation and legalisation on your behalf." }],
  },
  {
    slug: "airport-assistance",
    name: "Airport Assistance",
    summary: "Departure and arrival support so no candidate travels unaccompanied through the process.",
    whoQualifies: ["Departing candidates"],
    requirements: ["Flight ticket", "Visa"],
    countries: ["All"],
    timeline: "Provided at time of departure/arrival.",
    costs: "Included in placement service.",
    faqs: [{ q: "Is someone with me at the airport?", a: "Yes, our team supports check-in on departure and coordinates employer pickup on arrival." }],
  },
];

// ---------------------------------------------------------------------------
// GCC overview — used on the /countries page as an intro panel above the
// country cards. Pure content, no images required.
// ---------------------------------------------------------------------------
export type GccCountryListing = { rank: number; name: string; note?: string };

export const gccCountries: GccCountryListing[] = [
  { rank: 1, name: "Saudi Arabia (KSA)", note: "Biggest single employer of African labor" },
  { rank: 2, name: "United Arab Emirates (UAE)", note: "Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah" },
  { rank: 3, name: "Qatar" },
  { rank: 4, name: "Kuwait" },
  { rank: 5, name: "Bahrain" },
  { rank: 6, name: "Oman" },
];

export const gccNote =
  "Jordan and Lebanon are sometimes grouped in similar recruitment pipelines even though they are not GCC members — worth knowing if you see them mentioned in agency ads.";

// `image.mood` drives a gradient placeholder (see MediaPlaceholder in
// CountriesSection.tsx) until real photography exists. Once a file is
// ready, drop it in /public/images/<file> and set `image.src` to that
// path — the real photo replaces the placeholder automatically, no
// component changes needed. Same for `video`.
export type CountryMedia = {
  caption: string;
  mood: "sky" | "gold" | "sea" | "sand" | "night" | "green";
  src?: string;
  video?: string;
};

export type Country = {
  slug: string;
  name: string;
  flag: string;
  avgSalaryRange: string;
  currency: string;
  climate: string;
  workingHours: string;
  commonRoles: string[];
  requiredDocs: string[];
  // --- premium showcase fields ---
  tagline: string;
  description: string;
  image: CountryMedia;
  /** extra gallery shots for the bento-style collage on the card / country page */
  photos?: string[];
  cities: string[];
  jobsAvailable: number;
  verifiedEmployers: number;
  hiringNow: boolean;
};

export const countries: Country[] = [
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    avgSalaryRange: "AED 1,200 - 6,500/month, role dependent",
    currency: "UAE Dirham (AED)",
    climate: "Hot desert climate; summer 40°C+, mild winters",
    workingHours: "8 hrs/day standard, per UAE Labour Law",
    commonRoles: ["Construction", "Hospitality", "Domestic Work", "Security", "Retail"],
    requiredDocs: ["Passport", "Photos", "Medical certificate", "Employment contract"],
    tagline: "Where the skyline never stops growing",
    description:
      "From Dubai's towers to Abu Dhabi's ports, the UAE keeps hiring across construction, hotels, retail and homes. We walk you through registration, training, medical checks, visa and travel — every step, in writing, before you pay a thing.",
    image: { caption: "Welcome to the UAE — our workers on arrival", mood: "gold", src: "/images/uae.png" },
    photos: ["/images/uae.png", "/images/kuuwait.png", "/images/thekuwait.png"],
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    jobsAvailable: 220,
    verifiedEmployers: 85,
    hiringNow: true,
  },
  {
    slug: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    avgSalaryRange: "QAR 1,300 - 7,000/month, role dependent",
    currency: "Qatari Riyal (QAR)",
    climate: "Hot desert climate; summer 45°C+, mild winters",
    workingHours: "8 hrs/day standard, per Qatar Labour Law",
    commonRoles: ["Construction", "Hospitality", "Facilities", "Security"],
    requiredDocs: ["Passport", "Photos", "Medical certificate", "Employment contract"],
    tagline: "Steady, well-run job sites in a fast-growing capital",
    description:
      "Doha's hotels, facilities firms and building sites need dependable staff year-round. Our Qatar employers are pre-verified, and we handle your training, medical screening and visa paperwork before you ever see an airport.",
    // NOTE: no Qatar-specific photo in /public/images yet — using a departure-day
    // group shot as a placeholder. Swap `src` for a Doha photo as soon as you have one.
    image: { caption: "Departure day — Qatar-bound cohort", mood: "sea", src: "/images/dohaqatar.png" },
    photos: ["/images/qatar.png", "/images/dohadoha.png"],
    cities: ["Doha", "Al Wakrah", "Al Rayyan"],
    jobsAvailable: 140,
    verifiedEmployers: 52,
    hiringNow: true,
  },
  {
    slug: "oman",
    name: "Oman",
    flag: "🇴🇲",
    avgSalaryRange: "OMR 120 - 600/month, role dependent",
    currency: "Omani Rial (OMR)",
    climate: "Arid, coastal humidity in Muscat, cooler in highlands",
    workingHours: "8-9 hrs/day standard",
    commonRoles: ["Construction", "Hospitality", "Driving", "Domestic Work"],
    requiredDocs: ["Passport", "Photos", "Medical certificate", "Employment contract"],
    tagline: "A calmer Gulf posting with real long-term roles",
    description:
      "Muscat, Salalah and Sohar have steady openings in hotels, construction and driving, with employers known for keeping workers long-term. We prepare your file, train you for the role, and stay with you right up to arrival.",
    image: { caption: "Oman-bound send-off", mood: "sky", src: "/images/uae.png" },
    photos: ["/images/qaatar.png"],
    cities: ["Muscat", "Salalah", "Sohar"],
    jobsAvailable: 150,
    verifiedEmployers: 40,
    hiringNow: true,
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    avgSalaryRange: "SAR 1,200 - 8,000/month, role dependent",
    currency: "Saudi Riyal (SAR)",
    climate: "Hot desert climate, cooler in Asir highlands",
    workingHours: "8 hrs/day standard, per Saudi Labour Law",
    commonRoles: ["Construction", "Healthcare Support", "Domestic Work", "Retail"],
    requiredDocs: ["Passport", "Photos", "Medical certificate", "Employment contract"],
    tagline: "The Gulf's biggest market, with the widest range of roles",
    description:
      "Riyadh, Jeddah and Dammam are building fast, and demand spans construction, healthcare support, retail and homes. Every Saudi vacancy on our books comes from a licensed, verified employer, with costs disclosed before you commit.",
    image: { caption: "Welcome to Saudi Arabia", mood: "night", src: "/images/thekuwait.png" },
    photos: ["/images/dohaqatar.png"],
    cities: ["Riyadh", "Jeddah", "Dammam"],
    jobsAvailable: 260,
    verifiedEmployers: 96,
    hiringNow: true,
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    flag: "🇰🇼",
    avgSalaryRange: "KWD 90 - 450/month, role dependent",
    currency: "Kuwaiti Dinar (KWD)",
    climate: "Hot desert climate; summer 45°C+",
    workingHours: "8 hrs/day standard, per Kuwait Labour Law",
    commonRoles: ["Domestic Work", "Construction", "Hospitality", "Driving"],
    requiredDocs: ["Passport", "Photos", "Medical certificate", "Employment contract"],
    tagline: "Compact, employer-led hiring with fast onboarding",
    description:
      "Kuwait City households and businesses hire quickly once your file is ready. We match you against real vacancies, run your training and medical checks, and keep you updated at every stage of visa processing.",
    image: { caption: "Welcome to Kuwait", mood: "green", src: "/images/dohadoha.png" },
    photos: ["/images/ourlogo.jpg"],
    cities: ["Kuwait City", "Hawalli", "Al Ahmadi"],
    jobsAvailable: 95,
    verifiedEmployers: 31,
    hiringNow: false,
  },
];

// ---------------------------------------------------------------------------
// Departure gallery — pulled straight from /public/images and /public/videos.
// Used for a "Recent Departures" strip on the homepage / countries page so
// the site shows real send-off moments rather than stock photography.
// ---------------------------------------------------------------------------
export type GalleryItem = { src: string; caption: string; type: "image" | "video" };

export const departureGallery: GalleryItem[] = [
  { src: "/images/IMG-20260730-WA0040.jpg", caption: "Departure lounge check-in", type: "image" },
  { src: "/images/IMG-20260730-WA0041.jpg", caption: "Pre-flight group photo", type: "image" },
  { src: "/images/IMG-20260730-WA0042.jpg", caption: "Boarding gate send-off", type: "image" },
  { src: "/images/IMG-20260730-WA0044.jpg", caption: "Today's departures board", type: "image" },
  { src: "/images/IMG-20260730-WA0046.jpg", caption: "Cohort ready for check-in", type: "image" },
  { src: "/images/IMG-20260730-WA0049.jpg", caption: "Final briefing before boarding", type: "image" },
  { src: "/images/IMG-20260730-WA0054.jpg", caption: "Waiting area, departure day", type: "image" },
  { src: "/images/IMG-20260730-WA0059.jpg", caption: "Airline welcome signage", type: "image" },
  { src: "/images/IMG-20260730-WA0066.jpg", caption: "Group photo before check-in", type: "image" },
  { src: "/images/IMG-20260730-WA0074.jpg", caption: "Arrivals hall", type: "image" },
  { src: "/images/IMG-20260730-WA0081.jpg", caption: "Boarding gate, evening flight", type: "image" },
  { src: "/images/logo.jpg", caption: "Emirates aircraft on the tarmac", type: "image" },
  { src: "/videos/VID-20260730-WA0050.mp4", caption: "Departure day — group send-off", type: "video" },
  { src: "/videos/VID-20260730-WA0060.mp4", caption: "Candidates at the terminal", type: "video" },
  { src: "/videos/VID-20260730-WA0084.mp4", caption: "Final goodbyes before boarding", type: "video" },
];

export type JobCategory = { slug: string; name: string; icon: string; sector?: string };
export const jobCategories: JobCategory[] = [
  { slug: "construction", name: "Construction", icon: "hard-hat" },
  { slug: "hospitality", name: "Hospitality & Hotels", icon: "concierge-bell" },
  { slug: "restaurants", name: "Restaurants & Waitstaff", icon: "utensils" },
  { slug: "domestic-workers", name: "Domestic Workers", icon: "home" },
  { slug: "caregivers", name: "Caregivers & Nannies", icon: "heart-handshake" },
  { slug: "drivers", name: "Drivers", icon: "car" },
  { slug: "security-guards", name: "Security Guards", icon: "shield" },
  { slug: "factory-workers", name: "Factory Workers", icon: "factory" },
  { slug: "warehouse", name: "Warehouse Workers", icon: "warehouse" },
  { slug: "cleaners", name: "Cleaners", icon: "sparkles" },
  { slug: "kitchen-helpers", name: "Kitchen Helpers", icon: "chef-hat" },
  { slug: "baristas", name: "Baristas", icon: "coffee" },
  { slug: "electricians", name: "Electricians", icon: "zap" },
  { slug: "plumbers", name: "Plumbers", icon: "wrench" },
  { slug: "hvac-technicians", name: "HVAC Technicians", icon: "fan" },
  { slug: "mechanics", name: "Mechanics", icon: "cog" },
  { slug: "welders", name: "Welders", icon: "flame" },
  { slug: "engineers", name: "Engineers", icon: "compass" },
  { slug: "agriculture", name: "Agriculture", icon: "sprout" },
  { slug: "retail", name: "Retail", icon: "shopping-bag" },
  { slug: "healthcare-support", name: "Healthcare Support", icon: "stethoscope" },

  // --- A. Domestic / Household Work ---
  { slug: "house-managers", name: "House Manager / Head Housekeeper", icon: "home", sector: "Domestic / Household" },
  { slug: "nannies-governesses", name: "Nanny / Baby Nurse / Governess", icon: "baby", sector: "Domestic / Household" },
  { slug: "private-chefs", name: "Private Cook / Household Chef", icon: "chef-hat", sector: "Domestic / Household" },
  { slug: "butlers", name: "Butler", icon: "bell", sector: "Domestic / Household" },
  { slug: "personal-drivers", name: "Personal Driver / Family Chauffeur", icon: "car", sector: "Domestic / Household" },
  { slug: "laundry-staff", name: "Laundry Staff / Ironing Staff", icon: "shirt", sector: "Domestic / Household" },
  { slug: "elderly-caregivers", name: "Elderly Caregiver / Companion", icon: "heart-handshake", sector: "Domestic / Household" },
  { slug: "live-in-cleaners", name: "Live-in Cleaner", icon: "sparkles", sector: "Domestic / Household" },
  { slug: "private-gardeners", name: "Gardener (Private Residence)", icon: "sprout", sector: "Domestic / Household" },
  { slug: "pool-attendants", name: "Pool Attendant (Private Villa)", icon: "waves", sector: "Domestic / Household" },
  { slug: "personal-assistants", name: "Personal Assistant to Family", icon: "user-check", sector: "Domestic / Household" },

  // --- B. Hospitality (Hotels, Resorts, Restaurants) ---
  { slug: "chefs", name: "Chef (Commis, Sous, Head Chef)", icon: "chef-hat", sector: "Hospitality" },
  { slug: "line-cooks", name: "Line Cook / Kitchen Porter", icon: "utensils", sector: "Hospitality" },
  { slug: "bakers-pastry-chefs", name: "Baker / Pastry Chef", icon: "cake", sector: "Hospitality" },
  { slug: "waitstaff", name: "Waiter / Waitress", icon: "utensils-crossed", sector: "Hospitality" },
  { slug: "bartenders", name: "Barista / Bartender", icon: "wine", sector: "Hospitality" },
  { slug: "hotel-housekeeping", name: "Hotel Housekeeper / Room Attendant", icon: "bed", sector: "Hospitality" },
  { slug: "concierge-staff", name: "Concierge Staff", icon: "concierge-bell", sector: "Hospitality" },
  { slug: "front-desk", name: "Front Desk / Receptionist", icon: "clipboard-list", sector: "Hospitality" },
  { slug: "banquet-event-staff", name: "Banquet / Event Staff", icon: "calendar", sector: "Hospitality" },
  { slug: "hotel-laundry-valet", name: "Laundry & Valet Staff (Hotel)", icon: "shirt", sector: "Hospitality" },
  { slug: "dishwashers-stewards", name: "Dishwasher / Steward", icon: "droplet", sector: "Hospitality" },

  // --- C. Construction & Skilled Trades ---
  { slug: "general-laborers", name: "General Laborer", icon: "hard-hat", sector: "Construction & Skilled Trades" },
  { slug: "masons-bricklayers", name: "Mason / Bricklayer", icon: "brick-wall", sector: "Construction & Skilled Trades" },
  { slug: "carpenters", name: "Carpenter", icon: "hammer", sector: "Construction & Skilled Trades" },
  { slug: "steel-fixers", name: "Steel Fixer", icon: "wrench", sector: "Construction & Skilled Trades" },
  { slug: "painters", name: "Painter", icon: "paintbrush", sector: "Construction & Skilled Trades" },
  { slug: "scaffolders", name: "Scaffolder", icon: "layers", sector: "Construction & Skilled Trades" },
  { slug: "heavy-equipment-operators", name: "Heavy Equipment Operator", icon: "truck", sector: "Construction & Skilled Trades" },
  { slug: "crane-operators", name: "Crane Operator", icon: "move-vertical", sector: "Construction & Skilled Trades" },
  { slug: "site-supervisors", name: "Site Supervisor (Experienced)", icon: "clipboard-check", sector: "Construction & Skilled Trades" },
  { slug: "surveyor-assistants", name: "Surveyor Assistant", icon: "ruler", sector: "Construction & Skilled Trades" },

  // --- D. Security ---
  { slug: "watchmen", name: "Watchman", icon: "shield", sector: "Security" },
  { slug: "cctv-control-room", name: "CCTV Monitor / Control Room Staff", icon: "camera", sector: "Security" },
  { slug: "gate-access-control", name: "Gate / Access Control Officer", icon: "door-closed", sector: "Security" },

  // --- E. Cleaning & Facilities Management ---
  { slug: "office-cleaners", name: "Office Cleaner", icon: "sparkles", sector: "Cleaning & Facilities" },
  { slug: "janitors", name: "Janitor", icon: "trash-2", sector: "Cleaning & Facilities" },
  { slug: "commercial-landscapers", name: "Landscaper / Gardener (Commercial)", icon: "sprout", sector: "Cleaning & Facilities" },
  { slug: "pest-control-workers", name: "Pest Control Worker", icon: "bug", sector: "Cleaning & Facilities" },
  { slug: "waste-management-workers", name: "Waste Management Worker", icon: "recycle", sector: "Cleaning & Facilities" },
  { slug: "window-facade-cleaners", name: "Window / Facade Cleaner", icon: "wind", sector: "Cleaning & Facilities" },

  // --- F. Retail, Sales & Warehousing ---
  { slug: "shop-attendants", name: "Shop Attendant / Sales Assistant", icon: "shopping-bag", sector: "Retail, Sales & Warehousing" },
  { slug: "cashiers", name: "Cashier", icon: "credit-card", sector: "Retail, Sales & Warehousing" },
  { slug: "merchandisers", name: "Merchandiser", icon: "tag", sector: "Retail, Sales & Warehousing" },
  { slug: "picker-packers", name: "Warehouse Worker / Picker-Packer", icon: "package", sector: "Retail, Sales & Warehousing" },
  { slug: "stock-controllers", name: "Stock Controller", icon: "clipboard-list", sector: "Retail, Sales & Warehousing" },
  { slug: "forklift-operators", name: "Forklift Operator", icon: "truck", sector: "Retail, Sales & Warehousing" },

  // --- G. Transport & Logistics ---
  { slug: "truck-drivers", name: "Truck Driver (Heavy License)", icon: "truck", sector: "Transport & Logistics" },
  { slug: "delivery-couriers", name: "Delivery Driver / Courier", icon: "bike", sector: "Transport & Logistics" },
  { slug: "bus-drivers", name: "Bus Driver", icon: "bus", sector: "Transport & Logistics" },
  { slug: "taxi-drivers", name: "Taxi Driver (Licensed)", icon: "car", sector: "Transport & Logistics" },
  { slug: "loading-unloading-staff", name: "Loading / Unloading Staff", icon: "package-check", sector: "Transport & Logistics" },
  { slug: "fleet-dispatch-assistants", name: "Fleet Dispatcher Assistant", icon: "headset", sector: "Transport & Logistics" },

  // --- H. Healthcare (trained / licensed professionals) ---
  { slug: "registered-nurses", name: "Registered Nurse", icon: "stethoscope", sector: "Healthcare" },
  { slug: "nursing-assistants", name: "Nursing Assistant", icon: "activity", sector: "Healthcare" },
  { slug: "medical-caregivers", name: "Caregiver (Medical Facility)", icon: "heart-handshake", sector: "Healthcare" },
  { slug: "lab-technicians", name: "Lab Technician", icon: "flask-conical", sector: "Healthcare" },
  { slug: "pharmacy-assistants", name: "Pharmacy Assistant", icon: "pill", sector: "Healthcare" },
  { slug: "physiotherapy-assistants", name: "Physiotherapy Assistant", icon: "activity", sector: "Healthcare" },
  { slug: "hospital-support-staff", name: "Hospital Cleaner / Support Staff", icon: "hospital", sector: "Healthcare" },

  // --- I. Oil, Gas, Industrial & Manufacturing ---
  { slug: "production-line-workers", name: "Factory / Production Line Worker", icon: "factory", sector: "Oil, Gas & Industrial" },
  { slug: "machine-operators", name: "Machine Operator", icon: "cog", sector: "Oil, Gas & Industrial" },
  { slug: "quality-control-inspectors", name: "Quality Control Inspector", icon: "search-check", sector: "Oil, Gas & Industrial" },
  { slug: "industrial-technicians", name: "Industrial Technician", icon: "wrench", sector: "Oil, Gas & Industrial" },
  { slug: "auto-mechanics", name: "Mechanic (Auto / Heavy Machinery)", icon: "cog", sector: "Oil, Gas & Industrial" },
  { slug: "rig-support-workers", name: "Rig Support Worker (Technical Training)", icon: "flame", sector: "Oil, Gas & Industrial" },

  // --- J. Agriculture (mainly Oman, Saudi rural areas) ---
  { slug: "farm-laborers", name: "Farm Laborer", icon: "wheat", sector: "Agriculture" },
  { slug: "livestock-handlers", name: "Livestock Handler", icon: "users-round", sector: "Agriculture" },
  { slug: "irrigation-workers", name: "Irrigation Worker", icon: "droplet", sector: "Agriculture" },

  // --- K. Beauty & Personal Services ---
  { slug: "hairdressers-barbers", name: "Hairdresser / Barber", icon: "scissors", sector: "Beauty & Personal Services" },
  { slug: "beauticians-spa-therapists", name: "Beautician / Spa Therapist", icon: "flower-2", sector: "Beauty & Personal Services" },
  { slug: "massage-therapists", name: "Masseuse / Masseur", icon: "hand", sector: "Beauty & Personal Services" },
];

export type Course = {
  slug: string;
  name: string;
  duration: string;
  fee: string;
  certification: string;
};
export const courses: Course[] = [
  { slug: "housekeeping", name: "Housekeeping", duration: "2 weeks", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "hotel-services", name: "Hotel Services", duration: "3 weeks", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "cleaning-equipment", name: "Cleaning Equipment", duration: "1 week", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "industrial-cleaning", name: "Industrial Cleaning", duration: "1 week", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "caregiver", name: "Caregiver", duration: "4 weeks", fee: "Contact for pricing", certification: "Caregiver Certificate" },
  { slug: "nursing-assistant", name: "Nursing Assistant", duration: "6 weeks", fee: "Contact for pricing", certification: "Nursing Assistant Certificate" },
  { slug: "construction-safety", name: "Construction Safety", duration: "1 week", fee: "Contact for pricing", certification: "Safety Certificate" },
  { slug: "scaffolding", name: "Scaffolding", duration: "2 weeks", fee: "Contact for pricing", certification: "Scaffolding Certificate" },
  { slug: "welding", name: "Welding", duration: "6 weeks", fee: "Contact for pricing", certification: "Trade Certificate" },
  { slug: "forklift-awareness", name: "Forklift Awareness", duration: "3 days", fee: "Contact for pricing", certification: "Operator Awareness Certificate" },
  { slug: "customer-service", name: "Customer Service", duration: "1 week", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "arabic-basics", name: "Arabic Basics", duration: "4 weeks", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "english-communication", name: "English Communication", duration: "4 weeks", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "food-handling", name: "Food Handling", duration: "1 week", fee: "Contact for pricing", certification: "Food Safety Certificate" },
  { slug: "kitchen-assistant", name: "Kitchen Assistant", duration: "2 weeks", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "laundry-operations", name: "Laundry Operations", duration: "1 week", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "security-guard", name: "Security Guard", duration: "3 weeks", fee: "Contact for pricing", certification: "Security Certificate" },
  { slug: "warehouse-operations", name: "Warehouse Operations", duration: "2 weeks", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "retail-assistant", name: "Retail Assistant", duration: "1 week", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "office-etiquette", name: "Office Etiquette", duration: "3 days", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "interview-preparation", name: "Interview Preparation", duration: "3 days", fee: "Contact for pricing", certification: "Certificate of Completion" },
  { slug: "cultural-orientation", name: "Cultural Orientation for Gulf Countries", duration: "1 week", fee: "Contact for pricing", certification: "Orientation Certificate" },
];

export type JobListing = {
  id: string;
  title: string;
  country: string;
  category: string;
  salary: string;
  accommodation: boolean;
  food: boolean;
  visaIncluded: boolean;
  experience: string;
  urgent: boolean;
  featured: boolean;
};

export const jobs: JobListing[] = [
  { id: "j1", title: "Site Electrician", country: "UAE", category: "Electricians", salary: "AED 2,200/mo", accommodation: true, food: true, visaIncluded: true, experience: "3+ years", urgent: true, featured: true },
  { id: "j2", title: "Hotel Housekeeping Staff", country: "Qatar", category: "Hospitality", salary: "QAR 1,600/mo", accommodation: true, food: true, visaIncluded: true, experience: "1+ years", urgent: false, featured: true },
  { id: "j3", title: "Heavy Vehicle Driver", country: "Saudi Arabia", category: "Drivers", salary: "SAR 2,000/mo", accommodation: true, food: false, visaIncluded: true, experience: "5+ years", urgent: true, featured: false },
  { id: "j4", title: "Warehouse Operative", country: "Kuwait", category: "Warehouse", salary: "KWD 150/mo", accommodation: true, food: true, visaIncluded: true, experience: "1+ years", urgent: false, featured: false },
  { id: "j5", title: "Structural Welder", country: "Oman", category: "Welders", salary: "OMR 220/mo", accommodation: true, food: true, visaIncluded: true, experience: "4+ years", urgent: true, featured: true },
  { id: "j6", title: "Caregiver (Elderly Care)", country: "UAE", category: "Caregivers", salary: "AED 1,800/mo", accommodation: true, food: true, visaIncluded: true, experience: "2+ years", urgent: false, featured: true },
];

export const stats = [
  { value: "10,000+", label: "Workers Placed" },
  { value: "300+", label: "Companies" },
  { value: "15+", label: "Industries" },
  { value: "98%", label: "Visa Success" },
  { value: "5+", label: "Countries" },
  { value: "24/7", label: "Support" },
];

export const industries = [
  "Construction", "Hospitality", "Healthcare", "Domestic Workers", "Security",
  "Manufacturing", "Oil & Gas", "Cleaning", "Agriculture", "Retail",
  "Logistics", "Driving", "Engineering", "Restaurants", "Factories",
];

export const recruitmentProcess = [
  "Registration", "Document Verification", "Interview", "Training",
  "Medical Test", "Visa Processing", "Flight Booking", "Departure",
  "Arrival", "Employer Pickup",
];

// ---------------------------------------------------------------------------
// Industry showcase — richer, editorial-grade version of `industries` above
// (that flat list stays untouched for anywhere it's already used). Each entry
// maps to an actual file sitting in /public/jobs, so every card renders a
// real photo instead of a placeholder tile.
//
// `weHandle` is intentionally identical in spirit across every industry —
// it's the one promise that never changes regardless of trade: we register
// you, verify the employer, train and screen you, process your visa, and
// meet you on both ends of the flight. Repeating it per card (worded to fit
// the trade) is what makes each card stand alone if someone lands on it
// directly from a search engine or an ad.
// ---------------------------------------------------------------------------
export type IndustryDemand = "Very high demand" | "High demand" | "Steady demand";

export type IndustryDetail = {
  slug: string;
  name: string;
  /** file living in /public/jobs — undefined means no photo yet, card falls back to a gradient tile */
  image?: string;
  demand: IndustryDemand;
  tagline: string;
  description: string;
  weHandle: string[];
  /** slugs into jobCategories, used to pull through matching role chips */
  relatedRoleSlugs: string[];
};

export const industryDetails: IndustryDetail[] = [
  {
    slug: "construction",
    name: "Construction",
    image: "/jobs/construction.png",
    demand: "Very high demand",
    tagline: "The single biggest source of Gulf vacancies",
    description:
      "Every skyline in the Gulf is still going up, and site managers need laborers, masons, steel fixers, carpenters and supervisors faster than local labor markets can supply them. Whether you're new to site work or you've run a crew for years, there's a tier for you.",
    weHandle: [
      "Trade-test and grade you against real site requirements",
      "Site-safety and induction training before you fly",
      "Medical clearance and visa processing, cost shown upfront",
      "Airport pickup and handover to your site supervisor",
    ],
    relatedRoleSlugs: ["general-laborers", "masons-bricklayers", "carpenters", "steel-fixers", "site-supervisors"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    image: "/jobs/hospitality.png",
    demand: "Very high demand",
    tagline: "Hotels and resorts that never stop hiring",
    description:
      "Five-star hotels, resorts and serviced apartments across Dubai, Doha and Riyadh run on housekeeping, front-desk and kitchen staff. Gulf hospitality groups value candidates who are trainable, presentable and consistent — experience helps, but attitude is what gets you rehired.",
    weHandle: [
      "Grooming, guest-service and hotel-systems orientation",
      "English/Arabic hospitality phrasebook coaching",
      "Uniform, accommodation and shift-pattern briefing before departure",
      "Direct handover to your HR department on arrival",
    ],
    relatedRoleSlugs: ["hotel-housekeeping", "front-desk", "concierge-staff", "banquet-event-staff"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    image: "/jobs/healthcare.png",
    demand: "High demand",
    tagline: "Licensed and support roles, both in constant shortage",
    description:
      "Hospitals, clinics and elder-care facilities across the Gulf are short-staffed at every level, from registered nurses to hospital support staff. Licensed professionals go through credential verification early; support-staff roles need no prior license, only training we provide.",
    weHandle: [
      "Credential verification and license equivalency checks",
      "Document authentication where required",
      "Infection-control and patient-handling induction",
      "Placement only with licensed hospitals and care facilities",
    ],
    relatedRoleSlugs: ["registered-nurses", "nursing-assistants", "lab-technicians", "hospital-support-staff"],
  },
  {
    slug: "domestic-workers",
    name: "Domestic Workers",
    image: "/jobs/domesticworker.png",
    demand: "Very high demand",
    tagline: "Household roles with some of the fastest visa turnaround",
    description:
      "Families across the UAE, Saudi Arabia and Kuwait hire housemaids, nannies, cooks and drivers directly, which is why domestic placements often move faster than any other category. We only place with families vetted through licensed sponsorship, never informal arrangements.",
    weHandle: [
      "Household-role skills assessment (cooking, childcare, cleaning systems)",
      "Clear briefing on live-in terms, rest days and contract length",
      "Medical clearance and embassy-attested paperwork",
      "24/7 support line once you're placed with a family",
    ],
    relatedRoleSlugs: ["nannies-governesses", "private-chefs", "elderly-caregivers", "house-managers"],
  },
  {
    slug: "security",
    name: "Security",
    image: "/jobs/security.png",
    demand: "High demand",
    tagline: "Guarding roles across malls, sites and residential compounds",
    description:
      "Malls, construction sites, gated compounds and corporate buildings all run their own licensed security teams. Gulf security roles usually require a clean record and a short certified course, which we run before you travel so you land already qualified.",
    weHandle: [
      "Police clearance and background verification",
      "Certified security-guard training and licensing exam prep",
      "Uniform and shift-roster briefing",
      "Placement only with licensed security companies",
    ],
    relatedRoleSlugs: ["watchmen", "cctv-control-room", "gate-access-control"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    image: "/jobs/manufaturing.png",
    demand: "High demand",
    tagline: "Production floors that run three shifts a day",
    description:
      "Food processing, packaging, plastics and light-industrial plants across the Gulf run continuous shifts and need reliable machine operators, line workers and quality inspectors. Most roles train you on their specific line — we make sure you arrive ready to learn fast.",
    weHandle: [
      "Machine-safety and factory-floor induction",
      "Shift-pattern and overtime terms explained before you sign",
      "Medical fitness screening for factory work",
      "Employer handover directly at the plant gate",
    ],
    relatedRoleSlugs: ["production-line-workers", "machine-operators", "quality-control-inspectors"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    image: "/jobs/cleaning.png",
    demand: "Very high demand",
    tagline: "Facilities, offices and malls hiring in bulk, year-round",
    description:
      "Facilities-management companies servicing malls, offices, hospitals and residential towers hire cleaning staff in large batches, which means shorter waiting lists and faster group deployments than almost any other category.",
    weHandle: [
      "Commercial cleaning equipment and chemical-safety training",
      "Batch processing so groups can travel together",
      "Medical clearance and visa handled as one file per group",
      "On-site supervisor introduction on your first day",
    ],
    relatedRoleSlugs: ["office-cleaners", "janitors", "window-facade-cleaners"],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    image: "/jobs/agriculture.png",
    demand: "Steady demand",
    tagline: "Farm and livestock roles, mainly Oman and rural Saudi Arabia",
    description:
      "Oman's irrigated farms and Saudi Arabia's rural agricultural projects hire seasonal and permanent labor for planting, harvesting and livestock handling. Roles are physically demanding but come with stable, long-running contracts.",
    weHandle: [
      "Fitness and physical-readiness screening",
      "Climate and outdoor-work orientation",
      "Seasonal vs permanent contract terms explained upfront",
      "Accommodation and transport arrangements confirmed before departure",
    ],
    relatedRoleSlugs: ["farm-laborers", "livestock-handlers", "irrigation-workers"],
  },
  {
    slug: "retail",
    name: "Retail",
    image: "/jobs/retail.png",
    demand: "High demand",
    tagline: "Malls and supermarkets hiring floor and till staff",
    description:
      "The Gulf's mall culture means constant hiring for shop attendants, cashiers and merchandisers, especially ahead of Ramadan and year-end sales seasons. Retail roles are a common entry point for candidates building toward supervisory positions.",
    weHandle: [
      "Point-of-sale systems and customer-service coaching",
      "Grooming and retail-presentation standards briefing",
      "Medical clearance and visa processing",
      "Store handover and first-week check-in",
    ],
    relatedRoleSlugs: ["shop-attendants", "cashiers", "merchandisers"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    image: "/jobs/logistics.png",
    demand: "High demand",
    tagline: "Warehousing and distribution behind every Gulf supply chain",
    description:
      "E-commerce and import-heavy economies across the Gulf depend on warehouse and distribution staff who can keep pace with fast-moving stock. Forklift-certified candidates are placed fastest, but we also train candidates without prior certification.",
    weHandle: [
      "Warehouse-systems and inventory-handling orientation",
      "Forklift certification support where required",
      "Medical clearance and visa processing",
      "Direct handover to your warehouse supervisor",
    ],
    relatedRoleSlugs: ["picker-packers", "forklift-operators", "stock-controllers"],
  },
  {
    slug: "driving",
    name: "Driving",
    image: "/jobs/driving.png",
    demand: "Steady demand",
    tagline: "Licensed driving roles across family, freight and public transport",
    description:
      "From private family chauffeurs to heavy-truck haulage and licensed taxi work, Gulf driving roles pay well for a clean license and a clean record. Requirements vary sharply by country, so we match you to the licence class you actually qualify for.",
    weHandle: [
      "License-equivalency check against the destination country",
      "Route, traffic-law and vehicle-type orientation",
      "Medical clearance including vision testing",
      "Vehicle and employer handover on arrival",
    ],
    relatedRoleSlugs: ["personal-drivers", "truck-drivers", "bus-drivers", "taxi-drivers"],
  },
  {
    slug: "engineering",
    name: "Engineering",
    image: "/jobs/engineering.png",
    demand: "High demand",
    tagline: "Technical roles for certified and experienced tradespeople",
    description:
      "Electricians, HVAC technicians, welders and site engineers are in constant demand across the Gulf's construction and industrial projects. These roles pay above general-labor rates and usually require a trade certificate or verifiable experience.",
    weHandle: [
      "Trade-certificate verification and equivalency support",
      "Practical skills test where the employer requires it",
      "Medical clearance and visa processing",
      "Site or plant handover on your first day",
    ],
    relatedRoleSlugs: ["electricians", "hvac-technicians", "welders", "industrial-technicians"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    image: "/jobs/restaurant.png",
    demand: "Very high demand",
    tagline: "Kitchens and floors hiring across every price point",
    description:
      "From fast-casual chains to fine dining, Gulf restaurant groups hire cooks, waitstaff, baristas and dishwashers continuously to keep pace with tourism and expat dining demand. Food-handling certification is provided as part of your pre-departure training.",
    weHandle: [
      "Food-safety and hygiene certification before you travel",
      "Kitchen or floor-service skills orientation",
      "Medical clearance and visa processing",
      "Restaurant handover and first-shift walkthrough",
    ],
    relatedRoleSlugs: ["line-cooks", "waitstaff", "bartenders", "dishwashers-stewards"],
  },
  {
    slug: "factories",
    name: "Factories",
    image: "/jobs/factories.png",
    demand: "High demand",
    tagline: "Industrial-zone employers hiring at scale",
    description:
      "The industrial zones outside Riyadh, Dubai and Doha run large factory operations that hire production and support staff in bulk. These employers favor group placements, so factory vacancies often move through our pipeline faster than individual roles.",
    weHandle: [
      "Factory-floor safety induction",
      "Group medical screening and batch visa processing",
      "Shift-pattern and dormitory-accommodation briefing",
      "On-site supervisor handover for the whole group",
    ],
    relatedRoleSlugs: ["production-line-workers", "quality-control-inspectors", "machine-operators"],
  },
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    image: "/jobs/oil.png",
    demand: "Steady demand",
    tagline: "Technical and support roles for candidates with industrial training",
    description:
      "Oil, gas and petrochemical employers hire technicians and rig-support staff with prior industrial or mechanical training. These roles carry strict safety certification requirements, so we only take candidates through this pipeline once their technical background is confirmed.",
    weHandle: [
      "Technical background and certificate verification",
      "Health, Safety and Environment (HSE) induction training",
      "Medical clearance to industrial standards",
      "Placement only with licensed operators",
    ],
    relatedRoleSlugs: ["rig-support-workers", "industrial-technicians", "machine-operators"],
  },
];

// ---------------------------------------------------------------------------
// Site-wide FAQ bank — categorized so the FAQ page can group + filter them,
// and shared with the chatbot's policy answers so both stay in sync.
// ---------------------------------------------------------------------------
export type SiteFaq = { category: string; q: string; a: string };

export const siteFaqs: SiteFaq[] = [
  {
    category: "Fees & Costs",
    q: "Do candidates pay a recruitment fee?",
    a: "No fee is charged to candidates for employer-sponsored roles. Any government or visa costs are disclosed to you in writing before you sign anything.",
  },
  {
    category: "Fees & Costs",
    q: "Are there hidden charges later in the process?",
    a: "No. Every cost that applies to your specific role and destination is itemised and disclosed before you sign, not added afterward.",
  },
  {
    category: "Application Process",
    q: "How long does the whole process take?",
    a: "Typically 4-10 weeks from registration to departure, depending on the role and destination country's visa processing.",
  },
  {
    category: "Application Process",
    q: "Can I track my application?",
    a: "Yes, use the Track Application page with your reference/ID number to check your current status at any time.",
  },
  {
    category: "Application Process",
    q: "What documents do I need to apply?",
    a: "At minimum: a valid passport, educational/trade certificates, experience letters (if applicable), passport photos, and a police clearance certificate. Exact requirements vary by role and country — see the relevant country page.",
  },
  {
    category: "Medical & Training",
    q: "Is the medical lab a hospital?",
    a: "No, it performs pre-employment screening only, not general hospital care. Book a slot on the Book Medical page.",
  },
  {
    category: "Medical & Training",
    q: "Do I need to complete training before I fly out?",
    a: "Some roles require pre-departure or trade-specific training at our training school before deployment — this is confirmed as part of your application.",
  },
  {
    category: "Jobs & Countries",
    q: "Which countries do you place candidates in?",
    a: "We currently place candidates across the UAE, Qatar, Saudi Arabia, Kuwait and Oman, with roles spanning construction, hospitality, healthcare, domestic work and more.",
  },
  {
    category: "Jobs & Countries",
    q: "How do I know a job listing is genuine?",
    a: "Every listing on our Jobs page is tied to a verified employer we work with directly. If you're ever unsure about a listing claiming to be from us, contact our office to confirm before paying anything.",
  },
  {
    category: "Employers",
    q: "How can an employer request candidates?",
    a: "Visit the For Employers section to submit a hiring request — we handle sourcing, verification, and compliance on your behalf.",
  },
];
