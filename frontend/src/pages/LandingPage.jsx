import { DollarSign } from 'lucide-react';

export default function LandingPage({}) {
  return (
    <div style={{ background: '#0f172a', color: '#e2e8f0', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid #1d2545' }}>
        <h1 style={{ fontSize: 1.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <DollarSign size={24} />
          CashFlowly
        </h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="#49mo" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}>Pricing</a>
          <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}>Features</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, color: '#fff' }}>
          Never run out of cash
        </h2>
        <p style={{ fontSize: 20, color: '#94a3b8', maxWidth: 600, margin: '0 auto 2rem' }}>
          CashFlowly connects to your bank accounts and accounting software, predicts your cash position 90 days out, alerts you before cash gaps, and suggests when to draw on a credit line.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40 }}>
          <button style={{ padding: '12px 32px', background: '#3d82f6', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 16 }}>
            Start Free Trial
          </button>
          <button style={{ padding: '12px 32px', background: 'transparent', border: '1px solid #2a335a', borderRadius: 12, color: '#e2e8f0', cursor: 'pointer', fontSize: 16 }}>
            Sign In
          </button>
        </div>

        {/* Pricing */}
        <div id="49mo" style={{ marginTop: 60, textAlign: 'center' }}>
          <h3 style={{ fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Simple, Transparent Pricing</h3>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            <div style={{ background: '#141c30', borderRadius: 16, padding: '2rem', border: '1px solid #2a335a', width: 320 }}>
              <h4 style={{ fontSize: 24, color: '#fff', marginBottom: 8 }}>Free</h4>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>30-day trial, no credit card required</p>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#94a3b8', fontSize: 14 }}>
                <li style={{ padding: '8px 0' }}>90-day cash flow forecast</li>
                <li style={{ padding: '8px 0' }}>Alerts on cash gaps</li>
                <li style={{ padding: '8px 0' }}>Weekly email reports</li>
              </ul>
            </div>

            <div style={{ background: '#1d2545', borderRadius: 16, padding: '2rem', border: '1px solid #3d82f6', width: 320 }}>
              <h4 style={{ fontSize: 24, color: '#fff', marginBottom: 8 }}>Premium — $49/mo</h4>
              <p style={{ color: '#a4bff0', fontSize: 14, marginBottom: 16 }}>Best value for small businesses</p>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#94a3b8', fontSize: 14 }}>
                <li style={{ padding: '8px 0' }}>Everything in Free</li>
                <li style={{ padding: '8px 0' }}>Credit line recommendations</li>
                <li style={{ padding: '8px 0' }}>Bank account syncing</li>
                <li style={{ padding: '8px 0' }}>Accounting software integration</li>
                <li style={{ padding: '8px 0' }}>Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{ marginTop: 60, textAlign: 'center' }}>
          <h3 style={{ fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Everything you need to stay ahead</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid #2a335a' }}>
              <p style={{ fontWeight: 600 }}>📍 90-Day Forecast</p>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Predict your cash position three months ahead with AI-driven analytics.</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid #2a335a' }}>
              <p style={{ fontWeight: 600 }}>💡 Cash Gap Alerts</p>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Get notified before you hit red. Never miss a potential shortfall.</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid #2a335a' }}>
              <p style={{ fontWeight: 600 }}>🏥 Credit Line Suggestions</p>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Learn when to draw on a credit line to cover gaps without over-borrowing.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 60, padding: '2rem', borderTop: '1px solid #1d2545', color: '#94a3b8', fontSize: 14 }}>
          © 2025 CashFlowly. All rights reserved.
        </div>
      </div>
    </div>
  )
}
