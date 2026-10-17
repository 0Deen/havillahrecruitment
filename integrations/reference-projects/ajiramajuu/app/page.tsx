import Navbar from "@/components/Navbar";
import HomeApp from "@/components/app/HomeApp";
import Hero from "@/components/Hero";
import JobCategories from "@/components/JobCategories";
import { GulfShowcase } from "@/components/GulfShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SearchIntentHub from "@/components/SearchIntentHub";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HomeApp />
      <GulfShowcase />
      <Hero />
      <JobCategories />
      <WhyChooseUs />
      <SearchIntentHub />
      <ContactSection />
      <Footer />
    </main>
  );
}
