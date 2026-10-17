"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
  Loader2,
  CheckCircle2,
} from "lucide-react";

/* ---------------------------------------------------------------------
   Contact Us — replicates the dark, bold reference layout: big heading,
   contact details + socials on the left, a form card on the right, and
   an FAQ block underneath answering the questions Gulf-bound candidates
   actually ask. Posts to /api/apply with formType: "contact".
--------------------------------------------------------------------- */

const reasons = ["Candidate registration", "Employer partnership", "General enquiry"];

const faqs = [
  {
    q: "Do I have to pay a fee to apply?",
    a: "No. For employer-sponsored roles, you don't pay any placement fee — the hiring employer covers it. We'll always tell you clearly if a cost ever applies to something specific, like an optional document.",
  },
  {
    q: "Which countries do you place candidates in?",
    a: "Mainly the Gulf: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. The exact country depends on which employer is hiring for your role.",
  },
  {
    q: "What documents do I need to get started?",
    a: "A valid passport, your CV, and any relevant certificates or references. We'll guide you through medical and visa documents later in the process — you don't need those upfront.",
  },
  {
    q: "How long does the process take, from registration to travel?",
    a: "It varies by role and employer demand, but most candidates move from registration to travel within a few months once matched with an employer, medical clearance, and visa approval are complete.",
  },
  {
    q: "Do I need prior work experience?",
    a: "It depends on the role — some employers want experience, others train on the job. Tell us your background when you register and we'll match you to roles that fit.",
  },
  {
    q: "Who arranges and pays for the flight and visa?",
    a: "For employer-sponsored placements, the employer typically covers the visa and flight. We'll confirm exactly what's covered before you commit to any role.",
  },
  {
    q: "Is training provided before I travel?",
    a: "Yes — depending on the role, we arrange relevant training so you arrive ready for the job. You can check your status any time on the Track Application page.",
  },
  {
    q: "How do I know this is a legitimate agency?",
    a: "We're happy to answer any questions before you commit. You can also verify our registration and speak to our team directly by phone or WhatsApp before sending any documents.",
  },
];

export default function ContactPage() {
  const [reason, setReason] = useState(reasons[0]);
  const [values, setValues] = useState({ fullName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", reason, ...values }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-sand-50">
      {/* --- Dark contact hero, matching the reference layout --- */}
      <div className="bg-navy-950">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-start">
          {/* Left: heading + contact info */}
          <div>
            <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-sm text-sand-200/70">
              Reach our team for candidate registration, employer
              partnerships, or general enquiries. We typically reply within
              an hour.
            </p>

            <div className="mt-10 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sand-200/50">
                Contacts
              </p>
              <a
                href="mailto:nicksrecruitment0@gmail.com"
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-gold-400"
              >
                <Mail size={16} /> nicksrecruitment0@gmail.com
              </a>
              <a
                href="tel:+254746030545"
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-gold-400"
              >
                <Phone size={16} /> +254 746 030545
              </a>
            </div>

            <div className="mt-10 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sand-200/50">
                Follow
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-950"
                  >
                    <Icon size={16} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 size={24} />
                </span>
                <h3 className="font-display text-xl font-semibold text-navy-900">
                  Message sent
                </h3>
                <p className="text-sm text-navy-700/70">
                  Thanks {values.fullName.split(" ")[0] || ""} — we&rsquo;ll get
                  back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-lg font-semibold text-navy-900">
                  Send a message
                </h2>

                <div>
                  <p className="mb-2 text-sm font-medium text-navy-800">
                    How can we help?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                          reason === r
                            ? "border-navy-900 bg-navy-900 text-white"
                            : "border-navy-900/15 text-navy-700 hover:border-navy-900/40"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-800">
                    Full name
                  </label>
                  <input
                    required
                    value={values.fullName}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, fullName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-navy-900/40 focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-800">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-navy-900/40 focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-800">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={values.message}
                    onChange={(e) =>
                      setValues((p) => ({ ...p, message: e.target.value }))
                    }
                    className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-navy-900/40 focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {status === "error" && (
                  <p className="text-center text-sm font-medium text-red-600">
                    Something went wrong. Please try again, or WhatsApp us on
                    +254 746 030545.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* --- FAQ: the questions Gulf-bound candidates actually ask --- */}
      <div className="container-page py-20">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-navy-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-navy-700/70">
          Can&rsquo;t find the answer here? Reach out using the form above.
        </p>

        <div className="mt-8 divide-y divide-navy-900/10 border-t border-navy-900/10">
          {faqs.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-navy-700 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <p className="max-w-2xl pb-5 text-sm leading-relaxed text-navy-700/70">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
