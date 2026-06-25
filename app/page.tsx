"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy-load effects that are not critical
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const SmoothScrollProvider = dynamic(() => import("@/components/SmoothScrollProvider"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Skip loader on subsequent visits
  useEffect(() => {
    const visited = sessionStorage.getItem("portfolio-visited");
    if (visited) setLoading(false);
    else sessionStorage.setItem("portfolio-visited", "1");
  }, []);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <SmoothScrollProvider>
      {/* Effects */}
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />
      <CommandPalette />

      {/* Content */}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BentoGrid />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
