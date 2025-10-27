import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '@/data/blogs';

export default function BlogsPage() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blogs & Research Notes</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Curated entries for visitors — photography, coffee, running, and reading notes.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <Link key={post.id} href={`/blogs/${post.id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 block">
              <div className="relative h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((t) => (
                    <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{post.title}</h2>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{post.date} • {post.readingTime}</div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
