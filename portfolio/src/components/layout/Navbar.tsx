'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { portfolioData } from '@/data/portfolio';

type Theme = 'light' | 'dark' | 'system';

function isNightByTime(date: Date = new Date()) {
  const h = date.getHours();
  // Night: 7pm-6:59am
  return h >= 19 || h < 7;
}

function applyTheme(mode: Theme) {
  const root = document.documentElement;
  const body = document.body;
  if (mode === 'system') {
    // Auto by time of day
    if (isNightByTime()) {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    return;
  }
  if (mode === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
  }
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const pathname = usePathname();

  useEffect(() => {
    const stored = (typeof window !== 'undefined' ? localStorage.getItem('theme') : null) as Theme | null;
    const initial: Theme = stored ?? 'system';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    // Re-apply on hour change in Auto mode
    if (theme !== 'system') return;
    const interval = setInterval(() => applyTheme('system'), 60 * 1000);
    return () => clearInterval(interval);
  }, [theme]);

  const toggleTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {portfolioData.about.name}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                } px-3 py-2 text-sm font-medium`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => toggleTheme('light')}
                className={`p-1.5 rounded-full ${
                  theme === 'light' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                title="Light mode"
              >
                <FiSun size={16} />
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                className={`p-1.5 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                title="Dark mode"
              >
                <FiMoon size={16} />
              </button>
              <button
                onClick={() => toggleTheme('system')}
                className={`p-1.5 rounded-full text-xs font-medium ${
                  theme === 'system' 
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                title="System theme"
              >
                Auto
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  pathname === link.path
                    ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">THEME</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    toggleTheme('light');
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-md text-sm font-medium ${
                    theme === 'light' 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => {
                    toggleTheme('dark');
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-md text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => {
                    toggleTheme('system');
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-md text-sm font-medium ${
                    theme === 'system' 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  System
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
