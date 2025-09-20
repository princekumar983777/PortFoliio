export default function AIToolsPage() {
  const tools = Array.from({ length: 9 }).map((_, i) => ({
    title: `AI Tool ${i + 1}`,
    description: 'This is a placeholder AI tool description.',
    tags: ['Python', 'FastAPI', 'ML'],
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">AI Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((t, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t.description}</p>
            <div className="flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
