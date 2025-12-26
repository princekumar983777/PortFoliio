import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Platform",
    description:
      "A comprehensive analytics dashboard leveraging machine learning to provide predictive insights and real-time data visualization for enterprise clients.",
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
    image: "gradient-1",
  },
  {
    id: 2,
    title: "Autonomous Drone Navigation",
    description:
      "Computer vision system for autonomous drone navigation using deep learning models for obstacle detection and path planning in complex environments.",
    techStack: ["Python", "PyTorch", "OpenCV", "ROS", "C++"],
    github: "https://github.com",
    live: "https://example.com",
    image: "gradient-2",
  },
  {
    id: 3,
    title: "Real-time Data Pipeline",
    description:
      "Scalable data processing pipeline handling millions of events per second with fault-tolerant architecture and automated monitoring.",
    techStack: ["Apache Kafka", "Spark", "Kubernetes", "Go", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
    image: "gradient-3",
  },
  {
    id: 4,
    title: "NLP Research Assistant",
    description:
      "An intelligent research assistant that summarizes academic papers, extracts key insights, and generates literature reviews using transformer models.",
    techStack: ["Python", "Transformers", "LangChain", "Neo4j", "FastAPI"],
    github: "https://github.com",
    live: "https://example.com",
    image: "gradient-4",
  },
];

const gradients: Record<string, string> = {
  "gradient-1": "from-primary/30 to-blue-500/20",
  "gradient-2": "from-purple-500/30 to-primary/20",
  "gradient-3": "from-orange-500/30 to-red-500/20",
  "gradient-4": "from-primary/30 to-purple-500/20",
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentProject];

  return (
    <section className="section-container bg-section-projects flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Projects</h2>
          <p className="text-muted-foreground">
            Selected work showcasing my expertise
          </p>
        </div>

        {/* Project navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentProject(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentProject
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevProject}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={nextProject}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Project card */}
        <div
          key={project.id}
          className="project-card grid lg:grid-cols-2 gap-8 animate-fade-in-up"
        >
          {/* Project image/visual */}
          <div
            className={`aspect-video rounded-lg bg-gradient-to-br ${
              gradients[project.image]
            } flex items-center justify-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,hsl(var(--background))_100%)]" />
            <span className="text-6xl font-bold opacity-20">{`0${project.id}`}</span>
          </div>

          {/* Project details */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="text-primary font-mono text-sm">
                Project {String(currentProject + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <h3 className="text-3xl font-bold mt-2">{project.title}</h3>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={20} />
                <span>Source Code</span>
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
