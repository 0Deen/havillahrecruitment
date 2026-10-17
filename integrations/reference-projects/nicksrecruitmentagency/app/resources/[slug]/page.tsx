import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourcePages } from "@/lib/page-content";
import PageTemplate from "@/components/PageTemplate";

export function generateStaticParams() {
  return resourcePages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = resourcePages.find((p) => p.slug === params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
  };
}

export default function ResourceSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = resourcePages.find((p) => p.slug === params.slug);
  if (!page) return notFound();
  return <PageTemplate page={page} />;
}
