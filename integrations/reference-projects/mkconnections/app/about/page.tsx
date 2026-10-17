import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const principles = [
  { title: "Clarity", text: "Clients are guided with accurate information and step by step support throughout every process." },
  { title: "Opportunity", text: "The agency links candidates with credible employers offering stable income, safe environments and long term potential." },
  { title: "Integrity", text: "All services are delivered with ethical practice, genuine communication and strict respect for compliance and legal standards." },
];

const services = [
  "Visa processing support",
  "Document verification and guidance",
  "Interview preparation and coaching",
  "Matching candidates to trusted international employers",
  "Continuous communication until arrival at the destination country",
  "Support for both individual applicants and corporate recruitment needs",
];

const industries: { title: string; roles: string[] }[] = [
  { title: "Domestic and household roles", roles: ["Housemaids", "Nannies", "Babysitters", "Caregivers", "Cooks", "Cleaners", "Gardeners", "Private drivers", "House managers"] },
  { title: "Transport related roles", roles: ["Company drivers", "Heavy truck drivers", "Delivery drivers", "School bus operators"] },
  { title: "Construction and skilled labour", roles: ["Masons", "Carpenters", "Plumbers", "Electricians", "Welders", "Painters", "General labourers", "Machine operators"] },
  { title: "Hospitality and hotel work", roles: ["Waiters", "Baristas", "Housekeepers", "Room attendants", "Chefs", "Restaurant support staff"] },
  { title: "Security services", roles: ["Security guards", "Lifeguards", "CCTV control staff"] },
  { title: "Retail and customer service", roles: ["Sales personnel", "Cashiers", "Store attendants", "Merchandising assistants"] },
  { title: "Medical and care work", roles: ["Nurses", "Nursing assistants", "Medical aides", "Hospital cleaners"] },
  { title: "Office and administrative roles", roles: ["Administrative assistants", "IT support", "Account clerks", "Customer care staff"] },
  { title: "Farm and agricultural work", roles: ["Crop farm workers", "Livestock handlers", "Fruit pickers", "Greenhouse workers"] },
  { title: "Factory and warehouse jobs", roles: ["Machine operators", "Packaging staff", "Sorters", "Production assistants"] },
];

const stands = [
  "Registered and trusted agency",
  "Lifetime commitment to ethical recruitment",
  "Direct access to verified international employers",
  "Fast and reliable communication",
  "Guidance rooted in experience and accuracy",
  "A caring approach that treats every applicant as a person, not a file number",
];

export default function AboutPage() {
  return (
    <div className="container-content py-14 md:py-20">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-deep">Who we are</p>
      <h1 className="mt-3 max-w-2xl font-display text-3xl text-ink md:text-5xl">
        Guided by integrity, built on purpose.
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate">
        MK Connection Limited is a global talent gateway built on trust, clarity, professionalism and genuine
        opportunity. The agency connects hardworking individuals with reliable employers across the Middle East, Europe,
        Asia and North America. Every client is guided with care, accuracy and transparency from the first inquiry to
        successful deployment.  MK Connection exists to uplift families, open international doors and support career growth for
        people seeking honest and life changing work abroad.
      </p>

      <h2 className="mt-14 font-display text-2xl text-ink">What  MK Connection represents</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {principles.map((p) => (
          <Card key={p.title} title={p.title} text={p.text} />
        ))}
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-[#FDECEC] p-7">
          <h2 className="font-display text-xl text-ink">Our mission</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            To empower people with reliable global opportunities that elevate their future and transform their families.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-[#EAF0FB] p-7">
          <h2 className="font-display text-xl text-ink">Our vision</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            To become Africa&apos;s most dependable bridge to overseas employment by offering transparent processes,
            trustworthy networks and top tier client care.
          </p>
        </div>
      </div>

      <h2 className="mt-14 font-display text-2xl text-ink">What  MK Connection does</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate">
        Complete overseas employment facilitation for skilled, semi skilled and professional workers.
      </p>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {services.map((s) => (
          <li key={s} className="rounded-2xl border border-line bg-white px-5 py-4 text-sm text-ink">✈️ {s}</li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-2xl text-ink">Industries served</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate">
         MK Connection collaborates with international sectors where demand for genuine labour is consistently high.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => (
          <div key={ind.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <h3 className="font-display text-lg text-ink">{ind.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {ind.roles.map((r) => (
                <span key={r} className="rounded-full bg-sand px-3 py-1 text-xs text-slate">{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl text-ink">Why  MK Connection stands out</h2>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {stands.map((s) => (
          <li key={s} className="rounded-2xl border border-line bg-[#FFF4DC] px-5 py-4 text-sm text-ink">⭐ {s}</li>
        ))}
      </ul>

      <div className="mt-14 rounded-3xl border border-line bg-sand/50 p-8">
        <h2 className="font-display text-xl text-ink">Our commitment</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
           MK Connection exists to serve, support and uplift. Every candidate is treated with respect and guided as if they were a
          member of the family. The agency does not take shortcuts and does not compromise the wellbeing or dignity of any
          applicant.
        </p>
        <p className="mt-5 font-display text-lg text-ink">Begin your journey. Your new chapter begins with a single step.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition hover:bg-amber-deep">
            Chat with {siteConfig.contactPerson} on WhatsApp
          </a>
          <Link href="/gallery" className="rounded-full border border-ink/30 px-6 py-3 text-sm text-ink transition hover:border-amber">
            See our gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{text}</p>
    </div>
  );
}
