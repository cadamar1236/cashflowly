import { useState, useEffect, useMemo } from 'react'

// Dummy data functions - in a real app these would call an API
const generateMockData = () => {
  const now = new Date()
  const balance = 87420.32
  const days = {}
  let runningBalance = balance
  for (let i = 0; i < 90; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() + i)
    const key = d.getMonth() + '/' + d.getDate()
    // Weekends have no transactions
    if (d.getDay() === 0 || d.getDay() === 6) {
      days[key] = { predicted: runningBalance, events: [] }
      continue
    }
    const income = Math.round((Math.random() * 2000 + 500) * 100) / 100
    const outgoing = Math.round((Math.random() * 1200 + 400) * 100) / 100
    runningBalance = Math.round((runningBalance + income - outgoing) * 100) / 100
    days[key] = { predicted: runningBalance, events: [] }
  }
  return { balance, days }
}

export default function Dashboard({ user, onLogout }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateMockData())
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const summary = useMemo(() => {
    if (!(data ?? null)) return null
    const allDays = Object.values(data.days ?? {})
    const today = allDays[0] ?? {}
    const last = allDays[allDays.length - 1] ?? {}
    const min = Math.min(...allDays.map(d => d.predicted).slice(0, 7))
    const range = [{
      label: 'Current',
      value: data.balance,
      delta: 0
    }, {
      label: '7-day low',
      value: min,
      delta: Math.round((min - data.balance) / data.balance * 100 * 10) / 10
    }, {
      label: '90-day outlook',
      value: last.predicted,
      delta: Math.round((last.predicted - data.balance) / data.balance * 100 * 10) / 10
    }]
    return range
  }, [data])

  const gapAlerts = useMemo(() => {
    if (!(data ?? null)) return []
    const alerts = []
    const entries = Object.entries(data.days ?? {})
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i]
      if (value.predicted < 5000) {
        alerts.push({ day: key, balance: value.predicted, severity: value.predicted < 0 ? 'critical' : 'warning' })
      }
    }
    return alerts.slice(0, 3)
  }, [data])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#94a3b8' }}>
      <span style={{ animation: 'spin 1s linear infinite', fontSize: 48 }}>⚠️</span>
      <p style={{ marginLeft: 12, fontSize: 18 }}>Loading your financial data...</p>
    </div>
  )

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid #1d2545' }}>
        <h1 style={{ fontSize: 1.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <b>CashFlowly</b>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#94a3b8', fontSize: 14 }}>{user.name || user.email}</span>
          <button onClick={onLogout} style={{ padding: '6px 16px', borderRadius: 8, border: '1px solid #2a335a', background: 'transparent', color: '#e2e8f0', cursor: 'pointer', fontSize: 14 }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #1d2545, #0f172a)', borderRadius: 16, padding: '2rem', marginBottom: 24, border: '1px solid #2a335a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>$</span>
            <span style={{ color: '#94a3b8', fontSize: 14 }}>CURRENT CASH POSITION</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: '#fff' }}>
              ${data ?? null ? data.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
            {((summary ?? [])).map((item, i) => (
              <div key={i} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 600, margin: '4px 0' }}>
                  ${item.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: item.delta >= 0 ? '#22c55e' : '#ef4444' }}>
                  {item.delta >= 0 ? '\u2191' : '\u2193'}
                  {item.delta}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#141c30', borderRadius: 16, padding: '2rem', marginBottom: 24, border: '1px solid #2a335a' }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>⚎</span>
            90-Day Cash Flow Forecast
          </h3>
          <div style={{ display: 'flex', gap: 4, height: 150, alignItems: 'flex-end', padding: '0 4px' }}>
            {(((data ?? null) ? Object.values(data.days ?? {}) : [])).slice(0, 90).map((day, i) => {
              const h = Math.max(Math.abs(day.predicted) / 500, 3)
              const isNegative = day.predicted < 0
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                  <div style={{
                    height: `${Math.min(h, 80)}px`,
                    width: '80%',
                    background: isNegative ? '#ef4444' : '#22c55e',
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.7
                  }} />
                  <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{i} / 90</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: '#141c30', borderRadius: 16, padding: '2rem', border: '1px solid #2a335a' }}>
            <h3 style={{ marginBottom: 16, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#ffb700', fontSize: 20 }}>⚠</span>
              Cash Gap Alerts
            </h3>
            {gapAlerts.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#22c55e' }}>
                <span style={{ fontSize: 24 }}>↑</span>
                <p>No cash gaps predicted in the next 90 days!</p>
              </div>
            ) : (
              (gapAlerts ?? []).map((alert, i) => {
                return (
                  <div key={i} style={{ padding: '12px', background: alert.severity === 'critical' ? 'rgba(239,68,68,0.1)' : 'rgba(255,183,0,0.1)', borderRadius: 8, marginBottom: 8, borderLeft: '4px solid ' + (alert.severity === 'critical' ? '#ef4444' : '#ffb700') }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Alert on {alert.day}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>Predicted balance: {alert.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                  </div>
                )
              })
            )}
          </div>

          <div style={{ background: '#141c30', borderRadius: 16, padding: '2rem', border: '1px solid #2a335a' }}>
            <h3 style={{ marginBottom: 16, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#3d82f6', fontSize: 20 }}>🏥</span>
              Credit Line Recommendations
            </h3>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 12, border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div>
                  <p style={{ fontSize: 14, color: '#a4bff0', fontWeight: 600 }}>Suggested Credit Line</p>
                  <p style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>$10,000 / month</p>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>
                    <span style={{ color: '#22c55e', fontWeight: 600 }}>save 5%</span> interest with Premium plan
                  </p>
                  <button style={{ padding: '8px 24px', background: '#3d82f6', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Apply Now</button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, color: '#94a3b8', fontSize: 12 }}>
              <p>Based on your current cash flow forecast, drawing $10,000/month on a preferred credit line would cover your projected gaps.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 24 }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid #2a335a', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ padding: '12px', borderRadius: 12, border: 'none', background: 'rgba(59,130,246,0.1)', cursor: 'pointer' }}>
              <span style={{ fontSize: 24 }}>👎</span>
            </button>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>Connect Bank Account</p>
              <p style={{ color: '#94a3b8', fontSize: 12 }}>Sync transactions automatically</p>
            </div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid #2a335a', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ padding: '12px', borderRadius: 12, border: 'none', background: 'rgba(255,183,0,0.1)', cursor: 'pointer' }}>
              <span style={{ fontSize: 24 }}>📻</span>
            </button>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>Update Forecast</p>
              <p style={{ color: '#94a3b8', fontSize: 12 }}>Review and adjust income/expenses</p>
            </div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid #2a335a', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ padding: '12px', borderRadius: 12, border: 'none', background: 'rgba(34,197,94,0.1)', cursor: 'pointer' }}>
              <span style={{ fontSize: 24 }}>↑</span>
            </button>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>Export Report</p>
              <p style={{ color: '#94a3b8', fontSize: 12 }}>Download as PDF or CSV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
