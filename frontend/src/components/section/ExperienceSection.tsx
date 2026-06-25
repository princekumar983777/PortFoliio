const experienceItems = [
  {
    company: "Tynor",
    role: "Intern",
    period: "2024 - Present",
    description: "Working on modern web interfaces, component design, and performance improvements.",
    highlights: [
      "Built reusable UI components and polished user flows.",
      "Collaborated with a product team to ship faster page interactions.",
    ],
    tags: ["React", "TypeScript", "UI", "Teamwork"],
  },
  {
    company: "AD Infocom System",
    role: "Intern",
    period: "2023",
    description: "Supported frontend development and delivered polished feature updates.",
    highlights: [
      "Participated in cross-functional planning and code reviews.",
      "Improved UI consistency across multiple product screens.",
    ],
    tags: ["Web", "Collaboration", "Design", "Problem Solving"],
  },
];

const ExperienceSection = () => {
  return (
    <section className="section-container bg-surface/80 border border-border/50 rounded-3xl px-4 sm:px-8 shadow-lg backdrop-blur-xl md:min-h-screen flex items-center justify-center py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center w-full">
        <div className="mb-8">
          <p className="text-primary font-mono text-sm tracking-[0.35em] uppercase mb-2">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Companies I have worked with
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            A quick overview of the teams and internships where I contributed to frontend, product, and engineering work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 items-stretch justify-items-center w-full">
          {experienceItems.map((item) => (
            <article
              key={item.company}
              className="w-full max-w-xl h-full flex flex-col justify-between bg-background border border-border/70 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-primary font-semibold">{item.role}</p>
                  <h3 className="text-2xl font-semibold mt-1">{item.company}</h3>
                </div>
                <span className="rounded-full bg-primary/10 text-primary text-xs font-medium px-3 py-1">
                  {item.period}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-6 mb-5">
                {item.description}
              </p>

              <ul className="space-y-3 mb-5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground bg-muted/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
