import type { Metadata } from "next";
import AssistantApp from "./AssistantApp";

export const metadata: Metadata = {
  title: "AI Recruitment Assistant",
  description:
    "Ask the Ajira Majuu AI assistant about current jobs, destinations, documents and how to apply. Answers come from Ajira Majuu's verified records, with a human team one tap away.",
  alternates: { canonical: "/assistant" },
};

export default function AssistantPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q.slice(0, 200) : undefined;
  return <AssistantApp initialQuery={q} />;
}
