import Link from "next/link";
import { Compass, Home, Briefcase, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-sand-50">
      <div className="container-page py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
          <Compass size={12} /> 404
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">
          This page took a different flight
        </h1>
        <p className="mx-auto mt-3 max-w-md text-navy-700/70">
          We couldn&rsquo;t find the page you were looking for. It may have moved,
          or the link might be out of date — here are a few good places to
          land instead.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Home size={16} /> Back to homepage
          </Link>
          <Link href="/jobs" className="btn btn-secondary !text-navy-900 !border-navy-900/20 hover:!border-gold-500">
            <Briefcase size={16} /> Browse jobs
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            <Phone size={16} /> Contact us
          </Link>
        </div>

        <p className="mt-10 text-sm text-navy-700/50">
          Or try{" "}
          <Link href="/search" className="font-semibold text-navy-800 underline underline-offset-2 hover:text-gold-600">
            searching the site
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
