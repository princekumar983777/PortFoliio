import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';
import { slugify } from '@/lib/slug';

export default function ProjectsPage() {
  const projects = portfolioData.projects;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <Link key={idx} href={`/projects/${slugify(p.title)}`} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-800 block hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-1">project/{p.title} <span className="text-sm text-gray-500">({p.year})</span></h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(p.tech).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
