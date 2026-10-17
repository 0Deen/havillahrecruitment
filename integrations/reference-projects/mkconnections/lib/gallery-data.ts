export type GalleryItem = {
  id: string;
  img: string;
  title: string;
  country: string; // filter key
  flag: string;
  content: string;
  tint: string; // soft pastel card background
};

export const countryFilters = [
  "All",
  "Saudi Arabia",
  "UAE",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  " MK Connection Brand",
] as const;

const flags: Record<string, string> = {
  "Saudi Arabia": "🇸🇦",
  UAE: "🇦🇪",
  Qatar: "🇶🇦",
  Kuwait: "🇰🇼",
  Bahrain: "🇧🇭",
  Oman: "🇴🇲",
  " MK Connection Brand": "✈️",
};

const tints = ["#FDECEC", "#EAF0FB", "#FFF4DC", "#E8F6EF", "#F4EAF8", "#FFEFE3"];

const raw: Omit<GalleryItem, "flag" | "tint">[] = [
  { id: "g1", img: "/atlas/famahma.jpg", title: "Housemaids & Home Care", country: "Saudi Arabia", content: "Connects workers to verified Saudi households seeking housemaids, nannies, and domestic staff. Safe, clear, and fast processing." },
  { id: "g2", img: "/atlas/faf.jpg", title: "Drivers & Delivery Staff", country: "UAE", content: "Company drivers, personal drivers, and delivery staff opportunities in UAE with full guidance and contract transparency." },
  { id: "g3", img: "/atlas/fadsas.jpg", title: "Construction & Labour", country: "Qatar", content: "General labourers, helpers, warehouse loaders, and construction support roles with trusted Qatari employers." },
  { id: "g4", img: "/atlas/fasda.jpg", title: "Cleaners & Sanitation", country: "Kuwait", content: "Janitors, building cleaners, and sanitation workers placed with secure, verified companies in Kuwait." },
  { id: "g5", img: "/atlas/fatmcbe.jpg", title: "Hospitality & Catering", country: "Bahrain", content: "Waiters, attendants, cooks, and hotel support staff deployed to reputable hospitality employers in Bahrain." },
  { id: "g6", img: "/atlas/fhaate.jpg", title: "Security Staff", country: "Oman", content: "Security guards, watchmen, and property attendants with professional vetting and safe placement." },
  { id: "g7", img: "/atlas/fhadf.jpg", title: "Nannies & Child Care", country: "Saudi Arabia", content: "Professional nanny and childcare roles with structured responsibilities and fair employer policies." },
  { id: "g8", img: "/atlas/fhatpat.jpg", title: "Office & Admin Assistants", country: "UAE", content: "Clerical, receptionist, and admin support roles with stable corporate environments across UAE." },
  { id: "g9", img: "/atlas/fmagat.jpg", title: "Technicians & Skilled Workers", country: "Qatar", content: "Electricians, plumbers, tilers, machine operators, and other skilled labour opportunities." },
  { id: "g10", img: "/atlas/fmageatbec.jpg", title: "Storekeepers & Stock Managers", country: "Kuwait", content: "Warehouse stock handlers, storekeepers, and logistics support roles with reputable firms." },
  { id: "g11", img: "/atlas/fsayaa3.jpg", title: "Restaurant Crew", country: "Bahrain", content: "Fast food attendants, baristas, kitchen support, and service crew deployed safely and efficiently." },
  { id: "g12", img: "/atlas/fumage.jpg", title: "Mechanics & Auto Staff", country: "Oman", content: "Auto repair, diagnostics, maintenance, and workshop roles placed with verified companies." },
  { id: "g13", img: "/atlas/atlaspic.jpg", title: " MK Connection Signage", country: " MK Connection Brand", content: "The MK Connection Limited mark — Unlocking New Possibilities." },
  { id: "g14", img: "/atlas/deen.jpg", title: " MK Connection Letterhead", country: " MK Connection Brand", content: "Our identity on paper: clear, professional and easy to recognise." },
  { id: "g15", img: "/atlas/ramah.jpg", title: " MK Connection Wall Mark", country: " MK Connection Brand", content: "The palm, the sun and the plane — the journey from home to opportunity." },
  { id: "g16", img: "/atlas/jepg.jpg", title: "The  MK Connection Logo", country: " MK Connection Brand", content: "MK Connection Limited — a global talent gateway built on trust, clarity and integrity." },
];

export const galleryItems: GalleryItem[] = raw.map((r, i) => ({
  ...r,
  flag: flags[r.country] ?? "🌍",
  tint: tints[i % tints.length],
}));
