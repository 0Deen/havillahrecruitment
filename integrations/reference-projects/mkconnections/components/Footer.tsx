"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site-config";
import { footerNav, footerSocials } from "@/lib/footer-config";

function FooterNewsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Could not subscribe right now.");
    }
  }

  if (status === "success") {
    return <p role="status" className="text-sm text-amber">You're subscribed — new opportunities will find you.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder")}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-amber px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-amber-deep disabled:opacity-60"
        >
          {status === "loading" ? "…" : t("newsletter.cta")}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-xs text-amber">{errorMsg}</p>
      )}
    </form>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label={title}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-1 text-sm font-semibold text-white md:pointer-events-none md:pb-0"
      >
        {title}
        <ChevronDown size={16} className={`text-white/50 transition-transform md:hidden ${open ? "rotate-180" : ""}`} />
      </button>
      <ul className={`mt-3 space-y-2 text-sm text-white/60 md:block ${open ? "block" : "hidden"}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors duration-150 hover:text-amber">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="container-content grid grid-cols-1 gap-10 py-16 md:grid-cols-5 md:gap-8">
        {/* Column 1 — Brand */}
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Image src="/mk/logo-white.jpeg" alt="MK Connection Limited" width={36} height={36} className="rounded-xl" />
            <span className="font-display text-lg">MK Connection Limited</span>
          </div>
          <p className="mb-6 max-w-xs text-sm text-white/60">
            MK Connection Limited connects Kenyan job seekers with legitimate, screened employment opportunities
            across the Gulf, with a real recruitment team behind every application.
          </p>

          <div className="space-y-2.5 text-sm text-white/70">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-150 hover:text-amber"
            >
              <Phone size={15} className="text-amber" /> {siteConfig.whatsapp}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 transition-colors duration-150 hover:text-amber">
              <Mail size={15} className="text-amber" /> {siteConfig.email}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 transition-colors duration-150 hover:text-amber"
            >
              <MapPin size={15} className="mt-0.5 shrink-0 text-amber" />
              <span>{siteConfig.address} — Get directions</span>
            </a>
            <p className="pl-6 text-xs text-white/40">Mon–Fri, 8:00 AM–5:00 PM (EAT)</p>
          </div>

          <div className="mt-6 h-[120px] w-[200px] overflow-hidden rounded-lg border border-[#3F3E45]">
            <iframe
              title="MK Connection Limited office location"
              src={siteConfig.mapEmbed}
              width="200"
              height="120"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>

          <div className="mt-6 max-w-xs">
            <p className="mb-2 text-sm text-white/70">Get new opportunities sent straight to you.</p>
            <FooterNewsletter />
          </div>
        </div>

        <FooterColumn title={t("footer.jobseekers")} links={footerNav.explore} />
        <FooterColumn title={t("footer.resources")} links={footerNav.resources} />
        <FooterColumn title={t("footer.employers")} links={[{ label: "Hire Talent", href: "/for-employers" }, { label: "Bulk Recruitment", href: "/for-employers" }]} />
      </div>

      {/* Trust & safety line */}
      <div className="border-t border-white/10 py-5">
        <p className="container-content text-xs text-white/40">
          MK Connection Limited never asks candidates to pay individual staff members directly. Official
          communication only comes through the channels listed above.{" "}
          <Link href="/safety#report" className="text-white/60 underline decoration-white/20 underline-offset-2 hover:text-amber">
            Report suspicious activity
          </Link>
          .
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-content flex flex-col items-center justify-between gap-4 text-xs text-white/40 md:flex-row">
          <span>© {year} MK Connection Limited. {t("footer.rights")}</span>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors duration-150 hover:text-amber">
                {l.label}
              </Link>
            ))}
          </div>

          {footerSocials.length > 0 && (
            <div className="flex items-center gap-4">
              {footerSocials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MK Connection Limited on ${s.label}`}
                  className="text-white/50 transition hover:scale-110 hover:text-amber"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
