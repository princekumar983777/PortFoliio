import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { CardGrid } from '../ui/Card';
import { portfolioData } from '@/data/portfolio';
import { slugify } from '@/lib/slug';

export default function ProjectsPreview() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
          <Link 
            href="/projects" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
          >
            View all projects
            <FiArrowRight className="ml-1.5 h-5 w-5" />
          </Link>
        </div>
        
        <CardGrid 
          items={portfolioData.projects.slice(0, 3).map((p) => ({
            title: `project/${p.title} (${p.year})`,
            description: p.description,
            tags: Array.from(p.tech),
            link: `/projects/${slugify(p.title)}`,
          }))}
        />
      </div>
    </section>
  );
}
