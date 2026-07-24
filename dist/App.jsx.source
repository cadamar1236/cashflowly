import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('nc_user') || 'null');
      return (u && typeof u.email === 'string' && u.email) ? u : null;
    } catch { return null; }
  });

  if (!user) return (
    <LandingPage
      onSignup={u => { localStorage.setItem('nc_user', JSON.stringify(u)); setUser(u); }}
      onLogin={u => { localStorage.setItem('nc_user', JSON.stringify(u)); setUser(u); }}
    />
  );

  return <Dashboard user={user} onLogout={() => { localStorage.removeItem('nc_user'); setUser(null); }} />;
}

export default App