"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Droplet,
  TestTube,
  Microscope,
  ScanLine,
  Eye,
  Ear,
  Stethoscope,
  HeartPulse,
  Activity,
  Smile,
  Syringe,
  Baby,
  Info,
  Search,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// /book-medical — the full booking flow, ported 1:1 from the homepage
// MedicalLabPreview component so both places feel like the same product.
// Difference from the homepage widget: this is the actual booking
// destination, so every field (test, date, time, name, phone) is captured
// here and posted straight to /api/apply with formType: "medical".
// ---------------------------------------------------------------------------

const categories = ["All", "Lab Tests", "Imaging", "Vitals", "Screening"] as const;

const tests = [
  { icon: Droplet, label: "Blood Tests", category: "Lab Tests" },
  { icon: TestTube, label: "Urine Tests", category: "Lab Tests" },
  { icon: Microscope, label: "Stool & Parasite Test", category: "Lab Tests" },
  { icon: ScanLine, label: "Chest X-Ray", category: "Imaging" },
  { icon: Eye, label: "Vision Test", category: "Vitals" },
  { icon: Ear, label: "Hearing Test", category: "Vitals" },
  { icon: Stethoscope, label: "Physical Exam", category: "Vitals" },
  { icon: HeartPulse, label: "ECG / Cardiac Screening", category: "Vitals" },
  { icon: Activity, label: "Blood Pressure & Vitals", category: "Vitals" },
  { icon: Smile, label: "Dental Check", category: "Screening" },
  { icon: Syringe, label: "Infectious Disease Screening", category: "Screening" },
  { icon: Baby, label: "Pregnancy Test", category: "Screening" },
] as const;

const stats = [
  { value: "12", label: "Tests on-site" },
  { value: "24–48h", label: "Results turnaround" },
  { value: "300+", label: "Employers accept results" },
  { value: "0", label: "Referrals needed" },
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:15 AM",
  "11:00 AM",
  "01:00 PM",
  "02:15 PM",
  "02:30 PM",
  "04:30 PM",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function BookMedicalPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        dow: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
        iso: d.toISOString().slice(0, 10),
      };
    });
  }, []);

  const filteredTests = tests.filter(
    (t) =>
      (activeCategory === "All" || t.category === activeCategory) &&
      t.label.toLowerCase().includes(query.toLowerCase())
  );

  const missingFields =
    !selectedTest || !selectedTime || !fullName.trim() || !phone.trim();

  async function handleSubmit() {
    if (missingFields) {
      setErrorMessage("Please choose a test, a date/time, and fill in your name and phone.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "medical",
          fullName,
          phone,
          email: email || undefined,
          testType: selectedTest,
          date: `${days[selectedDay].dow} ${days[selectedDay].month} ${days[selectedDay].date}`,
          time: selectedTime,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong sending your booking.");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-emerald-700 py-24 text-white">
        <div className="container-page max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold">Booking confirmed</h1>
          <p className="mt-3 text-emerald-50/90">
            Thanks, {fullName.split(" ")[0]}. We've sent your {selectedTest} booking for{" "}
            {days[selectedDay].dow} {days[selectedDay].month} {days[selectedDay].date} at{" "}
            {selectedTime} to our team. We'll reach you on {phone} to confirm.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-emerald-700 py-20 text-white sm:py-28">
      <div className="container-page">
        {/* --- header --- */}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
          Medical Laboratory
        </p>
        <h1 className="mt-2 max-w-xl font-display text-3xl font-semibold md:text-4xl">
          Book your pre-employment medical screening
        </h1>
        <p className="mt-3 flex max-w-xl items-start gap-2 text-sm text-emerald-50/90">
          <Info size={16} className="mt-0.5 shrink-0" />
          Our laboratory performs pre-employment medical screening only — it is not a treatment
          facility or hospital.
        </p>

        {/* --- stat row --- */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 px-4 py-4 backdrop-blur sm:px-5 sm:py-5"
            >
              <p className="font-display text-xl font-semibold sm:text-2xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-emerald-50/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- search + category tabs --- */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-50/50"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by test..."
              className="w-full rounded-full bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-emerald-50/50 outline-none ring-1 ring-white/10 backdrop-blur focus:ring-white/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? "bg-white text-emerald-700"
                    : "bg-white/10 text-emerald-50/80 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- test grid, now selectable — pick the test you're booking --- */}
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-emerald-50/60">
          Choose a test
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filteredTests.map((t, i) => {
              const isSelected = selectedTest === t.label;
              return (
                <motion.button
                  key={t.label}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => setSelectedTest(t.label)}
                  className={`flex flex-col items-center gap-2 rounded-xl p-5 text-center backdrop-blur transition ${
                    isSelected
                      ? "bg-white text-emerald-700 shadow-lg"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <t.icon size={22} strokeWidth={1.8} />
                  <span className="text-xs font-medium leading-tight">{t.label}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
          {filteredTests.length === 0 && (
            <p className="col-span-full text-sm text-emerald-50/70">
              No tests match &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>

        {/* --- booking widget --- */}
        <div className="mt-14 grid gap-0 overflow-hidden rounded-3xl bg-white text-navy-900 shadow-2xl lg:grid-cols-5">
          {/* illustration panel */}
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-emerald-800 via-emerald-900 to-navy-900 p-8 text-white lg:col-span-2">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck size={24} />
              </span>
              <p className="mt-5 font-display text-xl font-semibold leading-snug">
                One visit. Every test. Results your employer already trusts.
              </p>
            </div>
            <div className="mt-8 space-y-3 text-sm text-emerald-50/80">
              <p className="flex items-center gap-2">
                <Clock size={15} className="shrink-0" /> Fasting required — 8 hours before your visit
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={15} className="shrink-0" /> Bring your ID and 2 passport photos
              </p>
              <p className="flex items-center gap-2">
                <Info size={15} className="shrink-0" /> Results shared with you and your employer file
              </p>
            </div>
          </div>

          {/* date + time + contact details */}
          <div className="p-6 lg:col-span-3 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/60">
              Choose a date
            </p>
            <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
              {days.map((d, i) => (
                <button
                  key={`${d.dow}-${d.date}`}
                  type="button"
                  onClick={() => {
                    setSelectedDay(i);
                    setSelectedTime(null);
                  }}
                  className={`flex flex-col items-center rounded-xl py-2.5 text-xs font-medium transition ${
                    selectedDay === i
                      ? "bg-emerald-700 text-white"
                      : "bg-sand-50 text-navy-700/70 hover:bg-navy-900/10"
                  }`}
                >
                  <span>{d.dow}</span>
                  <span className="mt-1 text-sm font-bold">{d.date}</span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-navy-700/60">
              Choose a time
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`rounded-lg border py-2 text-xs font-medium transition ${
                    selectedTime === t
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-navy-900/10 bg-white text-navy-700/70 hover:border-emerald-700/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* --- contact details --- */}
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-navy-700/60">
              Your details
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="rounded-xl border border-navy-900/10 bg-sand-50 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-emerald-700/50"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="rounded-xl border border-navy-900/10 bg-sand-50 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-emerald-700/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="rounded-xl border border-navy-900/10 bg-sand-50 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-emerald-700/50 sm:col-span-2"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know? (optional)"
                rows={2}
                className="rounded-xl border border-navy-900/10 bg-sand-50 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-emerald-700/50 sm:col-span-2"
              />
            </div>

            {status === "error" && errorMessage && (
              <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle size={15} className="shrink-0" /> {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "submitting"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending your booking...
                </>
              ) : selectedTest && selectedTime ? (
                `Book ${selectedTest} — ${days[selectedDay].dow} ${days[selectedDay].date}, ${selectedTime}`
              ) : (
                "Choose a test, date and time to book"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
