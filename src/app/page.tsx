"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import NavigationOverlay from "@/components/layout/NavigationOverlay";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import HeroSection from "@/components/sections/HeroSection";
import PresentationSection from "@/components/sections/PresentationSection";
import WritingSection from "@/components/sections/WritingSection";
import VideoSection from "@/components/sections/VideoSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <NavigationOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <HeroSection />
        <PresentationSection />
        <WritingSection />
        <VideoSection />
        <NewsletterSection />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
