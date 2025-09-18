import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/app/utils/constants";

export default function ProjectsPreview() {
  // Show only the first 3 projects as preview
  const previewProjects = PROJECTS.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Selected work showcasing performance, UX, and clean code.</p>
          </div>
          <Link 
            href="/projects"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
