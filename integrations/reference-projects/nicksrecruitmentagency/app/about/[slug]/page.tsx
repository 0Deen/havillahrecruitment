import { notFound } from "next/navigation";
import { aboutPages } from "@/lib/page-content";
import PageTemplate from "@/components/PageTemplate";

export function generateStaticParams() {
  return aboutPages.map((p) => ({ slug: p.slug }));
}

export default function AboutSlugPage({ params }: { params: { slug: string } }) {
  const page = aboutPages.find((p) => p.slug === params.slug);
  if (!page) return notFound();
  return <PageTemplate page={page} />;
}
