"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

/* ---------------------------------------------------------------------
   Apply Now — a friendly, single-screen registration form. Submitting
   posts to /api/apply, which emails the application straight to
   nicksrecruitment0@gmail.com (see app/api/apply/route.ts).
--------------------------------------------------------------------- */

type FieldName = "fullName" | "phone" | "email" | "role";

const fields: { name: FieldName; label: string; type: string; placeholder: string }[] = [
  { name: "fullName", label: "Full name", type: "text", placeholder: "e.g. Jane Wanjiru" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "e.g. 0712 345 678" },
  { name: "email", label: "Email", type: "email", placeholder: "e.g. jane@example.com" },
  { name: "role", label: "Role you're interested in", type: "text", placeholder: "e.g. Housekeeper, Nurse, Driver" },
];

export default function ApplyNowPage() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    fullName: "",
    phone: "",
    email: "",
    role: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  /* --- Success state: a calm confirmation, not just a toast --- */
  if (status === "sent") {
    return (
      <div className="container-page max-w-lg py-24 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 size={28} />
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold text-navy-900">
          Application received
        </h1>
        <p className="mt-3 text-navy-700/70">
          Thanks, {values.fullName.split(" ")[0] || "there"} — we&rsquo;ve got
          your details for <span className="font-medium text-navy-900">{values.role || "your role"}</span>.
          Our team will reach out on {values.phone || "your number"} shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="container-page max-w-lg py-16">
      <span className="inline-flex items-center rounded-full bg-navy-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
        Candidate Registration
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-navy-900">
        Apply Now
      </h1>
      <p className="mt-3 text-navy-700/70">
        Start your registration. No fee is charged for employer-sponsored
        roles.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {fields.map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="mb-1.5 block text-sm font-medium text-navy-800"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              required
              placeholder={placeholder}
              value={values[name]}
              onChange={(e) => handleChange(name, e.target.value)}
              className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-700/40 outline-none transition focus:border-navy-900/40 focus:ring-2 focus:ring-navy-900/10"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending your application…
            </>
          ) : (
            "Submit Application"
          )}
        </button>

        {status === "error" && (
          <p className="text-center text-sm font-medium text-red-600">
            Something went wrong sending your application. Please try again,
            or WhatsApp us on +254 746 030545.
          </p>
        )}

        <p className="flex items-center justify-center gap-2 pt-2 text-xs text-navy-700/50">
          <ShieldCheck size={14} /> Your details go straight to our team and
          are never shared with anyone else.
        </p>
      </form>
    </div>
  );
}
