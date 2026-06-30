// /api/chat.js — DeepSeek proxy with streaming
// Deployed as a Vercel Edge Function. Reads DEEPSEEK_API_KEY from env vars.

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `You are Cozy Assistant, the helpful AI assistant inside the Momcozy app for the Air One wearable breast pump.

Your role:
- Help moms set up, clean, assemble, troubleshoot, and use the Air One.
- Give answers about pumping technique, flange size, milk storage, and general lactation support.
- Be warm, supportive, and concise. Keep replies to 3-5 short sentences unless the user asks for more detail.
- Use plain language, no medical jargon unless asked.

Important boundaries:
- You are NOT a doctor or lactation consultant. Add a brief reminder to consult a professional when the question is medical (pain, blood, infection, baby health, medication, mental health).
- If the question is clearly outside the Momcozy / lactation / parenting context (e.g. coding, finance, politics), gently steer back: "I'm here to help with your Air One and pumping journey — is there something I can help with there?"
- Never recommend a specific medication, dosage, or treatment plan.

Tone: kind, calm, encouraging. Reply in the same language the user writes in (English or 中文).`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured on server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userMessages = Array.isArray(body.messages) ? body.messages : [];
  if (userMessages.length === 0) {
    return new Response(JSON.stringify({ error: 'Empty messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Prepend system prompt
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...userMessages.filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'),
  ];

  // Call DeepSeek with streaming
  let upstream;
  try {
    upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-v4-pro',
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to reach AI service', detail: String(e) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    return new Response(JSON.stringify({ error: 'AI service error', status: upstream.status, detail: text.slice(0, 500) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Forward SSE stream as-is
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
