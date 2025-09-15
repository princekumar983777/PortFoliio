import AIWidget from "@/app/components/AIWidget";

export default function AIToolsSection() {
  return (
    <section id="ai-tools" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold">AI Tools</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Experiment with my AI-connected utilities.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AIWidget />
          <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
            <h3 className="font-semibold">Coming Soon</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">More tools and demos will appear here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


