"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";
import ScrollToTop from "./ScrollToTop";
import PageTransition from "./PageTransition";
import Footer from "./Footer";
import ChatWidget from "./chat/ChatWidget";

interface LayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  showFooter?: boolean;
  showChat?: boolean;
}

export default function Layout({ children, showBreadcrumbs = true, showFooter = true, showChat = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1">
        {showBreadcrumbs && (
          <div className="mx-auto max-w-6xl px-6">
            <Breadcrumbs />
          </div>
        )}
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      {showFooter && <Footer />}
      <ScrollToTop />
      {showChat && <ChatWidget />}
    </div>
  );
}
