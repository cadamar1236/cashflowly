import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './Dashboard';

function getDashboardData() {
  return Promise.resolve({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactions: []
  });
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('nc_user') || 'null');
      return (u && typeof u.email === 'string' && u.email) ? u : null;
    } catch { return null; }
  });

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getDashboardData(user.id)
        .then(data => setDashboardData(data))
        .catch(() => setDashboardData(null))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) return (
    <LandingPage
      onSignup={u => { localStorage.setItem('nc_user', JSON.stringify(u)); setUser(u); }}
      onLogin={u => { localStorage.setItem('nc_user', JSON.stringify(u)); setUser(u); }}
    />
  );

  return <Dashboard user={user} dashboardData={dashboardData} loading={loading} onLogout={() => { localStorage.removeItem('nc_user'); setUser(null); }} />;
}

export default App;