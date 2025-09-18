import { Metadata } from "next";
import dynamic from "next/dynamic";
import Layout from "@/app/components/Layout";

const AIToolsSection = dynamic(() => import("@/app/sections/AIToolsSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded"></div>,
});

export const metadata: Metadata = {
  title: "AI Tools - Prince's Portfolio",
  description: "Interactive AI-powered tools and widgets demonstrating modern AI integration in web applications.",
};

export default function AIToolsPage() {
  return (
    <Layout>
      <div className="py-8">
        <AIToolsSection />
      </div>
    </Layout>
  );
}
