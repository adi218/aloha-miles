import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not authed

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => setUser(data?.athlete ?? null))
      .catch(() => setUser(null));
  }, []);

  function logout() {
    window.location.href = "/api/auth/logout";
  }

  return { user, loading: user === undefined, logout };
}
