import { Metadata } from "next";
import dynamic from "next/dynamic";
import Layout from "@/app/components/Layout";

const ContactSection = dynamic(() => import("@/app/sections/ContactSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded"></div>,
});

export const metadata: Metadata = {
  title: "Contact - Prince's Portfolio",
  description: "Get in touch with me for collaborations, opportunities, or just to say hello.",
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="py-8">
        <ContactSection />
      </div>
    </Layout>
  );
}
