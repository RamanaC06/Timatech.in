"use client";

import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Progess from "@/components/Progess";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import { FaHome, FaInfoCircle, FaServicestack, FaChartLine } from "react-icons/fa";

export default function Home() {
  const dockItems = [
    { title: "Home", icon: <FaHome size={24} />, href: "#hero" },
    { title: "About", icon: <FaInfoCircle size={24} />, href: "#about" },
    { title: "Services", icon: <FaServicestack size={24} />, href: "#services" },
    { title: "Progress", icon: <FaChartLine size={24} />, href: "#progress" },
  ];

  return (
    <main className="relative">
      {/* Floating Dock */}
      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        mobileClassName="fixed bottom-6 right-6 translate-x-500"
      />

      {/* Sections */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
      <section id="about" className="min-h-screen">
        <WhoWeAre />
        <WhyChooseUs />
      </section>
      <section id="services" className="min-h-screen">
        <Dashboard />
      </section>
      <section id="progress" className="min-h-screen">
        <Progess />
      </section>

      <Footer />
    </main>
  );
}
