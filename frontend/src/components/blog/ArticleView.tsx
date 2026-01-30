import { X, Calendar, Clock, Tag, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Article } from '../../data/schema';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView = ({ article, onBack }: ArticleViewProps) => {
  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background rounded-lg shadow-xl">
      <Button 
        variant="ghost" 
        onClick={onBack}
        size="icon"
        className="absolute top-4 right-4 rounded-full h-10 w-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"
        aria-label="Close article"
      >
        <X size={20} />
      </Button>
      
      <article className="prose dark:prose-invert prose-lg max-w-none pt-6">
        <div className="not-prose">
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-8">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{article.author?.name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            
            {article.featuredImage && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}
          </header>
          
          {/* Article Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div 
              className="prose-p:mb-6 prose-headings:mt-8 prose-headings:mb-4 prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span 
                    key={tag.id}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ArticleView;
