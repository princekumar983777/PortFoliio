import { useState } from "react";
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
  },
  {
    id: 2,
    title: "From Mechanical Engineering to AI: My Journey",
    excerpt:
      "Sharing my unconventional path from designing mechanical systems to building intelligent software systems, and the lessons learned along the way.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    category: "Career",
  },
  {
    id: 3,
    title: "Understanding Transformer Architectures",
    excerpt:
      "Breaking down the transformer architecture that powers modern NLP, with intuitive explanations and code examples for practitioners.",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    category: "Deep Learning",
  },
  {
    id: 4,
    title: "Optimizing Backend Performance with Go",
    excerpt:
      "Practical strategies for building high-performance backend services in Go, including concurrency patterns and memory optimization techniques.",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    category: "Backend",
  },
];

const BlogSection = () => {
  const [currentPost, setCurrentPost] = useState(0);

  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % blogPosts.length);
  };

  const prevPost = () => {
    setCurrentPost((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const post = blogPosts[currentPost];

  return (
    <section className="section-container bg-section-blog flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Blog</h2>
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
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={nextPost}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Blog post card */}
        <div
          key={post.id}
          className="glass-card p-8 md:p-12 animate-fade-in-up"
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Read more link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-medium"
            >
              Read Article
              <ArrowRight size={18} />
            </a>
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
