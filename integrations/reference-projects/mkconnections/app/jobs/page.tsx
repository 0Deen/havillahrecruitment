import { Suspense } from "react";
import { JobsListing } from "@/components/JobsListing";
import { CountrySelector } from "@/components/jobs-by-country/CountrySelector";

export default function JobsPage() {
  return (
    <>
      <CountrySelector />
      <Suspense fallback={<div className="container-content py-20 text-sm text-slate">Loading jobs...</div>}>
        <JobsListing />
      </Suspense>
    </>
  );
}
