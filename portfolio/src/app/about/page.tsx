import { portfolioData } from '@/data/portfolio';

export default function AboutPage() {
  const { about, education, skills, achievements } = portfolioData;
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <h2 className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-2">{about.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{about.title}</p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{about.description}</p>
        {/* Resume buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href="/resumes/Mech_Resume.pdf"
            download
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium"
          >
            Download Mechanical Resume
          </a>
          <a
            href="/resumes/Tech_Resume.pdf"
            download
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium"
          >
            Download Technical Resume
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="space-y-4">
          {education.map((ed, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold">{ed.degree}</h3>
              <p className="text-gray-700 dark:text-gray-300">{ed.institution}</p>
              <p className="text-sm text-gray-500">{ed.duration} • CGPA: {ed.cgpa}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillList title="Technical" items={skills.technical} />
          <SkillList title="Tools" items={skills.tools} />
          <SkillList title="Soft Skills" items={skills.soft} />
          <SkillList title="Interests" items={skills.interests} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map((a, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold">{a.title} <span className="text-sm text-gray-500">({a.year})</span></h3>
              <p className="text-gray-700 dark:text-gray-300">{a.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SkillList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from(items).map((it) => (
          <span key={it} className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
