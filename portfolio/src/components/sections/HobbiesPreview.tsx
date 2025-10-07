import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

type HobbyPost = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  tags: string[];
  date: string;
};

const previewPosts: HobbyPost[] = [
  {
    id: 'trail-runner-notes',
    title: 'Trail Runner Notes: Dawn Miles',
    excerpt: 'Chasing the sunrise over quiet trails. Gear tweaks, hydration strategy, and why negative splits feel like magic.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    tags: ['Running', 'Health', 'Outdoors'],
    date: '2024-12-18',
  },
  {
    id: 'brew-journal',
    title: 'Brew Journal: Perfecting the V60',
    excerpt: 'Testing pours and grinds to dial in a sweet, balanced cup. Includes my 3:30 recipe and bloom technique.',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
    tags: ['Coffee', 'Home Lab'],
    date: '2025-02-03',
  },
  {
    id: 'foto-walk-portraits',
    title: 'Photography Walk: Street Portraits',
    excerpt: 'Learning to make quick connections with strangers. Notes on composition, light, and micro-stories.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    tags: ['Photography', 'People'],
    date: '2025-05-27',
  },
];

export default function HobbiesPreview() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Blogs</h2>
          <Link
            href="/blogs"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
          >
            View more
            <FiArrowRight className="ml-1.5 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((t) => (
                    <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
