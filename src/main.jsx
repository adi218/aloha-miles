import React from 'react'
import ReactDOM from 'react-dom/client'
import MarathonPlan from './MarathonPlan.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import { useAuth } from './hooks/useAuth.js'

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#7070a0", fontFamily: "monospace", fontSize: 12, letterSpacing: "0.2em" }}>LOADING...</div>
    </div>
  );

  if (!user) return <LoginScreen />;

  return <MarathonPlan user={user} onLogout={logout} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
