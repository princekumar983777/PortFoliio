import { portfolioData } from '@/data/portfolio';
import { slugify } from '@/lib/slug';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proj = portfolioData.projects.find(p => slugify(p.title) === slug);

  if (!proj) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">We couldn't find the project you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-2">{proj.title} <span className="text-lg text-gray-500">({proj.year})</span></h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(proj.tech).map(t => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">{t}</span>
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{proj.description}</p>
    </div>
  );
}
