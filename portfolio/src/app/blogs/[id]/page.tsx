import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogs } from '@/data/blogs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogs.find((b) => b.id === id);
  if (!post) return notFound();

  return (
    <div className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{post.title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">{post.date} • {post.readingTime}</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((t) => (
              <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                {t}
              </span>
            ))}
          </div>
          {(post.repoUrl) && (
            <div className="mt-4">
              <a
                href={post.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:opacity-90"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
                View GitHub Repo
              </a>
            </div>
          )}
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
        </div>

        {post.youtubeId && (
          <div className="mb-8">
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
