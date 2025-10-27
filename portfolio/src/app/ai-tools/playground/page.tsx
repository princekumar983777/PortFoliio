'use client';

import { useState } from 'react';

export default function AIToolsPlaygroundPage() {
  const [model, setModel] = useState('gpt-3.5');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      // Demo: echo the prompt with a fake delay. Replace with a real API call if needed.
      await new Promise((r) => setTimeout(r, 600));
      setOutput(`Model: ${model}\n\nResponse to: "${prompt}"\n\n> This is a demo response. Hook this up to your API to get real outputs.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">AI Tools Playground</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            >
              <option value="gpt-3.5">gpt-3.5</option>
              <option value="gpt-4">gpt-4</option>
              <option value="mini">mini (fast)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Prompt</label>
            <textarea
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={run}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Running...' : 'Run'}
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Output</label>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[120px]">
            {output || 'Results will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
