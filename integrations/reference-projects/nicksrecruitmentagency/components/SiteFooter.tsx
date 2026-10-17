import Link from "next/link";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram, FaXTwitter, FaTiktok } from "react-icons/fa6";
import { SiLinktree } from "react-icons/si";

// NOTE: brand icons (WhatsApp, Telegram, X, TikTok, Linktree) come from the
// `react-icons` package, since lucide-react doesn't ship real brand marks.
// Run `npm install react-icons` if it isn't already in the project.

const columns = [
  {
    title: "Company",
    links: [
      ["About Us", "/about/story"],
      ["Licenses", "/about/licenses"],
      ["Anti-Trafficking Policy", "/about/anti-trafficking-policy"],
      ["Equal Opportunity Policy", "/about/equal-opportunity-policy"],
      ["Privacy Policy", "/privacy-policy"],
      ["Careers at Nicks", "/about/careers"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Overseas Recruitment", "/services/overseas-recruitment"],
      ["Visa Processing", "/services/visa-processing"],
      ["Training School", "/training-school"],
      ["Medical Laboratory", "/medical-laboratory"],
      ["HR Consultancy", "/services/hr-consultancy"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["All Guides", "/resources"],
      ["Blog", "/blog"],
      ["News", "/news"],
      ["FAQs", "/faqs"],
      ["Downloads", "/downloads"],
      ["Career Guidance", "/career-guidance"],
      ["Events", "/events"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms of Service", "/terms-of-service"],
      ["Cookie Policy", "/cookie-policy"],
      ["Accessibility Statement", "/accessibility-statement"],
      ["Security & Trust", "/security"],
      ["Track Application", "/track-application"],
    ],
  },
];

const socials = [
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/254746030545?text=Hello%20Nicks%20Recruitment%20Agency%2C%20I%20would%20like%20to%20know%20more%20about%20your%20job%20opportunities." },
  { icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/nicksrecruitmentagency" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/nicksrecruitmentagency" },
  { icon: FaTelegram, label: "Telegram", href: "https://t.me/nicksrecruitmentagency" },
  { icon: FaXTwitter, label: "X (Twitter)", href: "https://x.com/nicksrecruitmnt" },
  { icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@nicksrecruitmentagency" },
  { icon: SiLinktree, label: "Linktree", href: "https://linktr.ee/nicksrecruitmentAgency" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-sand-200">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold text-white">
            Nicks <span className="text-gold-500">Recruitment</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-sand-200/70">
            Licensed overseas recruitment, training and pre-employment medical
            screening, connecting candidates to verified employers across the Gulf.
          </p>
          <div className="mt-4 space-y-2 text-sm text-sand-200/80">
            <p className="flex items-center gap-2">
              <MapPin size={14} /> Twiga Towers, Murang&apos;a Road, Nairobi, Kenya
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} /> +254 746 030 545
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} /> nicksrecruitment0@gmail.com
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-sand-200/70 transition hover:bg-gold-500 hover:text-navy-900"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-semibold text-white">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-sand-200/70 hover:text-gold-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* --- WhatsApp callout: the warm, "just text us" invitation --- */}
      <div className="border-t border-white/10">
        <div className="container-page py-10">
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                <MessageCircle size={22} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white sm:text-xl">
                  Not sure where to start? Just message us.
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand-200/70">
                  Text us anything be it a question, your CV, or just &ldquo;I want a job abroad&rdquo;
                  and a real person will guide you from there. We&rsquo;ll walk you through
                  registration, teach you what the job needs, and take care of your documents,
                  training, and visa. When it&rsquo;s time to travel, we take you to the airport
                  ourselves, and we&rsquo;re there to receive you on the other side too. Whatever
                  stage you&rsquo;re at, we&rsquo;re here for you.We are located in 
                   Twiga Towers, Murang'a Road, Nairobi, Kenya
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/254746030545?text=Hello%20Nicks%20Recruitment%20Agency%2C%20I%20would%20like%20to%20know%20more%20about%20your%20job%20opportunities."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-emerald-400"
            >
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* --- find us: boxed map embed --- */}
      <div className="border-t border-white/10">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Find us
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-white">
              Visit our Nairobi office
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-sand-200/70">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              Twiga Towers, Murang&apos;a Road, Nairobi, Kenya
            </p>
            <a
              href="https://www.google.com/maps/place/Twiga+Towers/@-1.2808824,36.8185168,17z/data=!3m1!4b1!4m6!3m5!1s0x182f10d4ebab9d2f:0xdbeb6499f1afcd15!8m2!3d-1.2808824,36.8185168!16s%2Fg%2F11c1yjzq0z"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-gold-400 hover:text-gold-300"
            >
              Get directions →
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 lg:col-span-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.821359014063!2d36.81851677585844!3d-1.280882435622075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d4ebab9d2f%3A0xdbeb6499f1afcd15!2sTwiga%20Towers!5e0!3m2!1sen!2ske!4v1785594565983!5m2!1sen!2ske"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Nicks Recruitment Agency location on Google Maps"
              className="h-64 w-full sm:h-80"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-sand-200/50">
        © {new Date().getFullYear()} Nicks Recruitment Agency. Licensed recruitment agency. All rights reserved.
      </div>
    </footer>
  );
}
