import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl?: string;
};

export function Card({ title, description, tags, link, imageUrl }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      {imageUrl && (
        <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>
        <Link 
          href={link}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
        >
          Learn more
          <FiArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

type CardGridProps = {
  items: CardProps[];
  className?: string;
};

export function CardGrid({ items, className = '' }: CardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}
