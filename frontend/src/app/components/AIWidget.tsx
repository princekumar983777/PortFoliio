"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function AIWidget() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const ask = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    const nextMessages: Message[] = [...messages, { role: "user", content: prompt }];
    setMessages(nextMessages);
    setPrompt("");
    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.answer ?? "" }]);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 shadow-sm">
      <h3 className="font-semibold">Ask my AI helper</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Connected to backend API.</p>

      <div className="mt-3 flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask something about my projects..."
          className="flex-1 rounded-lg border px-3 py-2 bg-transparent"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={
                "inline-block rounded-lg px-3 py-2 text-sm " +
                (m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-neutral-800")
              }
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


