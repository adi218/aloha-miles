import { redis } from "../_lib/redis.js";
import { getSession } from "../_lib/session.js";

export default async function handler(req, res) {
  const session = await getSession(req);
  const { sid } = Object.fromEntries(
    (req.headers.cookie || "").split(";")
      .map(c => c.trim().split("="))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k.trim(), v.join("=").trim()])
  );

  if (sid) await redis.del(`session:${sid}`);

  const isSecure = process.env.NODE_ENV !== "development";
  const cookie = ["sid=", "HttpOnly", isSecure ? "Secure" : "", "SameSite=Lax", "Path=/", "Max-Age=0"]
    .filter(Boolean).join("; ");

  res.writeHead(302, { "Set-Cookie": cookie, Location: "/" });
  res.end();
}
