"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShieldCheck,
  GraduationCap,
  FlaskConical,
  PlaneLanding,
  FileCheck2,
  Handshake,
  Eye,
  BadgeDollarSign,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Each point is a "checkpoint" in the file's journey — the numbering is real,
// not decorative: it mirrors the order a candidate's file actually moves
// through, from licensing to zero hidden fees at the end.
// ---------------------------------------------------------------------------
const checkpoints = [
  {
    icon: ShieldCheck,
    stat: "8/8",
    statLabel: "checkpoints passed",
    title: "Fully licensed, government-audited operations",
    body: "Government-licensed and audited recruitment operations.",
    detail:
      "We operate under full government licensing, independently audited on a recurring basis — not once at launch and forgotten. Every file passes 8 out of 8 compliance checkpoints before it reaches an employer: background verification, contract legality review, fee-disclosure audits, medical and legal clearance, and employer legitimacy screening — all completed and logged before you're ever asked to commit to anything. Unlicensed agents can promise you anything because no one is checking their work. We can't, because everyone is.",
  },
  {
    icon: GraduationCap,
    stat: "12+",
    statLabel: "certified instructors",
    title: "An in-house training school, not a middleman",
    body: "In-house training school with certified instructors.",
    detail:
      "We don't outsource your preparation to a random training center that takes a cut and disappears. Candidates train under 12+ certified, in-house instructors who specialize in exactly what employers abroad are hiring for — technical trades, hospitality standards, healthcare protocols, safety certifications, and workplace language requirements. You walk into your new job already certified and already confident, which is exactly why employers keep coming back to us for talent.",
  },
  {
    icon: FlaskConical,
    stat: "On-site",
    statLabel: "medical laboratory",
    title: "On-site medical screening facility",
    body: "On-site pre-employment medical screening.",
    detail:
      "Health screening is one of the biggest bottlenecks — and scam points — in overseas recruitment. Candidates are often sent to unregulated clinics, overcharged, or handed fraudulent results that get rejected at the destination. We built our own licensed, on-site medical laboratory. Pre-employment screening happens under one roof, under our supervision, using internationally recognized standards — so your results are accepted the first time, with no shortcuts and no surprise costs.",
  },
  {
    icon: PlaneLanding,
    stat: "24/7",
    statLabel: "departure to arrival",
    title: "Airport assistance, departure to arrival",
    body: "Accompanied departure and arrival, every time.",
    detail:
      "The moment you leave home and the moment you land abroad are the two most vulnerable points in the entire process — historically, the two points where agencies that already got paid disappear. We stay with you. Our team provides accompanied departure and arrival assistance, 24 hours a day, including document checks, immigration coordination, and direct contact with your employer's receiving team. You are never navigating an unfamiliar airport alone with a stack of unfamiliar paperwork.",
  },
  {
    icon: FileCheck2,
    stat: "Step-by-step",
    statLabel: "zero guesswork",
    title: "Transparent, document-by-document visa guidance",
    body: "Transparent, document-by-document visa support.",
    detail:
      "Visa processing is where most delays, rejections, and \"processing fee\" scams happen. We break the entire visa journey into a documented, step-by-step process — you know exactly which document is needed, why it's needed, what stage it's at, and what happens next. No vague timelines, and no \"it's in process\" with no explanation for six weeks.",
  },
  {
    icon: Handshake,
    stat: "300+",
    statLabel: "verified employers",
    title: "300+ verified employer partnerships across the Gulf",
    body: "300+ verified employer relationships across the Gulf.",
    detail:
      "We work directly with 300+ verified employers across the Gulf — audited companies with confirmed licenses, verified payroll practices, and a track record of fair treatment. We do not sub-contract your placement to unknown third-party brokers who add their own hidden margins and dilute accountability. When you're placed through us, your employer relationship traces back to a company we've personally vetted, not a chain of anonymous intermediaries.",
  },
  {
    icon: Eye,
    stat: "Live",
    statLabel: "file tracking",
    title: "Live file tracking, fully visible to you",
    body: "Every stage of your file is visible to you.",
    detail:
      "You should never have to wonder where your file is. Every candidate gets live file tracking, showing the real-time status of your application — interview stage, document verification, medical clearance, visa processing, and deployment scheduling — visible to you, updated as it happens. No black box, and no relying on someone picking up the phone to tell you what's going on with your own future.",
  },
  {
    icon: BadgeDollarSign,
    stat: "0",
    statLabel: "hidden charges",
    title: "Zero hidden fees, everything in writing",
    body: "All costs disclosed in writing before you commit.",
    detail:
      "This is the promise every overseas job seeker has heard before and been burned by, so we do it differently: every cost is disclosed in writing, before you sign anything. No surprise \"processing charges\" halfway through, no last-minute \"urgent fee\" to release your visa, no unexplained deductions from your first paycheck. If it isn't in writing beforehand, you will never be asked to pay it.",
  },
];

const ledger = [
  { value: "300+", label: "Verified employers" },
  { value: "12+", label: "In-house instructors" },
  { value: "8/8", label: "Checkpoints per file" },
  { value: "0", label: "Hidden fees" },
  { value: "24/7", label: "Airport support" },
  { value: "100%", label: "Licensed operations" },
];

export default function WhyChooseUs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-page">
        {/* --- header --- */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Why candidates and employers choose us
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
            Built for trust, not just placement
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-700/80">
            Overseas recruitment has an image problem, and we know exactly why. For decades the
            industry has been shadowed by fixers, unlicensed agents, hidden fees, and candidates
            who found out too late their &ldquo;job offer&rdquo; was never real. We didn&rsquo;t
            build this agency to survive in that system. We built it to replace it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80">
            Every stage of your journey is licensed, documented, audited, and visible to you. Not
            promised, not implied —{" "}
            <span className="font-semibold text-navy-900">visible.</span> This isn&rsquo;t a
            placement service. It&rsquo;s an accountability system with a job at the end of it.
          </p>
        </div>

        {/* --- verification ledger strip --- */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-3 lg:grid-cols-6">
          {ledger.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-start bg-navy-900 px-5 py-6"
            >
              <span className="font-display text-2xl font-semibold text-gold-400 sm:text-3xl">
                {item.value}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* --- checkpoint accordion grid --- */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {checkpoints.map((c, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
                className={`group rounded-2xl border bg-white p-6 transition-all duration-300 ${
                  isOpen
                    ? "border-navy-900/30 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]"
                    : "border-navy-900/10 hover:border-navy-900/25 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.25)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                      <c.icon size={22} strokeWidth={1.8} />
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-navy-900">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy-700">
                        {c.stat} <span className="text-navy-400">·</span> {c.statLabel}
                      </p>
                      <p className="mt-2 font-display text-base font-semibold leading-snug text-navy-900 sm:text-lg">
                        {c.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-navy-700/70">{c.body}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`mt-1 shrink-0 text-navy-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-gold-600" : "group-hover:text-navy-600"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-16 mt-4 border-t border-navy-900/10 pt-4">
                        <p className="text-sm leading-relaxed text-navy-700/80">{c.detail}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                          Learn more <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* --- bottom line banner --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 sm:px-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            The bottom line
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">
            Every number on this page isn&rsquo;t a marketing statistic — it&rsquo;s a checkpoint
            you can verify, a document you can request, a process you can watch happen in real
            time.
          </p>
          <p className="mt-5 text-sm font-medium text-white/60">
            Trusted since day one — every candidate is screened, trained, and placed under a
            fully licensed, fully transparent process.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
