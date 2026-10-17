// Full "Country Experience" content model — the data behind the premium,
// cinematic, 18-section country pages (Oman is the master template).
// Every other country (UAE, Qatar, Saudi Arabia, Kuwait, Bahrain) plugs
// into the exact same CountryExperience type, so the whole page rebuilds
// itself automatically once its object is added to `countryExperiences`.
//
// NOTE ON MEDIA: real photography and video haven't been supplied yet.
// Every field that will eventually hold an image or video path currently
// holds a short descriptive `caption` plus a `mood` tag that the section
// components use to render a placeholder (a gradient + icon + label)
// instead of a broken <img>. The moment real files land in /public/images
// and /public/videos, swap the `src` fields in and the placeholders
// disappear on their own — no component changes required.

export type MediaSlot = {
  caption: string;
  mood: "sky" | "gold" | "sea" | "sand" | "night" | "green";
  src?: string; // populate once real photography/video is supplied
};

export type CountryExperience = {
  slug: string;
  name: string;
  flag: string;
  tagline: string;

  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    rotatingShots: MediaSlot[];
  };

  quickFacts: { label: string; value: string }[];
  introParagraph: string;

  gallery: MediaSlot[];

  cities: {
    name: string;
    blurb: string;
    industries: string[];
    weather: string;
  }[];

  whyWork: { title: string; description: string }[];

  dailyLife: { period: string; title: string; description: string }[];

  industries: {
    name: string;
    salary: string;
    experience: string;
    hiring: string;
    openings: number;
  }[];

  salaryBands: { role: string; monthlyLow: number; monthlyHigh: number }[];
  currency: string;
  currencyToUsd: number; // rough conversion for the calculator

  costOfLiving: { item: string; homeCountryPct: number; hostCountryPct: number }[];

  culture: { title: string; description: string }[];

  climate: { month: string; tempC: number; condition: "sun" | "cloud" | "rain" }[];

  documents: { name: string; guidance: string }[];

  journey: { step: string; description: string }[];

  successStories: {
    name: string;
    role: string;
    fromTo: string;
    quote: string;
    before: string;
    after: string;
  }[];

  videoLibrary: { title: string; description: string; length: string }[];

  faqs: { q: string; a: string }[];

  palette: {
    primary: string;
    accent: string;
    secondary: string;
  };
};

export const omanExperience: CountryExperience = {
  slug: "oman",
  name: "Oman",
  flag: "🇴🇲",
  tagline: "Build Your Future in One of the Gulf's Fastest-Growing Economies",

  hero: {
    eyebrow: "Work in Oman",
    headline: "Oman Is Calling",
    sub:
      "From the mountain roads above Nizwa to the cranes rising over Muscat's harbour, Oman is quietly becoming one of the most rewarding places in the Gulf to build a career. This is what your first year could look like.",
    rotatingShots: [
      { caption: "Muscat's coastline at first light", mood: "sea" },
      { caption: "Sultan Qaboos Grand Mosque, Muscat", mood: "gold" },
      { caption: "The Hajar Mountains at dusk", mood: "sand" },
      { caption: "A coastal highway south of the capital", mood: "sky" },
      { caption: "A five-star hotel lobby in Muscat", mood: "gold" },
      { caption: "Muscat International Airport at night", mood: "night" },
      { caption: "A construction crew on site, early morning", mood: "sand" },
      { caption: "Offshore platforms along the coast", mood: "sea" },
      { caption: "Sohar's turquoise shoreline", mood: "sea" },
      { caption: "Modern office towers, Al Khuwair", mood: "sky" },
    ],
  },

  quickFacts: [
    { label: "Capital", value: "Muscat" },
    { label: "Currency", value: "Omani Rial (OMR)" },
    { label: "Language", value: "Arabic (English widely spoken at work)" },
    { label: "Population", value: "5 million+" },
    { label: "Time zone", value: "GMT+4" },
    { label: "Religion", value: "Islam" },
    { label: "Climate", value: "Warm, dry, coastal humidity in summer" },
    { label: "Typical salary range", value: "OMR 120 - 600 / month" },
    { label: "Working week", value: "5-6 days" },
    { label: "Driving side", value: "Right" },
  ],

  introParagraph:
    "Oman doesn't get talked about as much as its neighbours, and that's exactly why it's worth a second look. It's calmer than Dubai, less crowded than Doha, and the cost of living leaves more of your salary actually in your pocket by the end of the month. Employers here have a reputation for being patient with newcomers — you're not thrown into a 45-degree job site on day one without an orientation. If you want steady, well-paid work in a country that still feels manageable, Oman is worth serious consideration.",

  gallery: [
    { caption: "Al Bustan Palace and the Muscat skyline", mood: "gold" },
    { caption: "A newly finished highway interchange", mood: "sky" },
    { caption: "Mutrah Souq at dusk", mood: "night" },
    { caption: "A shopping mall food court, mid-afternoon", mood: "sand" },
    { caption: "A pre-cast concrete plant near Sohar", mood: "sand" },
    { caption: "Hotel housekeeping team, morning briefing", mood: "gold" },
    { caption: "Sohar Port, container terminal", mood: "sea" },
    { caption: "A logistics warehouse, Barka industrial zone", mood: "sand" },
    { caption: "Duqm's oil and gas storage yards", mood: "sea" },
    { caption: "Wadi Shab from above, drone shot", mood: "green" },
    { caption: "A residential compound, worker housing", mood: "sky" },
    { caption: "Night shift at a manufacturing plant", mood: "night" },
  ],

  cities: [
    {
      name: "Muscat",
      blurb:
        "The capital, and where most white-collar and hospitality jobs are based. Expect modern offices, five-star hotels along the corniche, and the widest range of nationalities on any job site in the country.",
      industries: ["Hospitality", "Retail", "Healthcare Support", "Office & Admin"],
      weather: "Hot and humid May-September, mild and pleasant November-March.",
    },
    {
      name: "Salalah",
      blurb:
        "The south, and completely different from the rest of the country in July and August, when monsoon rains turn the surrounding hills green. A smaller job market, mostly hospitality and agriculture.",
      industries: ["Hospitality", "Agriculture", "Retail"],
      weather: "Monsoon season (khareef) June-September; hot and dry the rest of the year.",
    },
    {
      name: "Sohar",
      blurb:
        "An industrial city built around its port. If your trade is welding, logistics, or heavy manufacturing, this is where the openings are concentrated.",
      industries: ["Manufacturing", "Logistics", "Construction", "Oil & Gas"],
      weather: "Hot and dry, slightly cooler coastal breeze than inland sites.",
    },
    {
      name: "Nizwa",
      blurb:
        "An inland city in the foothills of the Hajar Mountains, historically the country's craft and trade centre. Cooler than the coast and a common posting for agricultural and construction roles.",
      industries: ["Construction", "Agriculture"],
      weather: "Cooler evenings than the coast; more comfortable in summer.",
    },
    {
      name: "Duqm",
      blurb:
        "A newer special economic zone on the central coast, growing fast around its port, dry dock, and refinery. Camp-style accommodation is common here, and demand for skilled trades is high.",
      industries: ["Oil & Gas", "Construction", "Logistics"],
      weather: "Hot, dry, and exposed to coastal winds.",
    },
  ],

  whyWork: [
    { title: "Genuinely safe country", description: "Oman consistently ranks among the safest countries in the region — low crime, calm streets, and a government that takes worker welfare seriously." },
    { title: "No personal income tax", description: "What you're paid is what you keep, aside from any agreed deductions for accommodation or transport." },
    { title: "Modern infrastructure", description: "New highways, new hospitals, new ports — a huge share of the country's roads and buildings are less than fifteen years old." },
    { title: "Room to grow", description: "Because the economy is diversifying away from oil, employers are actively promoting from within rather than only hiring externally." },
    { title: "Competitive pay for the region", description: "Salaries sit comfortably alongside Qatar and the UAE once you account for Oman's noticeably lower cost of living." },
    { title: "Accommodation often included", description: "Most contracts we place include either free or heavily subsidised housing, which is where the real savings happen." },
    { title: "Employer-provided medical cover", description: "Where offered by the employer, basic medical insurance is standard for the length of your contract." },
    { title: "Transport benefits", description: "Site and hotel jobs typically include a daily shuttle, so you're not paying out of pocket to get to work." },
  ],

  dailyLife: [
    { period: "Morning", title: "The day starts early", description: "Most sites and hotels start between 6:30 and 7:30am, before the heat sets in. Company transport usually picks workers up from accommodation, so mornings are less chaotic than they sound." },
    { period: "Midday", title: "A proper lunch break", description: "Construction and industrial contracts build in a longer midday break during the hottest months, in line with Oman's official summer working-hours rules. Canteen meals or a food allowance are standard." },
    { period: "Evening", title: "Time that's actually yours", description: "Shifts wind down by early evening. Workers head to the souq, a shisha café, the corniche in Muscat, or simply back to shared accommodation to rest, call family, or cook." },
    { period: "Weekend", title: "Fridays, mostly", description: "Friday is the main rest day across Oman, with many contracts also giving a half or full Saturday. Popular ways to spend it: the beach, a mountain drive, or a trip to the mall." },
  ],

  industries: [
    { name: "Construction", salary: "OMR 140 - 280/mo", experience: "0-2 yrs (trainee) / 3+ yrs (skilled)", hiring: "Year-round", openings: 34 },
    { name: "Hospitality & Hotels", salary: "OMR 150 - 320/mo", experience: "1+ yrs preferred", hiring: "Peaks Oct-Mar (tourist season)", openings: 21 },
    { name: "Domestic Work", salary: "OMR 100 - 160/mo", experience: "Training provided", hiring: "Year-round", openings: 18 },
    { name: "Driving", salary: "OMR 150 - 260/mo", experience: "Valid licence + 2 yrs", hiring: "Year-round", openings: 9 },
    { name: "Security", salary: "OMR 130 - 210/mo", experience: "Training provided", hiring: "Year-round", openings: 14 },
    { name: "Oil & Gas Support", salary: "OMR 200 - 450/mo", experience: "2+ yrs technical", hiring: "Rolling, Duqm & Sohar", openings: 11 },
    { name: "Manufacturing", salary: "OMR 140 - 260/mo", experience: "Trade certificate helpful", hiring: "Year-round", openings: 16 },
    { name: "Warehousing & Logistics", salary: "OMR 140 - 240/mo", experience: "Forklift ticket an advantage", hiring: "Year-round", openings: 13 },
  ],

  salaryBands: [
    { role: "General Labourer", monthlyLow: 140, monthlyHigh: 190 },
    { role: "Skilled Tradesperson (welder, electrician)", monthlyLow: 220, monthlyHigh: 400 },
    { role: "Hotel Housekeeping / F&B Staff", monthlyLow: 150, monthlyHigh: 280 },
    { role: "Driver", monthlyLow: 150, monthlyHigh: 260 },
    { role: "Domestic Worker / Caregiver", monthlyLow: 100, monthlyHigh: 170 },
    { role: "Security Officer", monthlyLow: 130, monthlyHigh: 210 },
    { role: "Site Supervisor", monthlyLow: 350, monthlyHigh: 600 },
  ],
  currency: "OMR",
  currencyToUsd: 2.6,

  costOfLiving: [
    { item: "Rent (shared accommodation)", homeCountryPct: 30, hostCountryPct: 12 },
    { item: "Food", homeCountryPct: 28, hostCountryPct: 18 },
    { item: "Transport", homeCountryPct: 15, hostCountryPct: 6 },
    { item: "Utilities", homeCountryPct: 12, hostCountryPct: 9 },
    { item: "Internet & phone", homeCountryPct: 8, hostCountryPct: 5 },
    { item: "Entertainment", homeCountryPct: 7, hostCountryPct: 10 },
  ],

  culture: [
    { title: "Dress modestly on site and off", description: "Loose, covering clothing is expected in public. Uniforms are provided for most contracted roles." },
    { title: "Friday is the holy day", description: "Most businesses close or shorten hours Friday morning for prayer; plan errands around it." },
    { title: "Ramadan changes the rhythm", description: "Working hours are legally shortened during Ramadan, and eating or drinking in public during fasting hours is not permitted, even for non-Muslims." },
    { title: "Greetings matter", description: "A right-hand handshake and a warm 'salaam' go a long way. Public displays of affection between couples are best avoided." },
    { title: "Photography courtesy", description: "Always ask before photographing people, especially women, and avoid photographing government or military buildings." },
    { title: "Workplace hierarchy is respected", description: "Formality with supervisors and clear reporting lines are the norm across Omani workplaces, more so than in some other Gulf states." },
  ],

  climate: [
    { month: "Jan", tempC: 22, condition: "sun" },
    { month: "Feb", tempC: 23, condition: "sun" },
    { month: "Mar", tempC: 27, condition: "sun" },
    { month: "Apr", tempC: 32, condition: "sun" },
    { month: "May", tempC: 37, condition: "sun" },
    { month: "Jun", tempC: 39, condition: "cloud" },
    { month: "Jul", tempC: 38, condition: "rain" },
    { month: "Aug", tempC: 37, condition: "cloud" },
    { month: "Sep", tempC: 35, condition: "sun" },
    { month: "Oct", tempC: 31, condition: "sun" },
    { month: "Nov", tempC: 27, condition: "sun" },
    { month: "Dec", tempC: 23, condition: "sun" },
  ],

  documents: [
    { name: "Passport", guidance: "Original, with at least 6 months validity remaining and two blank visa pages." },
    { name: "CV", guidance: "One page where possible, listing trade certificates and previous Gulf experience if any." },
    { name: "Trade or educational certificates", guidance: "Bring originals plus one photocopy each; some employers request attestation, which we help arrange." },
    { name: "National ID", guidance: "Original and a clear photocopy of both sides." },
    { name: "Police clearance certificate", guidance: "Required for most visa categories; must usually be less than 6 months old at the time of visa lodgement." },
    { name: "Medical results", guidance: "From our approved pre-employment screening only — see the Medical Laboratory section for what's involved." },
    { name: "Passport photographs", guidance: "Six recent copies, white background, no headwear except religious covering." },
  ],

  journey: [
    { step: "Registration", description: "Submit your details and documents; we confirm which roles you're eligible for within 48 hours." },
    { step: "Interview", description: "A short call or in-person interview with our recruitment team, followed by employer shortlisting." },
    { step: "Training", description: "Role-specific preparation at our training centre, where required for the position." },
    { step: "Medical", description: "Pre-employment screening at our laboratory to confirm fitness for deployment." },
    { step: "Visa", description: "We handle the employer's visa sponsorship paperwork and government processing on your behalf." },
    { step: "Flight", description: "Ticket booked and confirmed once your visa clears; we brief you fully before departure." },
    { step: "Arrival", description: "Landing in Muscat, Sohar, or Duqm depending on your employer's location." },
    { step: "Employer Pickup", description: "Your employer or their representative meets you at the airport for transfer to accommodation." },
  ],

  successStories: [
    { name: "Amina", role: "Hotel Housekeeping Supervisor", fromTo: "Nairobi → Muscat", quote: "I was nervous about moving somewhere I'd never been, but the team walked me through every step before I flew.", before: "Working two casual jobs to make rent", after: "Promoted to supervisor after 14 months, sending savings home monthly" },
    { name: "David", role: "Structural Welder", fromTo: "Mombasa → Sohar", quote: "The training centre made sure I could pass the site's welding test before I even landed, so I started with confidence.", before: "Freelance welding jobs, unpredictable income", after: "Steady contract, housing included, renewed for a second term" },
    { name: "Grace", role: "Caregiver", fromTo: "Kisumu → Muscat", quote: "My employer's family has been kind, and my contract includes a flight home every year to see my kids.", before: "Looking for stable work after finishing training", after: "Two years into her placement, saving toward a small business back home" },
  ],

  videoLibrary: [
    { title: "Working in Oman: What to Expect", description: "A grounded look at your first month, from arrival to first payday.", length: "4:12" },
    { title: "Life in Muscat", description: "A walk through the corniche, souq, and where workers spend their weekends.", length: "3:05" },
    { title: "Inside a Construction Site", description: "Safety briefings, shift patterns, and a day with the crew.", length: "5:40" },
    { title: "Hotel Jobs in Muscat", description: "Housekeeping and F&B staff talk through a typical shift.", length: "3:48" },
    { title: "Factory Floor: Sohar", description: "Manufacturing roles and what the industrial zone looks like day to day.", length: "4:30" },
    { title: "Landing Day: Airport to Accommodation", description: "Exactly what happens between touchdown and your first night.", length: "2:55" },
  ],

  faqs: [
    { q: "Do I need experience to apply?", a: "Not for entry-level roles — training is provided. Skilled trades and supervisory roles do require documented experience." },
    { q: "Is accommodation provided?", a: "Most contracts we place include free or subsidised shared accommodation. We confirm the exact arrangement before you sign anything." },
    { q: "Can couples work together in Oman?", a: "It depends on the employer and roles available. Let your recruitment officer know early so we can look for compatible placements." },
    { q: "How long is a typical contract?", a: "Most contracts run two years, renewable by mutual agreement." },
    { q: "Who pays for the visa?", a: "The sponsoring employer covers standard visa costs. Any exceptions are disclosed to you in writing before you accept an offer." },
    { q: "How much luggage can I bring?", a: "Standard economy allowance is usually 20-30kg checked, one carry-on. We confirm your airline's exact policy before departure." },
    { q: "Can I renew my contract at the end of the term?", a: "Yes, renewal is common and usually initiated by the employer 60-90 days before contract end." },
  ],

  palette: { primary: "#0B1F3A", accent: "#C9971E", secondary: "#0E7C66" },
};

export const countryExperiences: Record<string, CountryExperience> = {
  oman: omanExperience,
};
