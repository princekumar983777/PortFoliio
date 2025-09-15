export default function About() {
  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        I'm Prince, a frontend engineer focused on building fast, accessible interfaces with
        Next.js, TypeScript, and Tailwind. I love crafting smooth UX, thoughtful animations, and
        integrating AI to elevate developer and user workflows.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        I care about performance budgets, clean abstractions, and maintainable systems. Outside of work,
        you'll find me tinkering with design systems, reading about product, or mentoring devs.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-3">Skills</h3>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          React, Next.js, TypeScript
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Tailwind CSS, Radix, Headless UI
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Node.js, REST, basic GraphQL
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Testing: Vitest/Jest, React Testing Library
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Performance: Lighthouse, Core Web Vitals
        </li>
      </ul>
    </div>
  );
}


