import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable ML Pipelines in Production",
    excerpt:
      "A deep dive into designing and implementing machine learning pipelines that can handle real-world scale, with practical tips from production deployments.",
    date: "Dec 20, 2024",
    readTime: "8 min read",
    category: "Machine Learning",
    details: [
      "This article explores the end-to-end architecture of ML pipelines, from data ingestion to model deployment.",
      "It covers orchestration, monitoring, and best practices for keeping pipelines reliable at scale.",
      "You can also learn how to balance automation with manual checks to avoid costly production issues.",
    ],
  },
  {
    id: 2,
    title: "From Mechanical Engineering to AI: My Journey",
    excerpt:
      "Sharing my unconventional path from designing mechanical systems to building intelligent software systems, and the lessons learned along the way.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    category: "Career",
    details: [
      "I describe the cross-disciplinary skills that helped me transition from mechanical engineering into AI product work.",
      "The article highlights how modeling, collaboration, and rapid prototyping carry over between hardware and software.",
      "You'll find practical advice for anyone looking to pivot into tech while leveraging their engineering background.",
    ],
  },
  {
    id: 3,
    title: "Understanding Transformer Architectures",
    excerpt:
      "Breaking down the transformer architecture that powers modern NLP, with intuitive explanations and code examples for practitioners.",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    category: "Deep Learning",
    details: [
      "The article breaks down self-attention, positional embeddings, and the transformer encoder-decoder flow.",
      "It uses simple diagrams and examples to make the core concepts easy to understand.",
      "There are also notes on how transformers differ from older sequence models and why they scale so well.",
    ],
  },
  {
    id: 4,
    title: "Optimizing Backend Performance with Go",
    excerpt:
      "Practical strategies for building high-performance backend services in Go, including concurrency patterns and memory optimization techniques.",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    category: "Backend",
    details: [
      "This post covers idiomatic Go patterns for fast HTTP APIs and efficient goroutine management.",
      "It also explains when to use channels, worker pools, and caching to reduce latency.",
      "You’ll get concrete examples for tuning service performance without sacrificing code clarity.",
    ],
  },
];

const BlogSection = () => {
  const [currentPost, setCurrentPost] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % blogPosts.length);
  };

  const prevPost = () => {
    setCurrentPost((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const post = blogPosts[currentPost];

  useEffect(() => {
    setIsExpanded(false);
  }, [currentPost]);

  return (
    <section className="section-container bg-section-blog flex items-center justify-center relative min-h-0">
      <div className="max-w-6xl mx-auto px-0 sm:px-6 w-full">
        {/* Section header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Blog</h2>
          <p className="text-muted-foreground">
            Thoughts, tutorials, and insights
          </p>
        </div>

        {/* Post navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {blogPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPost(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentPost
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPost}
              disabled={isExpanded}
              className={`p-2 rounded-lg border border-border transition-colors ${
                isExpanded
                  ? "cursor-not-allowed text-muted-foreground/50 border-muted-foreground/30"
                  : "hover:bg-secondary"
              }`}
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={nextPost}
              disabled={isExpanded}
              className={`p-2 rounded-lg border border-border transition-colors ${
                isExpanded
                  ? "cursor-not-allowed text-muted-foreground/50 border-muted-foreground/30"
                  : "hover:bg-secondary"
              }`}
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Blog post card */}
        <div
          key={post.id}
          className="glass-card p-6 sm:p-8 md:p-12 animate-fade-in-up"
        >
          <div className="max-w-3xl">
            {/* Meta info */}
            <div className="flex items-center gap-4 mb-6">
              <span className="tech-badge">{post.category}</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="text-muted-foreground text-sm">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              {post.excerpt}
            </p>

            {/* Toggle article details */}
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-medium"
            >
              {isExpanded ? "Return to card view" : "Read Article"}
              <ArrowRight size={18} />
            </button>

            {isExpanded && (
              <div className="mt-8 border-t border-border pt-8 text-left">
                <div className="space-y-4">
                  {post.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Article number */}
          <div className="absolute top-8 right-8 text-8xl font-bold opacity-5">
            {String(currentPost + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
