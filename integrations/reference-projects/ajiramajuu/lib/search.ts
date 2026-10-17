import { destinations, getJobsByCountrySlug, searchJobs, findDestinationInText } from "@/data/jobs";
import { FAQS, RESOURCES } from "@/data/content";

export interface SearchHit {
  kind: "Job" | "Destination" | "Resource" | "FAQ" | "Page";
  title: string;
  subtitle?: string;
  href: string;
}

const PAGES: SearchHit[] = [
  { kind: "Page", title: "Apply now", subtitle: "No account needed", href: "/apply" },
  { kind: "Page", title: "How it works", subtitle: "From application to deployment", href: "/how-it-works" },
  { kind: "Page", title: "Contact Ajira Majuu", subtitle: "Call, WhatsApp, email", href: "/contact" },
  { kind: "Page", title: "Recruitment safety", subtitle: "Protect yourself from scams", href: "/recruitment-safety" },
  { kind: "Page", title: "For employers", subtitle: "Request recruitment support", href: "/for-employers" },
  { kind: "Page", title: "About Ajira Majuu", href: "/about" },
  { kind: "Page", title: "AI assistant", subtitle: "Ask a question", href: "/assistant" },
];

const norm = (s: string) => s.toLowerCase();

/** Fast, in-memory site search over centralized data. Active jobs only. */
export function searchSite(query: string): SearchHit[] {
  const q = norm(query).trim();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];

  searchJobs(q).forEach((j) =>
    hits.push({ kind: "Job", title: j.title, subtitle: `${j.country} · ${j.salary}`, href: `/jobs/${j.slug}` })
  );

  const dest = findDestinationInText(q);
  destinations
    .filter((d) => d === dest || norm(d.name).includes(q) || d.aliases.some((a) => a.includes(q)))
    .forEach((d) => {
      const n = getJobsByCountrySlug(d.slug).length;
      hits.push({ kind: "Destination", title: `${d.flag} ${d.name}`, subtitle: n ? `${n} current opportunities` : "Contact us for current openings", href: `/destinations/${d.slug}` });
    });

  RESOURCES.filter((r) => r.status === "published" && norm(`${r.title} ${r.summary} ${r.category}`).includes(q)).forEach((r) =>
    hits.push({ kind: "Resource", title: r.title, subtitle: r.category, href: `/resources/${r.slug}` })
  );

  FAQS.filter((f) => f.status === "published" && norm(`${f.q} ${f.a}`).includes(q)).slice(0, 4).forEach((f) =>
    hits.push({ kind: "FAQ", title: f.q, subtitle: f.category, href: `/faq#${f.id}` })
  );

  PAGES.filter((p) => norm(`${p.title} ${p.subtitle ?? ""}`).includes(q)).forEach((p) => hits.push(p));

  // de-duplicate by href
  const seen = new Set<string>();
  return hits.filter((h) => (seen.has(h.href) ? false : (seen.add(h.href), true))).slice(0, 14);
}
