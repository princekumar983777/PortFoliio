import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const userMessage = body?.message as string | undefined;

  // Simple echo-style dummy reply
  const reply = userMessage
    ? `You said: "${userMessage}". This is a placeholder response from the assistant.`
    : 'Hello! Ask me anything about my projects or tools.';

  return NextResponse.json({ reply });
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Use POST with { message }' });
}
