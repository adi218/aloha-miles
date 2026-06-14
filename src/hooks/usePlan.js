import { useState, useEffect } from "react";

export function usePlan(user) {
  const [plan, setPlan] = useState(undefined);

  useEffect(() => {
    if (user === undefined) return; // auth still resolving — don't touch plan state
    if (!user) { setPlan(null); return; } // not logged in

    setPlan(undefined); // reset to loading state before fetch
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

  return { plan, loading: !!user && plan === undefined, savePlan };
}
