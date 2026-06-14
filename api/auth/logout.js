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

export default async function handler(req, res) {
  const { sid } = parseCookies(req);
  if (sid) await redis.del(`session:${sid}`);

  const isSecure = process.env.NODE_ENV !== "development";
  const cookie = [
    "sid=",
    "HttpOnly",
    isSecure ? "Secure" : "",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=0",
  ].filter(Boolean).join("; ");

  res.writeHead(302, { "Set-Cookie": cookie, Location: "/" });
  res.end();
}
