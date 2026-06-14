import React from 'react'
import ReactDOM from 'react-dom/client'
import MarathonPlan from './MarathonPlan.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import { useAuth } from './hooks/useAuth.js'
import { usePlan } from './hooks/usePlan.js'

function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#7070a0", fontFamily: "monospace", fontSize: 12, letterSpacing: "0.2em" }}>LOADING...</div>
    </div>
  );
}

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const { plan, loading: planLoading, savePlan } = usePlan(user);

  if (authLoading || planLoading) return <Loading />;
  if (!user) return <LoginScreen />;
  return <MarathonPlan plan={plan} user={user} onLogout={logout} onSavePlan={savePlan} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
