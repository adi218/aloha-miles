import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days

export default async function handler(req, res) {
  const urlObj = new URL(req.url, process.env.APP_URL);
  const code = urlObj.searchParams.get("code");
  const error = urlObj.searchParams.get("error");

  if (error || !code) {
    res.writeHead(302, { Location: "/?error=strava_denied" });
    return res.end();
  }

  const tokenRes = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });

  const data = await tokenRes.json();

  if (!data.access_token) {
    res.writeHead(302, { Location: "/?error=token_exchange_failed" });
    return res.end();
  }

  // Only allow the configured athlete
  if (String(data.athlete.id) !== process.env.STRAVA_ATHLETE_ID) {
    res.writeHead(403);
    res.end("Access denied.");
    return;
  }

  const sessionId = randomUUID();
  await redis.set(
    `session:${sessionId}`,
    {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      athlete: {
        id: data.athlete.id,
        firstname: data.athlete.firstname,
        lastname: data.athlete.lastname,
        profile: data.athlete.profile_medium,
      },
    },
    { ex: SESSION_TTL }
  );

  const isSecure = process.env.NODE_ENV !== "development";
  const cookie = [
    `sid=${sessionId}`,
    "HttpOnly",
    isSecure ? "Secure" : "",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${SESSION_TTL}`,
  ].filter(Boolean).join("; ");

  res.writeHead(302, { "Set-Cookie": cookie, Location: "/" });
  res.end();
}
