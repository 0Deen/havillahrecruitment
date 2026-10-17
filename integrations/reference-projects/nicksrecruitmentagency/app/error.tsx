"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Phone } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center bg-sand-50">
      <div className="container-page py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
          <AlertTriangle size={12} /> Something went wrong
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">
          That didn&rsquo;t load properly
        </h1>
        <p className="mx-auto mt-3 max-w-md text-navy-700/70">
          An unexpected error occurred on our end. Nothing you did caused
          this — try again, or head back to the homepage. If it keeps
          happening, let us know.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-primary">
            <RotateCcw size={16} /> Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            <Home size={16} /> Homepage
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            <Phone size={16} /> Contact support
          </Link>
        </div>

        {error?.digest && (
          <p className="mt-8 text-xs text-navy-700/40">Error reference: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
