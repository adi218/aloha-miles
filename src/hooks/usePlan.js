import { useState, useEffect } from "react";

export function usePlan(user) {
  const [plan, setPlan] = useState(undefined); // undefined = loading

  useEffect(() => {
    if (!user) { setPlan(null); return; }
    fetch("/api/plan")
      .then(r => r.ok ? r.json() : null)
      .then(setPlan)
      .catch(() => setPlan(null));
  }, [user]);

  async function savePlan(updated) {
    await fetch("/api/plan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setPlan(updated);
  }

  return { plan, loading: user && plan === undefined, savePlan };
}
