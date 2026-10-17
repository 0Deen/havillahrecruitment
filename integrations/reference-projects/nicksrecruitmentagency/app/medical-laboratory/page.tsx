import Link from "next/link";
import { medicalPages } from "@/lib/page-content";
import MedicalLabPreview from "@/components/MedicalLabPreview";

export default function MedicalLabIndex() {
  return (
    <div>
      <MedicalLabPreview />
      <div className="container-page py-16">
        <h2 className="font-display text-2xl font-semibold text-navy-900">More on the lab</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {medicalPages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/medical-laboratory/${p.slug}`}
                className="rounded-full border border-navy-900/15 px-4 py-2 text-sm font-medium text-navy-800 hover:border-gold-500"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
