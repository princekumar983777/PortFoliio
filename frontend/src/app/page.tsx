import Layout from "@/app/components/Layout";
import HeroSection from "@/app/sections/HeroSection";
import ProjectsPreview from "@/app/components/ProjectsPreview";
import CoursesPreview from "@/app/components/CoursesPreview";
import AIToolsPreview from "@/app/components/AIToolsPreview";
import AboutPreview from "@/app/components/AboutPreview";
import ContactPreview from "@/app/components/ContactPreview";

export default function Page() {
  return (
    <Layout showBreadcrumbs={false} showFooter={false}>
      <HeroSection />
      <ProjectsPreview />
      <CoursesPreview />
      <AIToolsPreview />
      <AboutPreview />
      <ContactPreview />
    </Layout>
  );
}

