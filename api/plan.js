import { redis } from "./_lib/redis.js";
import { getSession, sendUnauthorized } from "./_lib/session.js";
import { defaultPlan } from "../src/data/defaults.js";

export default async function handler(req, res) {
  const session = await getSession(req);
  if (!session) return sendUnauthorized(res);

  const key = `plan:${session.athlete.id}`;

  if (req.method === "GET") {
    let plan = await redis.get(key);

    if (!plan) {
      // Seed with the default template on first visit
      plan = defaultPlan;
      await redis.set(key, plan);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(plan));
  }

  if (req.method === "PUT") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const plan = JSON.parse(Buffer.concat(chunks).toString());

    await redis.set(key, plan);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true }));
  }

  res.writeHead(405);
  res.end();
}
