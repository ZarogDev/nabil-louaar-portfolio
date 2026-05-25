import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import HeroSection from "@/components/sections/HeroSection";
import PresentationSection from "@/components/sections/PresentationSection";
import WritingSection from "@/components/sections/WritingSection";
import VideoSection from "@/components/sections/VideoSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
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
