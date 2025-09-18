import { Metadata } from "next";
import dynamic from "next/dynamic";
import Layout from "@/app/components/Layout";

const ProjectsSection = dynamic(() => import("@/app/sections/ProjectsSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded"></div>,
});

export const metadata: Metadata = {
  title: "Projects - Prince's Portfolio",
  description: "Explore my portfolio of web development projects showcasing modern technologies and best practices.",
};

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="py-8">
        <ProjectsSection />
      </div>
    </Layout>
  );
}
