import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import WhatsAppCTA from "@/components/sections/WhatsAppCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <WhatsAppCTA />
      <Footer />
    </main>
  );
}
