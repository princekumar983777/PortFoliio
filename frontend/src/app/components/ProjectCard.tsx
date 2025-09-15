"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";
import type { Project } from "@/app/utils/constants";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt="" className="h-40 w-full object-cover" />
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{project.title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700"
            >
              Details
            </button>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </article>

      <Modal open={open} onClose={() => setOpen(false)} title={project.title}>
        <p className="text-gray-700 dark:text-gray-200">{project.description}</p>
        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-neutral-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}


