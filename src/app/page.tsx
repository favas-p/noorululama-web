import AboutSection from "@/components/sectons/AboutSection";
import CTASection from "@/components/sectons/CTASection";
import HeroSection from "@/components/sectons/HeroSection";
import StatsSection from "@/components/sectons/StatsSection";
import TestimonialsSection from "@/components/sectons/TestimonialsSection";

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection/>
      <AboutSection/>
      <StatsSection/>
      <TestimonialsSection/>
      <CTASection/>
      
      
    </main>
  );
}
