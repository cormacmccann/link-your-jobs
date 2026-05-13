import { useState } from "react";
import "@/styles/portfolio-landing.css";
import LoadingScreen from "@/components/portfolio-landing/LoadingScreen";
import Navbar from "@/components/portfolio-landing/Navbar";
import Hero from "@/components/portfolio-landing/Hero";
import ClientLogoStrip from "@/components/portfolio-landing/ClientLogoStrip";
import WhatWeDo from "@/components/portfolio-landing/WhatWeDo";
import SelectedWorks from "@/components/portfolio-landing/SelectedWorks";
import Journal from "@/components/portfolio-landing/Journal";
import Explorations from "@/components/portfolio-landing/Explorations";
import Stats from "@/components/portfolio-landing/Stats";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

export default function PortfolioLanding() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <Hero />
      <ClientLogoStrip />
      <WhatWeDo />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactFooter />
    </div>
  );
}
