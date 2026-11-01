import { createFileRoute } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { ScrollHero } from "@/components/ScrollHero";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Portfolio } from "@/components/Portfolio";
import { About, Process } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "LIWEB Solutions — Website Design & Development Agency",
      },
      {
        name: "description",
        content:
          "LIWEB Solutions designs and develops premium business websites, e-commerce stores, landing pages and redesigns. Transparent packages starting at ₹4,999. Start your project today.",
      },
      { property: "og:title", content: "LIWEB Solutions — Website Design & Development Agency" },
      {
        property: "og:description",
        content:
          "Premium business websites, online stores and landing pages. Transparent packages, honest pricing, real results.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LIWEB Solutions — Website Design & Development Agency" },
      {
        name: "twitter:description",
        content:
          "Premium business websites, online stores and landing pages. Transparent packages, honest pricing, real results.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#073638] text-white">
      <AnimatedBackground />
      <Navbar />
      <main>
        <ScrollHero />
        <div className="relative bg-[#F6F8F5] text-[#0B3032]">
          <Services />
          <div className="border-y border-[#D8E2DF] bg-white">
            <Pricing />
          </div>
          <Portfolio />
        </div>
        <About />
        <div className="relative bg-[#F6F8F5] text-[#0B3032]">
          <Process />
          <div className="border-t border-[#D8E2DF] bg-white">
            <Contact />
          </div>
        </div>
        <FinalCta />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}