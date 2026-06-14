import { redis } from "./redis.js";

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "").split(";")
      .map(c => c.trim().split("="))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k.trim(), v.join("=").trim()])
  );
}

export async function getSession(req) {
  const { sid } = parseCookies(req);
  if (!sid) return null;
  return redis.get(`session:${sid}`);
}

export function sendUnauthorized(res) {
  res.writeHead(401, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Unauthorized" }));
}
