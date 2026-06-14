import { redis } from "../_lib/redis.js";
import { getSession, sendUnauthorized } from "../_lib/session.js";

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
  // Re-read the raw session so we can refresh the token if needed
  const { sid } = Object.fromEntries(
    (req.headers.cookie || "").split(";")
      .map(c => c.trim().split("="))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k.trim(), v.join("=").trim()])
  );

  if (!sid) return sendUnauthorized(res);

  let session = await redis.get(`session:${sid}`);
  if (!session) return sendUnauthorized(res);

  // Refresh Strava token if expiring within 5 minutes
  if (Date.now() / 1000 > session.expires_at - 300) {
    const refreshed = await refreshStravaToken(session);
    if (!refreshed.access_token) {
      await redis.del(`session:${sid}`);
      return sendUnauthorized(res);
    }
    session = { ...session, access_token: refreshed.access_token, refresh_token: refreshed.refresh_token, expires_at: refreshed.expires_at };
    await redis.set(`session:${sid}`, session, { ex: 60 * 60 * 24 * 30 });
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ athlete: session.athlete }));
}
