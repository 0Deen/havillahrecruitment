import Link from "next/link";
import Icon from "@/components/app/Icon";

const links = [
  { href: "/jobs-in-kenya", label: "Jobs in Kenya", sub: "Ajira & kazi opportunities" },
  { href: "/overseas-jobs", label: "Overseas Jobs", sub: "Work abroad from Kenya" },
  { href: "/gulf-jobs", label: "Gulf Jobs", sub: "Qatar, Kuwait, Saudi & more" },
  { href: "/recruitment-agency-kenya", label: "Recruitment Agency", sub: "Ajira Majuu in Kenya" },
  { href: "/jobs-for-kenyans-abroad", label: "Jobs for Kenyans Abroad", sub: "International opportunities" },
  { href: "/ajira-kazi-kenya", label: "Ajira & Kazi", sub: "Tafuta kazi na ajira" },
  { href: "/job-categories/driver-jobs", label: "Driver Jobs", sub: "Driving opportunities abroad" },
  { href: "/job-categories/caregiver-jobs", label: "Caregiver Jobs", sub: "Care & elderly-care roles" },
  { href: "/job-categories/cleaner-jobs", label: "Cleaner Jobs", sub: "Cleaning & housekeeping roles" },
  { href: "/job-categories/construction-jobs", label: "Construction Jobs", sub: "Skilled Gulf trades" },
];

export default function SearchIntentHub() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-0">
      <div className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.18em] text-brand-purple">Start your search</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink">Looking for ajira, kazi or work abroad?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose the route that matches what you are looking for. These pages connect the search to real jobs, destination information and the application process.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="group rounded-[22px] border border-slate-100 p-4 transition hover:-translate-y-0.5 hover:border-brand-purple/20 hover:bg-brand-purple/[0.03] hover:shadow-md">
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span className="block text-sm font-extrabold text-ink">{link.label}</span>
                  <span className="mt-1 block text-xs text-slate-500">{link.sub}</span>
                </span>
                <Icon name="arrow" className="h-4 w-4 flex-none text-brand-purple transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
