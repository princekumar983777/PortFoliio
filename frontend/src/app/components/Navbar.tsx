"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/app/utils/constants";

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("home");
  const [open, setOpen] = useState<boolean>(false);

  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.href.replace("#", "")), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const onRoute = () => setOpen(false);
    window.addEventListener("hashchange", onRoute);
    return () => window.removeEventListener("hashchange", onRoute);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-neutral-900/80 shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="#home" className="font-bold tracking-tight text-xl text-blue-600 hover:text-blue-700 transition-colors">
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
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
                      (isActive
                        ? "text-white bg-blue-600"
                        : "text-gray-700 hover:text-blue-600 dark:text-gray-300")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {open && (
          <ul className="md:hidden pb-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.id}>
                  <a
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
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}


