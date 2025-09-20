'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">{portfolioData.about.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2 max-w-3xl mx-auto">
            {portfolioData.about.title}
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {portfolioData.about.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              View My Work
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition-colors duration-200"
            >
              Get In Touch
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
