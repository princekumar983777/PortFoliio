"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initial: FormState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email";
    if (form.message.trim().length < 10) return "Message should be at least 10 characters";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      setForm(initial);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full rounded-lg border px-3 py-2 bg-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full rounded-lg border px-3 py-2 bg-transparent"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          className="w-full rounded-lg border px-3 py-2 bg-transparent"
          placeholder="How can I help?"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {sent && <p className="text-sm text-green-600">Thanks! I'll get back to you soon.</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}


