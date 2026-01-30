import { useState } from "react";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Article } from "../../data/schema";

interface BlogListProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const BlogList = ({ articles, onArticleClick }: BlogListProps) => {
  const [currentPost, setCurrentPost] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Handle window resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setIsMobileView(window.innerWidth < 768);
    });
  }

  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % articles.length);
  };

  const prevPost = () => {
    setCurrentPost((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const renderPosts = () => {
    if (isMobileView) {
      // Mobile view: Show one post at a time with swipe navigation
      const post = articles[currentPost];
      return (
        <div key={post.id} className="glass-card p-6 md:p-8 animate-fade-in-up">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="tech-badge text-sm">{post.category?.name || 'Uncategorized'}</span>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Calendar size={12} />
                  {post.publishedAt || post.createdAt}
                </span>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
            
            <button
              onClick={() => onArticleClick(post)}
              className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-auto pt-4 border-t border-border"
            >
              Read Article
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      );
    } else {
      // Desktop view: Show grid of posts
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((post) => (
            <div 
              key={post.id} 
              className="glass-card p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              onClick={() => onArticleClick(post)}
            >
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tech-badge text-xs">{post.category?.name || 'Uncategorized'}</span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    {post.publishedAt || post.createdAt}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime} min read
                </span>
                <button className="text-primary text-sm font-medium flex items-center gap-1">
                  Read Article
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      {renderPosts()}
      
      {isMobileView && articles.length > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            {articles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPost(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentPost
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPost}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              disabled={currentPost === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={nextPost}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              disabled={currentPost === articles.length - 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
