import AboutSection from "@/components/sectons/AboutSection";
import HeroSection from "@/components/sectons/HeroSection";
import StatsSection from "@/components/sectons/StatsSection";
import { AnimatedTestimonialGrid } from "@/components/ui/testimonial-2";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Noorul Ulama - Islamic Excellence & Education",
  description: "Welcome to Noorul Ulama Students Association at Jamia Nooriyya Arabiyya Pattikkad. Join us in our journey of Islamic education, cultural preservation, and community service.",
};

// Our esteemed teachers and scholars
const testimonials = [
  { imgSrc: '/usd-img/ali-kutty-usthad.webp', alt: 'Ali Kutty Usthad' },
  { imgSrc: '/usd-img/bappu-usthad.webp', alt: 'Bappu Usthad' },
  { imgSrc: '/usd-img/haithami-usthad.webp', alt: 'Haithami Usthad' },
  { imgSrc: '/usd-img/kottumala-usthad.webp', alt: 'Kottumala Usthad' },
  { imgSrc: '/usd-img/ot-usthad.webp', alt: 'OT Usthad' },
  { imgSrc: '/usd-img/ziyaudheen-usthad.webp', alt: 'Ziyaudheen Usthad' },
  { imgSrc: '/usd-img/alavi-usthad.webp', alt: 'Alavi Usthad' },
  { imgSrc: '/usd-img/amanath-usthad.webp', alt: 'Amanath Usthad' },
  { imgSrc: '/usd-img/kuttassery.webp', alt: 'Kuttassery Usthad' },
  { imgSrc: '/usd-img/koomanna-usthad.webp', alt: 'Koomanna Usthad' },
  { imgSrc: '/usd-img/mudikkod-usthad.webp', alt: 'Mudikkod Usthad' },
  { imgSrc: '/usd-img/olavattoor-usthad.webp', alt: 'Olavattoor Usthad' },
  { imgSrc: '/usd-img/salman-usthad.webp', alt: 'Salman Usthad' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection/>
      <AboutSection/>
      <StatsSection/>
      <AnimatedTestimonialGrid
        testimonials={testimonials}
        badgeText="Our Esteemed Teachers"
        title={
          <>
            Guided by renowned
            <br className="hidden sm:block" />
          
            scholars and educators
          </>
        }
        description="Learn from distinguished Islamic scholars who have dedicated their lives to knowledge and education at Jamia Nooriyya Arabiyya."
        ctaText="Meet Our Faculty"
        ctaHref="https://jamianooriya.in/faculties/"
        className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30 dark:from-gray-950 dark:to-emerald-950/10 overflow-visible"
      />
    </main>
  );
}
