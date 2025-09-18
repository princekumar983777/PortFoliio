import { Metadata } from "next";
import dynamic from "next/dynamic";
import Layout from "@/app/components/Layout";

const CoursesSection = dynamic(() => import("@/app/sections/CoursesSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded"></div>,
});

export const metadata: Metadata = {
  title: "Courses - Prince's Portfolio",
  description: "View my learning journey and course progress in web development and software engineering.",
};

export default function CoursesPage() {
  return (
    <Layout>
      <div className="py-8">
        <CoursesSection />
      </div>
    </Layout>
  );
}
