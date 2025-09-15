import ProgressBar from "@/app/components/ProgressBar";
import type { Course } from "@/app/utils/constants";

type Props = { course: Course };

export default function CourseCard({ course }: Props) {
  return (
    <article className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{course.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{course.provider}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {course.progressPercent}%
        </span>
      </div>
      <div className="mt-3">
        <ProgressBar value={course.progressPercent} />
      </div>
    </article>
  );
}


