import { Metadata } from "next";
import dynamic from "next/dynamic";
import Layout from "@/app/components/Layout";

const AboutSection = dynamic(() => import("@/app/sections/AboutSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded"></div>,
});

export const metadata: Metadata = {
  title: "About - Prince's Portfolio",
  description: "Learn more about my background, experience, and passion for web development and technology.",
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="py-8">
        <AboutSection />
      </div>
    </Layout>
  );
}
