"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Does MK Connection Limited charge job seekers a fee?", a: "Any legitimate fees will be clearly explained in writing before you pay anything. If someone asks for informal payment, treat it as a warning sign and contact us directly." },
  { q: "How long does the recruitment process take?", a: "Timelines vary by role and destination. Your dashboard timeline will show exactly where your application stands at each stage." },
  { q: "What documents will I need?", a: "Typically a CV, a valid passport, and relevant certificates. Specific requirements are listed on each job's detail page." },
  { q: "Can I apply without creating an account?", a: "Yes. Use the quick application on the homepage — you can create a full account afterward to track your application." },
  { q: "How do I know a job listing is genuine?", a: "Verified listings display a verification badge. You can also check a job's reference number on the Safety page." },
  { q: "How can employers request candidates?", a: "Visit the For Employers page and submit a recruitment request, or contact our team directly." },
];

export default function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-content py-14 md:py-20">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Frequently asked questions</h1>
      <div className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-display text-base text-ink">{f.q}</span>
              <ChevronDown size={18} className={`shrink-0 text-slate transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="pb-5 text-sm text-slate">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
