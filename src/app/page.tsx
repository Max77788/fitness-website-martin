import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import Classes from "@/components/sections/Classes";
import Mission from "@/components/sections/Mission";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import WhatsAppCTA from "@/components/sections/WhatsAppCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Classes />
      <Mission />
      <Pricing />
      <Testimonials />
      <FAQ />
      <WhatsAppCTA />
      <Footer />
    </main>
  );
}
