export default function LoginScreen() {
  return (
    <div style={{
      minHeight: "100vh", background: "#1a1a2e",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <div style={{ color: "#f5a623", fontSize: 10, letterSpacing: "0.35em", fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" }}>
          Aloha Miles
        </div>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
          Honolulu Marathon 2026
        </h1>
        <p style={{ color: "#7070a0", fontSize: 14, margin: "0 0 40px" }}>
          Sign in with Strava to access your training plan.
        </p>
        <a href="/api/auth/login" style={{
          display: "inline-block",
          background: "#fc4c02",
          color: "#fff",
          padding: "14px 32px",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.05em",
          fontFamily: "monospace",
        }}>
          Connect with Strava
        </a>
      </div>
    </div>
  );
}
