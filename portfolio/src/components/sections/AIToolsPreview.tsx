import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { Card, CardGrid } from '../ui/Card';

const aiTools = [
  {
    title: 'Text Summarizer',
    description: 'An AI-powered tool that generates concise summaries of long articles and documents.',
    tags: ['NLP', 'Python', 'Transformers'],
    link: '/ai-tools/text-summarizer',
  },
  {
    title: 'Code Explainer',
    description: 'Explains complex code snippets in plain English to help you understand how they work.',
    tags: ['Code Analysis', 'Machine Learning', 'Python'],
    link: '/ai-tools/code-explainer',
  },
  {
    title: 'Image Generator',
    description: 'Generate unique images from text descriptions using advanced AI models.',
    tags: ['Computer Vision', 'GANs', 'Python'],
    link: '/ai-tools/image-generator',
  },
];

export default function AIToolsPreview() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">AI Tools</h2>
          <Link 
            href="/ai-tools" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
          >
            Explore all tools
            <FiArrowRight className="ml-1.5 h-5 w-5" />
          </Link>
        </div>
        
        <CardGrid items={aiTools} />
      </div>
    </section>
  );
}
