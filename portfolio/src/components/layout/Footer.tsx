import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0
          ">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              &copy; {currentYear} {portfolioData.about.name}. All rights reserved.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
