import { useEffect, useState } from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import PortfolioNav from "@/components/section/PortfolioNav";
import HeroSection from "@/components/section/HeroSection";
import ProjectsSection from "@/components/section/ProjectsSection";
import BlogSection from "@/components/section/BlogSection";
import AboutSection from "@/components/section/AboutSection";
import ContactSection from "@/components/section/ContactSection";
import ChatBot from "@/components/section/ChatBot";
import { useIsMobile } from "@/hooks/use-mobile";

const TOTAL_SECTIONS = 5;
const SECTION_IDS = ['home', 'projects', 'blog', 'about', 'contact'];

const Index = () => {
  const isMobile = useIsMobile();
  const [mobileSection, setMobileSection] = useState(0);
  const { currentSection, navigateToSection, containerRef, setSectionRef } = useHorizontalScroll({
    totalSections: TOTAL_SECTIONS,
    transitionDuration: 800,
  });

  // Track visible section on mobile for nav highlighting
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = SECTION_IDS.indexOf(id);
            if (idx >= 0) setMobileSection(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isMobile]);

  const activeSection = isMobile ? mobileSection : currentSection;

  // On mobile: scroll to section by ID; on desktop: use horizontal navigation
  const handleMobileNavigate = (index: number) => {
    if (isMobile) {
      const el = document.getElementById(SECTION_IDS[index]);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigateToSection(index);
    }
  };

  return (
    <div className={`${isMobile ? 'min-h-screen' : 'h-screen'} w-screen ${isMobile ? '' : 'overflow-hidden'} bg-background`}>
      <PortfolioNav currentSection={activeSection} onNavigate={isMobile ? handleMobileNavigate : navigateToSection} isMobile={isMobile} />

      {isMobile ? (
        // Mobile view - single page vertical scroll, all content gathered. Symmetric px-4.
        <main className="pt-16 w-full max-w-full overflow-x-hidden">
          <section id="home" className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 w-full">
            <HeroSection onNavigate={handleMobileNavigate} />
          </section>
          <section id="projects" className="min-h-0 py-12 sm:py-16 px-4 sm:px-6 w-full">
            <ProjectsSection />
          </section>
          <section id="blog" className="min-h-0 py-12 sm:py-16 px-4 sm:px-6 w-full">
            <BlogSection />
          </section>
          <section id="about" className="min-h-0 py-12 sm:py-16 px-4 sm:px-6 w-full">
            <AboutSection />
          </section>
          <section id="contact" className="min-h-0 py-12 sm:py-16 px-4 sm:px-6 w-full">
            <ContactSection />
          </section>
        </main>
      ) : (
        // Desktop view - horizontal scroll
        <div
          ref={containerRef}
          className="h-screen w-screen overflow-hidden"
        >
          <div
            className="horizontal-scroll h-full"
            style={{
              transform: `translateX(-${currentSection * 100}vw)`,
            }}
          >
            <section ref={setSectionRef(0)} className="w-screen h-full flex-shrink-0 overflow-y-auto">
              <HeroSection onNavigate={navigateToSection} />
            </section>
            <section ref={setSectionRef(1)} className="w-screen h-full flex-shrink-0 overflow-y-auto">
              <ProjectsSection />
            </section>
            <section ref={setSectionRef(2)} className="w-screen h-full flex-shrink-0 overflow-y-auto">
              <BlogSection />
            </section>
            <section ref={setSectionRef(3)} className="w-screen h-full flex-shrink-0 overflow-y-auto">
              <AboutSection />
            </section>
            <section ref={setSectionRef(4)} className="w-screen h-full flex-shrink-0 overflow-y-auto">
              <ContactSection />
            </section>
          </div>
        </div>
      )}

      {/* Section indicators - only show on desktop */}
      {!isMobile && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => navigateToSection(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentSection
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to section ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Chatbot */}
      {!isMobile && <ChatBot />}
    </div>
  );
};

export default Index;
