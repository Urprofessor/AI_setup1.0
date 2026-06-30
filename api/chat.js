// /api/chat.js — DeepSeek proxy with streaming
// Deployed as a Vercel Edge Function. Reads DEEPSEEK_API_KEY from env vars.

export const config = {
  runtime: 'edge',
};

const QA_SYSTEM_PROMPT = `You are CozyAI, the helpful Q&A assistant inside the Momcozy app for the Air One wearable breast pump.

Your role:
- Help moms set up, clean, assemble, troubleshoot, and use the Air One.
- Give answers about pumping technique, flange size, milk storage, and general lactation support.
- Be warm, supportive, and concise. Keep replies to 3-5 short sentences unless the user asks for more detail.
- Use plain language, no medical jargon unless asked.

Important boundaries:
- You are NOT a doctor or lactation consultant. Add a brief reminder to consult a professional when the question is medical (pain, blood, infection, baby health, medication, mental health).
- If the question is clearly outside the Momcozy / lactation / parenting context (e.g. coding, finance, politics), gently steer back: "I'm here to help with your Air One and pumping journey — is there something I can help with there?"
- Never recommend a specific medication, dosage, or treatment plan.

Handoff to a human agent:
- If the user describes a damaged/defective device, wants a refund or replacement, is filing a complaint, reports a possible medical emergency, or repeatedly says you are not helping them, append the exact tag [[HANDOFF]] to the very end of your reply (after your normal answer, on its own, no extra text around it).
- Only use [[HANDOFF]] when truly warranted — do not use it for routine how-to questions.

Tone: kind, calm, encouraging. Reply in the same language the user writes in (English or 中文).`;

const SUPPORT_SYSTEM_PROMPT = `You are Cozy Agent, simulating a human Momcozy customer support agent inside the Air One app (this is a simulated handoff — there is no live human on the other end yet).

Your role:
- Pick up where CozyAI left off for issues it could not resolve: damaged/defective items, refunds/replacements, complaints, order issues, or sensitive situations.
- Be empathetic, professional, and solution-oriented. Ask for order number or specifics if needed. Offer concrete next steps (e.g. replacement process, escalation, contact channel: support@momcozy.com).
- Keep replies concise (3-6 sentences).

Exit condition:
- Once the user's issue is resolved, they confirm they're satisfied, or they explicitly want to go back to general questions, append the exact tag [[EXIT_HANDOFF]] to the very end of your reply.
- Do not use [[EXIT_HANDOFF]] while the issue is still open.

Tone: warm, professional, reassuring. Reply in the same language the user writes in (English or 中文).`;

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

  // Prepend system prompt based on persona
  const persona = body.persona === 'support' ? 'support' : 'qa';
  const systemPrompt = persona === 'support' ? SUPPORT_SYSTEM_PROMPT : QA_SYSTEM_PROMPT;
  const messages = [
    { role: 'system', content: systemPrompt },
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
