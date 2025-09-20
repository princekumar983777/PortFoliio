import { NextResponse } from 'next/server';

export async function GET() {
  const tools = [
    { id: 'summarizer', name: 'Text Summarizer', description: 'Summarize long content into concise highlights.' },
    { id: 'code-explainer', name: 'Code Explainer', description: 'Explain complex code in simple terms.' },
    { id: 'image-generator', name: 'Image Generator', description: 'Generate images from text prompts.' },
  ];
  return NextResponse.json({ tools });
}
