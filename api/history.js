// /api/history.js — CozyAI chat history, persisted in Upstash Redis (REST API)
// Reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN from env vars.
// Falls back to "no history" gracefully if Redis isn't configured yet.

export const config = {
  runtime: 'edge',
};

const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function redisConfigured() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function redisCommand(parts) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(`${url}/${parts.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Redis request failed: ' + res.status);
  return res.json();
}

function keyFor(deviceId) {
  return `cozyai:history:${deviceId}`;
}

export default async function handler(req) {
  const url = new URL(req.url);

  if (req.method === 'GET') {
    const deviceId = url.searchParams.get('deviceId');
    if (!deviceId) {
      return new Response(JSON.stringify({ error: 'Missing deviceId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!redisConfigured()) {
      return new Response(JSON.stringify({ messages: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    try {
      const data = await redisCommand(['GET', keyFor(deviceId)]);
      const messages = data && data.result ? JSON.parse(data.result) : [];
      return new Response(JSON.stringify({ messages }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ messages: [], error: String(e) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const { deviceId, messages } = body || {};
    if (!deviceId || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Missing deviceId or messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!redisConfigured()) {
      return new Response(JSON.stringify({ ok: true, persisted: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    try {
      await redisCommand(['SET', keyFor(deviceId), JSON.stringify(messages.slice(-100)), 'EX', String(TTL_SECONDS)]);
      return new Response(JSON.stringify({ ok: true, persisted: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: String(e) }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
