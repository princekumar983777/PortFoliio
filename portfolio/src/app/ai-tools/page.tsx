import Link from 'next/link';
import { aiTools } from '@/data/aiTools';
import { CardGrid } from '@/components/ui/Card';

export default function AIToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <Link href="/ai-tools/playground" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
          Playground →
        </Link>
      </div>
      <CardGrid items={aiTools} />
    </div>
  );
}
