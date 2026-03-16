import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoServices } from "@/components/bento-services";
import { Testimonials } from "@/components/testimonials";
import { RoiCalculator } from "@/components/roi-calculator";
import { ConversationalForm } from "@/components/conversational-form";
import { CeoFooter } from "@/components/ceo-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-dark selection:bg-teal/30">
      <Navbar />
      <Hero />
      <BentoServices />
      <Testimonials />
      <RoiCalculator />
      <ConversationalForm />
      <CeoFooter />
    </main>
  );
}
