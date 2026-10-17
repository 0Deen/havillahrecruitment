import { JourneySteps } from "@/components/JourneySteps";

export default function HowItWorksPage() {
  return (
    <div className="py-14 md:py-20">
      <div className="container-content">
        <h1 className="font-display text-3xl text-ink md:text-4xl">How MK Connection Limited works</h1>
        <p className="mt-3 max-w-lg text-sm text-slate">
          From your first search to your first day at work, here's the full recruitment journey.
        </p>
      </div>
      <JourneySteps />
    </div>
  );
}
