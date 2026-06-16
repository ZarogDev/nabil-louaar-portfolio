import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import HeroSection from "@/components/sections/HeroSection";
import PresentationSection from "@/components/sections/PresentationSection";
import WritingSection from "@/components/sections/WritingSection";
import VideoSection from "@/components/sections/VideoSection";
import FaqSection from "@/components/sections/FaqSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

// Rendu à la demande : les sections lisent la DB (Neon), et le contenu édité
// depuis le dashboard admin doit apparaître sans redéploiement. Évite aussi
// toute dépendance à la DB lors du build (prérendu statique).
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <HeroSection />
        <PresentationSection />
        <WritingSection />
        <VideoSection />
        <FaqSection />
        <NewsletterSection />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
