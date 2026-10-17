import { notFound } from "next/navigation";
import { employerPages } from "@/lib/page-content";
import PageTemplate from "@/components/PageTemplate";

export function generateStaticParams() {
  return employerPages.map((p) => ({ slug: p.slug }));
}

export default function EmployerSlugPage({ params }: { params: { slug: string } }) {
  const page = employerPages.find((p) => p.slug === params.slug);
  if (!page) return notFound();
  return <PageTemplate page={page} />;
}
