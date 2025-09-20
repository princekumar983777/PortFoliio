'use client';

import Hero from '@/components/sections/Hero';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import AIToolsPreview from '@/components/sections/AIToolsPreview';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <main className="flex-1">
        <Hero />
        <ProjectsPreview />
        <AIToolsPreview />
      </main>
    </div>
  );
}
 
