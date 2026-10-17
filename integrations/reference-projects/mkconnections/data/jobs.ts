import { flyers, uradi, type Pic } from "@/lib/job-images";

export type Job = {
  slug: string;
  title: string;
  employer: string;
  country: string;
  city: string;
  category: string;
  salary: string;
  contract: string;
  experience: string;
  verified: boolean;
  posted: string;
  benefits: string[];
  description: string;
  requirements: string[];
  /** Photo shown on cards / detail page. */
  image?: Pic;
  /** Full recruitment flyer, shown in full on the detail page. */
  flyer?: Pic;
};

export const jobs: Job[] = [
  {
    slug: "heavy-truck-driver-riyadh",
    image: uradi.driver,
    title: "Heavy Truck Driver",
    employer: "Al Faisal Logistics",
    country: "Saudi Arabia",
    city: "Riyadh",
    category: "Drivers",
    salary: "SAR 2,200 / month",
    contract: "2 years, renewable",
    experience: "3+ years",
    verified: true,
    posted: "2 days ago",
    benefits: ["Accommodation provided", "Meals provided", "Medical cover", "Annual leave"],
    description:
      "Al Faisal Logistics is seeking experienced heavy truck drivers for long-haul freight routes across the Riyadh region. Candidates should hold a valid heavy-vehicle licence and be comfortable with multi-day routes.",
    requirements: ["Valid heavy truck licence", "Minimum 3 years driving experience", "Clean driving record", "Basic English or Arabic"],
  },
  {
    slug: "registered-nurse-dubai",
    image: uradi.caregiver,
    title: "Registered Nurse",
    employer: "Gulf Coast Medical Group",
    country: "United Arab Emirates",
    city: "Dubai",
    category: "Healthcare",
    salary: "AED 5,500 / month",
    contract: "2 years, renewable",
    experience: "2+ years",
    verified: true,
    posted: "5 days ago",
    benefits: ["Accommodation allowance", "Medical cover", "Flight allowance", "Annual leave"],
    description:
      "Gulf Coast Medical Group is hiring registered nurses for its Dubai facility. Candidates should be registered with their home nursing council and comfortable working in a multicultural clinical setting.",
    requirements: ["Valid nursing licence", "Minimum 2 years clinical experience", "DataFlow verification ready", "Good spoken English"],
  },
  {
    slug: "hotel-housekeeping-doha",
    image: uradi.hospitality,
    title: "Hotel Housekeeping Supervisor",
    employer: "Pearl Bay Hospitality",
    country: "Qatar",
    city: "Doha",
    category: "Hospitality",
    salary: "QAR 2,600 / month",
    contract: "2 years",
    experience: "2+ years",
    verified: true,
    posted: "1 week ago",
    benefits: ["Accommodation provided", "Meals provided", "Medical cover", "Transport provided"],
    description:
      "Pearl Bay Hospitality is looking for a housekeeping supervisor to oversee a team of room attendants at a four-star property in Doha.",
    requirements: ["2+ years hotel housekeeping experience", "Supervisory experience preferred", "Good communication skills"],
  },
  {
    slug: "construction-site-supervisor-kuwait",
    image: uradi.construction,
    title: "Construction Site Supervisor",
    employer: "Al Rashid Contracting",
    country: "Kuwait",
    city: "Kuwait City",
    category: "Construction",
    salary: "KWD 350 / month",
    contract: "2 years",
    experience: "5+ years",
    verified: true,
    posted: "3 days ago",
    benefits: ["Accommodation provided", "Transport provided", "Medical cover"],
    description:
      "Al Rashid Contracting requires an experienced site supervisor for a commercial building project in Kuwait City.",
    requirements: ["Diploma in civil engineering or related field", "5+ years site supervision experience", "OSHA awareness an advantage"],
  },
  {
    slug: "security-officer-manama",
    image: { src: "/images/jobs/mensecurityofficers.png", fallback: "/images/jobs/men.png" },
    title: "Security Officer",
    employer: "Gulf Shield Security",
    country: "Bahrain",
    city: "Manama",
    category: "Security",
    salary: "BHD 130 / month",
    contract: "2 years",
    experience: "1+ years",
    verified: false,
    posted: "Today",
    benefits: ["Accommodation provided", "Meals provided", "Uniform provided"],
    description:
      "Gulf Shield Security is recruiting security officers for commercial sites across Manama. This listing is pending verification.",
    requirements: ["Prior security experience an advantage", "Physically fit", "Clean record"],
  },
  {
    slug: "domestic-worker-muscat",
    image: uradi.domesticWorker,
    title: "Domestic Worker",
    employer: "Private Household",
    country: "Oman",
    city: "Muscat",
    category: "Domestic Employment",
    salary: "OMR 130 / month",
    contract: "2 years",
    experience: "Entry level",
    verified: true,
    posted: "4 days ago",
    benefits: ["Accommodation provided", "Meals provided", "Medical cover", "Annual leave"],
    description:
      "A private household in Muscat is seeking a domestic worker. Full pre-departure orientation and contract briefing provided by MK Connection Limited before travel.",
    requirements: ["Basic literacy", "Prior domestic work experience preferred", "Willingness to relocate"],
  },
  /*
  |--------------------------------------------------------------------------
  | NEW — recruitment flyers (added, nothing above was removed)
  |--------------------------------------------------------------------------
  | Salary / commission details are deliberately not invented here: they are
  | confirmed directly with MK Connection Limited, as on the rest of the site.
  */
  {
    slug: "airport-loaders-saudi-arabia",
    title: "Airport Loaders",
    employer: "MK Connection Limited",
    country: "Saudi Arabia",
    city: "Multiple cities",
    category: "Logistics",
    salary: "Contact us for current salary",
    contract: "Confirmed on application",
    experience: "Entry level",
    verified: false,
    posted: "New",
    image: flyers.airportLoadersSaudi,
    flyer: flyers.airportLoadersSaudi,
    benefits: ["Details confirmed by MK Connection", "Pre-departure guidance"],
    description:
      "Airport loader opportunities in Saudi Arabia for applicants who are fit, ready to travel and able to work in a physical, fast-paced airport environment. Contact MK Connection Limited for current employer requirements, salary and travel details.",
    requirements: ["Physically fit", "Valid passport or ready to apply", "Ready to travel", "Willing to work shifts"],
  },
  {
    slug: "female-drivers-saudi-arabia",
    title: "Female Drivers",
    employer: "MK Connection Limited",
    country: "Saudi Arabia",
    city: "Multiple cities",
    category: "Drivers",
    salary: "Contact us for current salary",
    contract: "Confirmed on application",
    experience: "Driving experience required",
    verified: false,
    posted: "New",
    image: flyers.femaleDriversSaudi,
    flyer: flyers.femaleDriversSaudi,
    benefits: ["Details confirmed by MK Connection", "Pre-departure guidance"],
    description:
      "Driving opportunities in Saudi Arabia for qualified female applicants. Contact MK Connection Limited for the latest employer requirements, licence conditions and package details.",
    requirements: ["Valid driving licence", "Driving experience", "Ready to travel", "Good communication skills"],
  },
  {
    slug: "house-managers-qatar",
    title: "House Managers",
    employer: "MK Connection Limited",
    country: "Qatar",
    city: "Multiple cities",
    category: "Domestic Employment",
    salary: "Contact us for current salary",
    contract: "Confirmed on application",
    experience: "Household experience preferred",
    verified: false,
    posted: "New",
    image: flyers.houseManagerQatar,
    flyer: flyers.houseManagerQatar,
    benefits: ["Details confirmed by MK Connection", "Pre-departure guidance"],
    description:
      "House manager opportunities in Qatar for experienced, trustworthy applicants able to run and organise a household. Contact MK Connection Limited for current employer requirements and employment details.",
    requirements: ["Household management experience preferred", "Good communication skills", "Ready to travel", "Trustworthy and organised"],
  },
  {
    slug: "house-to-house-cleaners-qatar",
    title: "House-to-House Cleaners",
    employer: "MK Connection Limited",
    country: "Qatar",
    city: "Multiple cities",
    category: "Cleaning",
    salary: "Contact us for current salary",
    contract: "Confirmed on application",
    experience: "Entry level",
    verified: false,
    posted: "New",
    image: flyers.houseToHouseQatar,
    flyer: flyers.houseToHouseQatar,
    benefits: ["Details confirmed by MK Connection", "Pre-departure guidance"],
    description:
      "House-to-house cleaning opportunities in Qatar for hardworking applicants ready for overseas employment. Contact MK Connection Limited for current requirements and arrangements.",
    requirements: ["Previous cleaning experience an advantage", "Physically fit", "Ready to travel", "Willing to work overtime where required"],
  },
  {
    slug: "nail-technicians-hairdressers-qatar",
    title: "Nail Technicians & Hairdressers",
    employer: "MK Connection Limited",
    country: "Qatar",
    city: "Multiple cities",
    category: "Beauty & Salon",
    salary: "Contact us for current salary",
    contract: "Confirmed on application",
    experience: "Salon experience required",
    verified: false,
    posted: "New",
    image: flyers.nailTechQatar,
    flyer: flyers.nailTechQatar,
    benefits: ["Details confirmed by MK Connection", "Pre-departure guidance"],
    description:
      "Opportunities in Qatar for nail technicians and hairdressers with salon experience. Contact MK Connection Limited for current employer requirements, trade-test expectations and package details.",
    requirements: ["Proven nail or hairdressing skills", "Salon experience", "Good customer service", "Ready to travel"],
  },
];

export const categories = [
  "Healthcare",
  "Hospitality",
  "Construction",
  "Drivers",
  "Security",
  "Domestic Employment",
  "Manufacturing",
  "Engineering",
  "Skilled Trades",
  "Cleaning",
  "Technicians",
  "IT",
  "Administration",
  "Logistics",
  "Beauty & Salon",
  "Agriculture",
];

export const destinations = [
  { name: "Saudi Arabia", code: "SA", jobs: jobs.filter((j) => j.country === "Saudi Arabia").length + 128, image: "/images/countries/saudiarabia.png", summary: "Household, hospitality, logistics and general employment opportunities as verified demand opens." },
  { name: "United Arab Emirates", code: "AE", jobs: jobs.filter((j) => j.country === "United Arab Emirates").length + 94, image: "/images/countries/dubaicity.png", summary: "Hospitality, healthcare, household, driving and professional opportunities across the UAE." },
  { name: "Qatar", code: "QA", jobs: jobs.filter((j) => j.country === "Qatar").length + 61, image: "/images/countries/qatar.png", summary: "Domestic, hospitality, construction and skilled roles with confirmed employer demand." },
  { name: "Kuwait", code: "KW", jobs: jobs.filter((j) => j.country === "Kuwait").length + 47, image: "/images/countries/kuwaitcity.jfif", summary: "Household, cleaning, warehouse and construction opportunities as openings are confirmed." },
  { name: "Bahrain", code: "BH", jobs: jobs.filter((j) => j.country === "Bahrain").length + 29, image: "/images/countries/manamabahrain.png", summary: "Hospitality, security and general employment pathways with current employer demand." },
  { name: "Oman", code: "OM", jobs: jobs.filter((j) => j.country === "Oman").length + 33, image: "/images/countries/muscatoman.png", summary: "Household, driving, maintenance and general roles subject to verified openings." },
];
