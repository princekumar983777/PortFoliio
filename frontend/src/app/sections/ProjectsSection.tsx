import ProjectCard from "@/app/components/ProjectCard";
import { PROJECTS } from "@/app/utils/constants";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Selected work showcasing performance, UX, and clean code.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}


