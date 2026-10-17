import {
  services,
  countries,
  jobs,
  jobCategories,
  courses,
  siteFaqs,
} from "@/lib/data";
import { resourcePages } from "@/lib/page-content";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  section: string;
};

const staticPages: SearchResult[] = [
  { id: "home", title: "Home", description: "Nicks Recruitment Agency — jobs abroad and local placement.", href: "/", section: "Pages" },
  { id: "about", title: "About Us", description: "Our story, mission, leadership and licenses.", href: "/about", section: "Pages" },
  { id: "jobs", title: "All Jobs", description: "Browse every current job opening.", href: "/jobs", section: "Pages" },
  { id: "job-categories", title: "Job Categories", description: "Browse jobs grouped by trade and category.", href: "/job-categories", section: "Pages" },
  { id: "countries", title: "Countries", description: "Countries we place candidates in.", href: "/countries", section: "Pages" },
  { id: "services", title: "Services", description: "Overview of all recruitment services.", href: "/services", section: "Pages" },
  { id: "training-school", title: "Training School", description: "Pre-departure and trade training courses.", href: "/training-school", section: "Pages" },
  { id: "medical-laboratory", title: "Medical Laboratory", description: "Pre-employment medical screening.", href: "/medical-laboratory", section: "Pages" },
  { id: "book-medical", title: "Book Medical", description: "Book a medical screening appointment.", href: "/book-medical", section: "Pages" },
  { id: "book-training", title: "Book Training", description: "Book a training course slot.", href: "/book-training", section: "Pages" },
  { id: "apply-now", title: "Apply Now", description: "Start your job application.", href: "/apply-now", section: "Pages" },
  { id: "track-application", title: "Track Application", description: "Check the status of your application.", href: "/track-application", section: "Pages" },
  { id: "success-stories", title: "Success Stories", description: "Real placements and candidate outcomes.", href: "/success-stories", section: "Pages" },
  { id: "testimonials", title: "Testimonials", description: "What candidates and employers say.", href: "/testimonials", section: "Pages" },
  { id: "blog", title: "Blog", description: "Guides and articles for candidates.", href: "/blog", section: "Pages" },
  { id: "faqs", title: "FAQs", description: "Frequently asked questions.", href: "/faqs", section: "Pages" },
  { id: "contact", title: "Contact", description: "Reach our office, phone and WhatsApp.", href: "/contact", section: "Pages" },
  { id: "employers", title: "For Employers", description: "Hire workers through Nicks Recruitment Agency.", href: "/employers/hire-workers", section: "Pages" },
  { id: "resources", title: "Resources & Guides", description: "Guides on visas, contracts, life abroad and more.", href: "/resources", section: "Pages" },
  { id: "terms-of-service", title: "Terms of Service", description: "The terms that govern use of this website.", href: "/terms-of-service", section: "Pages" },
  { id: "cookie-policy", title: "Cookie Policy", description: "How we use cookies on this website.", href: "/cookie-policy", section: "Pages" },
  { id: "accessibility-statement", title: "Accessibility Statement", description: "Our accessibility commitment.", href: "/accessibility-statement", section: "Pages" },
  { id: "security", title: "Security & Trust", description: "How we protect candidate and employer data.", href: "/security", section: "Pages" },
];

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [...staticPages];

  for (const s of services) {
    results.push({
      id: `service-${s.slug}`,
      title: s.name,
      description: s.summary,
      href: `/services/${s.slug}`,
      section: "Services",
    });
  }

  for (const c of countries) {
    results.push({
      id: `country-${c.slug}`,
      title: `Jobs in ${c.name}`,
      description: c.tagline,
      href: `/countries/${c.slug}`,
      section: "Countries",
    });
  }

  for (const jc of jobCategories) {
    results.push({
      id: `category-${jc.slug}`,
      title: jc.name,
      description: `Browse ${jc.name} job openings.`,
      href: `/job-categories/${jc.slug}`,
      section: "Job categories",
    });
  }

  for (const j of jobs) {
    results.push({
      id: `job-${j.id}`,
      title: j.title,
      description: `${j.country} · ${j.salary}${j.urgent ? " · Urgent hiring" : ""}`,
      href: `/jobs/${j.id}`,
      section: "Jobs",
    });
  }

  for (const c of courses) {
    results.push({
      id: `course-${c.slug}`,
      title: c.name,
      description: `${c.duration} · ${c.certification}`,
      href: `/training-school/courses`,
      section: "Training",
    });
  }

  for (const r of resourcePages) {
    results.push({
      id: `resource-${r.slug}`,
      title: r.title,
      description: r.intro,
      href: `/resources/${r.slug}`,
      section: "Resources",
    });
  }

  for (const f of siteFaqs) {
    results.push({
      id: `faq-${f.q}`,
      title: f.q,
      description: f.a,
      href: `/faqs`,
      section: "FAQs",
    });
  }

  return results;
}

export const searchIndex = buildIndex();

export function search(query: string, limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = searchIndex
    .map((item) => {
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      let score = 0;
      if (title === q) score += 10;
      if (title.startsWith(q)) score += 6;
      if (title.includes(q)) score += 4;
      if (desc.includes(q)) score += 1;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);

  return scored;
}
