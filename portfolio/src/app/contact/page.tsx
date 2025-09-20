'use client';

import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the input
    console.log({ name, email, message });
    setStatus('Thanks! Your message has been logged in the console.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-1">
        <p><strong>Phone:</strong> {portfolioData.contact.phone}</p>
        <p><strong>Email:</strong> {portfolioData.contact.email}</p>
        <p><strong>College Email:</strong> {portfolioData.contact.collegeEmail}</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800 h-32"
            placeholder="Write your message..."
            required
          />
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Send</button>
        {status && <p className="text-sm text-green-600 dark:text-green-400 mt-2">{status}</p>}
      </form>
    </div>
  );
}
