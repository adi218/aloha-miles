import { getSession, sendUnauthorized } from "./_lib/session.js";

export default async function handler(req, res) {
  const session = await getSession(req);
  if (!session) return sendUnauthorized(res);

  const stravaRes = await fetch(
    "https://www.strava.com/api/v3/athlete/activities?per_page=100",
    { headers: { Authorization: `Bearer ${session.access_token}` } }
  );

  if (!stravaRes.ok) {
    res.writeHead(502, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Strava API error" }));
  }

  const raw = await stravaRes.json();

  const activities = raw.map(a => ({
    id: a.id,
    name: a.name,
    type: a.type,
    start_date: a.start_date,
    distance: a.distance,
    moving_time: a.moving_time,
    total_elevation_gain: a.total_elevation_gain,
    average_heartrate: a.average_heartrate,
    average_speed: a.average_speed,
  }));

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(activities));
}
