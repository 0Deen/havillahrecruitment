"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Wallet, Home, UtensilsCrossed, BadgeCheck } from "lucide-react";
import { jobs } from "@/lib/data";

export default function LatestJobs() {
  return (
    <section className="bg-sand-100 py-20">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">Open roles</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Latest jobs</h2>
          </div>
          <Link href="/jobs" className="hidden text-sm font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4 sm:block">
            View all jobs
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6"
            >
              {job.urgent && (
                <span className="mb-3 w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Urgent Hiring
                </span>
              )}
              <p className="font-display text-lg font-semibold text-navy-900">{job.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-700/70">
                <MapPin size={14} /> {job.country} · {job.category}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                <Wallet size={14} /> {job.salary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-navy-700/70">
                {job.accommodation && <span className="flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1"><Home size={12} /> Accommodation</span>}
                {job.food && <span className="flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1"><UtensilsCrossed size={12} /> Food</span>}
                {job.visaIncluded && <span className="flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1"><BadgeCheck size={12} /> Visa Included</span>}
              </div>
              <p className="mt-3 text-xs text-navy-700/50">Experience: {job.experience}</p>
              <Link
                href={`/jobs/${job.id}`}
                className="mt-5 rounded-full bg-navy-900 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                Apply
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
