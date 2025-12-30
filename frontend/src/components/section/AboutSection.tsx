import { Code2, Brain, Database, Cpu } from "lucide-react";

const skills = [
  {
    category: "AI / Machine Learning",
    icon: Brain,
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Transformers", "LangChain"],
  },
  {
    category: "Backend Development",
    icon: Code2,
    items: ["Python", "Go", "Node.js", "FastAPI", "Django"],
  },
  {
    category: "Data Engineering",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Apache Kafka", "Spark", "Redis"],
  },
  {
    category: "DevOps & Cloud",
    icon: Cpu,
    items: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD"],
  },
];

const AboutSection = () => {
  return (
    <section className="section-container bg-section-about flex items-center justify-center relative overflow-y-auto custom-scrollbar pt-32">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">About Me</h2>
          <p className="text-muted-foreground">
            My journey and expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Story */}
          <div className="space-y-6">
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                I started my journey as a <span className="text-foreground font-medium">Mechanical Engineer</span>, 
                fascinated by how complex systems work together. This foundation taught me 
                to think analytically and approach problems with a structured mindset.
              </p>
              <p>
                My curiosity led me to explore the intersection of engineering and 
                software, eventually discovering my passion for <span className="text-primary font-medium">Artificial Intelligence 
                and Machine Learning</span>. Today, I bridge the gap between traditional 
                engineering principles and cutting-edge AI technologies.
              </p>
              <p>
                I specialize in building <span className="text-foreground font-medium">intelligent systems</span> that solve 
                real-world problems, from predictive analytics platforms to autonomous 
                systems. My background gives me a unique perspective on building 
                robust, scalable solutions.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold gradient-text">30+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <skillGroup.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="tech-badge hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
