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

const Index = () => {
  const isMobile = useIsMobile();
  const { currentSection, navigateToSection, containerRef, setSectionRef } = useHorizontalScroll({
    totalSections: TOTAL_SECTIONS,
    transitionDuration: 800,
  });

  return (
    <div className={`${isMobile ? 'h-auto' : 'h-screen'} w-screen ${isMobile ? 'overflow-y-auto' : 'overflow-hidden'} bg-background`}>
      <PortfolioNav currentSection={currentSection} onNavigate={navigateToSection} isMobile={isMobile} />

      {isMobile ? (
        // Mobile view - vertical scroll
        <div className="pt-16">
          <section id="home" className="min-h-screen flex items-center justify-center py-20 px-4">
            <HeroSection onNavigate={navigateToSection} />
          </section>
          <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-4">
            <ProjectsSection />
          </section>
          <section id="blog" className="min-h-screen flex items-center justify-center py-20 px-4">
            <BlogSection />
          </section>
          <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
            <AboutSection />
          </section>
          <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4">
            <ContactSection />
          </section>
        </div>
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
