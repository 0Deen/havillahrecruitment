import { notFound } from "next/navigation";
import { medicalPages } from "@/lib/page-content";
import PageTemplate from "@/components/PageTemplate";

export function generateStaticParams() {
  return medicalPages.map((p) => ({ slug: p.slug }));
}

export default function MedicalSlugPage({ params }: { params: { slug: string } }) {
  const page = medicalPages.find((p) => p.slug === params.slug);
  if (!page) return notFound();
  return <PageTemplate page={page} />;
}
