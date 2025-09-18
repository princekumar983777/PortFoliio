import Link from "next/link";
import CourseCard from "./CourseCard";
import { COURSES } from "@/app/utils/constants";

export default function CoursesPreview() {
  // Show only the first 2 courses as preview
  const previewCourses = COURSES.slice(0, 2);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-800">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Courses</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Continuous learning and skill development.</p>
          </div>
          <Link 
            href="/courses"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
