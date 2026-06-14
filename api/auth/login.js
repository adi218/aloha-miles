export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID,
    redirect_uri: `${process.env.APP_URL}/api/auth/callback`,
    response_type: "code",
    scope: "activity:read_all",
  });
  res.writeHead(302, { Location: `https://www.strava.com/oauth/authorize?${params}` });
  res.end();
}
