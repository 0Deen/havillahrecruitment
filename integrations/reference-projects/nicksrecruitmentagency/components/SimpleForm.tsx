"use client";

import { useState } from "react";

export default function SimpleForm({
  title,
  fields,
  submitLabel,
}: {
  title: string;
  fields: { name: string; label: string; type?: string }[];
  submitLabel: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-8 text-center">
        <p className="font-display text-xl font-semibold text-emerald-800">Thank you</p>
        <p className="mt-2 text-sm text-emerald-700">
          We've received your details and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-navy-900/10 bg-white p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <h2 className="font-display text-xl font-semibold text-navy-900">{title}</h2>
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1 block text-sm font-medium text-navy-800" htmlFor={f.name}>
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type ?? "text"}
            required
            className="w-full rounded-lg border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-400"
      >
        {submitLabel}
      </button>
    </form>
  );
}
