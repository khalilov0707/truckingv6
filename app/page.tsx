import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import PartnersSection from "@/components/partners-section"
import FleetSection from "@/components/fleet-section"
import TestimonialsSection from "@/components/testimonials-section"
import QuoteForm from "@/components/quote-form"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PartnersSection />
      <FleetSection />
      <TestimonialsSection />
      <QuoteForm />
    </main>
  )
}

