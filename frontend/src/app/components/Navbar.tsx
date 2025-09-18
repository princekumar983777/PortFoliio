"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/app/utils/constants";

const NAV_LINKS = [
  { id: "nav-home", label: "Home", href: "/" },
  { id: "nav-projects", label: "Projects", href: "/projects" },
  { id: "nav-courses", label: "Courses", href: "/courses" },
  { id: "nav-ai", label: "AI Tools", href: "/ai-tools" },
  { id: "nav-about", label: "About", href: "/about" },
  { id: "nav-contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-neutral-900/80 shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold tracking-tight text-xl text-blue-600 hover:text-blue-700 transition-colors">
            {SITE.name}
          </Link>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul className="hidden md:flex gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
                      (isActive
                        ? "text-white bg-blue-600"
                        : "text-gray-700 hover:text-blue-600 dark:text-gray-300")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {open && (
          <ul className="md:hidden pb-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={
                      "block px-3 py-2 rounded-md text-sm font-medium transition-colors " +
                      (isActive
                        ? "text-white bg-blue-600"
                        : "text-gray-700 hover:text-blue-600 dark:text-gray-300")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}


