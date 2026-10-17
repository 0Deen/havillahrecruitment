import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import CountriesSection from "@/components/CountriesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessTimeline from "@/components/ProcessTimeline";
import LatestJobs from "@/components/LatestJobs";
import TrainingPreview from "@/components/TrainingPreview";
import MedicalLabPreview from "@/components/MedicalLabPreview";
import SuccessNewsPartners from "@/components/SuccessNewsPartners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CountriesSection />
      <IndustriesSection />
      <WhyChooseUs />
      <ProcessTimeline />
      <LatestJobs />
      <TrainingPreview />
      <MedicalLabPreview />
      <SuccessNewsPartners />
    </>
  );
}
