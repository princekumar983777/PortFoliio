import Link from "next/link";
import AIWidget from "./AIWidget";

export default function AIToolsPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">AI Tools</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Interactive AI-powered widgets and tools.</p>
          </div>
          <Link 
            href="/ai-tools"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <AIWidget />
        </div>
      </div>
    </section>
  );
}
