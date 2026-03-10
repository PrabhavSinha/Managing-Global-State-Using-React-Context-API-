import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  if (isLoggedIn) { navigate('/profile'); return null; }

  const handle = (e) => {
    e.preventDefault();
    if (!name.trim()) { setErr('Please enter a name.'); return; }
    login(name.trim());
    navigate('/profile');
  };

  return (
    <div className="page page-anim login-page">
      <div className="login-card">
        <p className="page-label">AuthContext · useContext</p>
        <h1 className="login-title">Login</h1>
        <p className="login-sub">Logging in updates AuthContext. All consumers (Navbar, Profile, Shop) reflect the change instantly.</p>
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input className={`field-input ${err ? 'input-err' : ''}`} placeholder="Enter your name..."
            value={name} onChange={e => { setName(e.target.value); setErr(''); }} />
          {err && <span className="field-err">{err}</span>}
          <button type="submit" className="btn-accent full">Login →</button>
        </form>
        <p className="login-note">Simulated login — any name works.</p>
      </div>
    </div>
  );
}
