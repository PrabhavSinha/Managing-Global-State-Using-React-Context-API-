import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme, ACCENT_KEYS } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from '../components/RenderBox';

export default function Profile() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { mode, accent, allAccents, toggleMode, setAccent } = useTheme();
  const { totalItems, totalPrice } = useCart();
  const renders = useRenderCount('Profile');
  const [name, setName] = useState('');

  return (
    <div className="page page-anim">
      <div className="page-header">
        <div>
          <p className="page-label">AuthContext + ThemeContext + CartContext</p>
          <h1 className="page-title">Profile</h1>
          <p className="page-sub">This page consumes all 3 contexts — re-renders on any context change.</p>
        </div>
        <RenderBox name="Profile" count={renders} contexts={['AuthContext', 'ThemeContext', 'CartContext']}
          note="Consumes all 3 — re-renders most often" />
      </div>

      <div className="profile-grid">
        {/* Auth section */}
        <div className="profile-card">
          <h3 className="pc-title">🔐 Auth State</h3>
          <p className="pc-sub">From AuthContext</p>
          {isLoggedIn ? (
            <div className="profile-user">
              <div className="avatar lg">{user.name[0]}</div>
              <div>
                <p className="pu-name">{user.name}</p>
                <p className="pu-email">{user.email}</p>
                <span className="role-badge">{user.role}</span>
              </div>
              <button className="btn-ghost sm" style={{marginLeft:'auto'}} onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="login-inline">
              <p className="muted-note">Not logged in</p>
              <div className="inline-login">
                <input className="field-input sm" placeholder="Your name..." value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && name.trim() && (login(name.trim()), setName(''))} />
                <button className="btn-accent sm"
                  onClick={() => { if (name.trim()) { login(name.trim()); setName(''); } }}>Login</button>
              </div>
            </div>
          )}
        </div>

        {/* Theme section */}
        <div className="profile-card">
          <h3 className="pc-title">🎨 Theme State</h3>
          <p className="pc-sub">From ThemeContext</p>
          <div className="theme-inline">
            <div className="setting-row">
              <span className="setting-label">Mode: <strong>{mode}</strong></span>
              <button className="toggle-btn sm" onClick={toggleMode}>
                {mode === 'dark' ? '☀️ Switch Light' : '🌙 Switch Dark'}
              </button>
            </div>
            <div className="setting-row col" style={{marginTop:'12px'}}>
              <span className="setting-label">Accent: <strong>{allAccents[accent].name}</strong></span>
              <div className="accent-swatches">
                {ACCENT_KEYS.map(k => (
                  <button key={k} className={`swatch ${accent === k ? 'active' : ''}`}
                    style={{ background: allAccents[k].primary }}
                    onClick={() => setAccent(k)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cart summary */}
        <div className="profile-card">
          <h3 className="pc-title">🛒 Cart Summary</h3>
          <p className="pc-sub">From CartContext</p>
          <div className="cart-summary-sm">
            <div className="cs-stat"><span>Items</span><strong>{totalItems}</strong></div>
            <div className="cs-stat"><span>Total</span><strong>${totalPrice.toFixed(2)}</strong></div>
          </div>
          <Link to="/cart" className="btn-ghost sm" style={{marginTop:'12px',display:'inline-block'}}>View Cart →</Link>
        </div>
      </div>
    </div>
  );
}
