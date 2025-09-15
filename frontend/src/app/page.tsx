import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import ProjectsSection from "@/app/sections/ProjectsSection";
import CoursesSection from "@/app/sections/CoursesSection";
import AIToolsSection from "@/app/sections/AIToolsSection";
import AboutSection from "@/app/sections/AboutSection";
import ContactSection from "@/app/sections/ContactSection";

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <CoursesSection />
      <AIToolsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

