import Image from 'next/image';

type HobbyPost = {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  tags: string[];
  date: string;
  readingTime: string;
};

const posts: HobbyPost[] = [
  {
    id: 'trail-runner-notes',
    title: 'Trail Runner Notes: Dawn Miles',
    body: 'Chasing the sunrise over quiet trails. Gear tweaks, hydration strategy, and why negative splits feel like magic. I log cadence, heart rate, and terrain to shape weekly blocks.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    tags: ['Running', 'Health', 'Outdoors'],
    date: '2024-12-18',
    readingTime: '4 min',
  },
  {
    id: 'brew-journal',
    title: 'Brew Journal: Perfecting the V60',
    body: 'Testing pours and grinds to dial in a sweet, balanced cup. This week: 15g coffee, 250g water at 94°C, 45s bloom, finish at 3:30. Notes on channeling and paper rinse.',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
    tags: ['Coffee', 'Home Lab'],
    date: '2025-02-03',
    readingTime: '3 min',
  },
  {
    id: 'foto-walk-portraits',
    title: 'Photography Walk: Street Portraits',
    body: 'Learning to make quick connections with strangers. I focus on eye level framing and gentle prompts to bring out micro-stories. 35mm, f/2, soft side light.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    tags: ['Photography', 'People'],
    date: '2025-05-27',
    readingTime: '5 min',
  },
  {
    id: 'reading-notes-ai',
    title: 'Reading Notes: AI Research Roundup',
    body: 'A weekly digest of papers that caught my eye: retrieval-augmented agents, efficient fine-tuning at the edge, and multi-modal grounding with compact adapters.',
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
    tags: ['Research', 'AI'],
    date: '2025-06-14',
    readingTime: '6 min',
  },
];

export default function BlogsPageAlias() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blogs & Research Notes</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Curated entries for visitors — photography, coffee, running, and reading notes.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
