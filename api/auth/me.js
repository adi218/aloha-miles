import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "").split(";")
      .map(c => c.trim().split("="))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k.trim(), v.join("=").trim()])
  );
}

async function refreshStravaToken(session) {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: session.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  return res.json();
}

export default async function handler(req, res) {
  const { sid } = parseCookies(req);

  if (!sid) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not authenticated" }));
  }

  let session = await redis.get(`session:${sid}`);

  if (!session) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Session expired" }));
  }

  // Refresh Strava token if it expires within 5 minutes
  if (Date.now() / 1000 > session.expires_at - 300) {
    const refreshed = await refreshStravaToken(session);
    if (!refreshed.access_token) {
      await redis.del(`session:${sid}`);
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Token refresh failed" }));
    }
    session = { ...session, access_token: refreshed.access_token, refresh_token: refreshed.refresh_token, expires_at: refreshed.expires_at };
    await redis.set(`session:${sid}`, session, { ex: 60 * 60 * 24 * 30 });
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ athlete: session.athlete }));
}
