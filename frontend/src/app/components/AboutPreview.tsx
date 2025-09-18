import Link from "next/link";
import About from "./About";

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-800">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">About</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Learn more about my background and experience.</p>
          </div>
          <Link 
            href="/about"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="prose prose-lg max-w-none">
          <About />
        </div>
      </div>
    </section>
  );
}
