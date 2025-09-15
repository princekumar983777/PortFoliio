import CourseCard from "@/app/components/CourseCard";
import { COURSES } from "@/app/utils/constants";

export default function CoursesSection() {
  return (
    <section id="courses" className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold">Courses</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Continuous learning to stay sharp and ship better.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}


