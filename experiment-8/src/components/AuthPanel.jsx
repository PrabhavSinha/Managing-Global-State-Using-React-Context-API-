import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from './RenderBox';

/**
 * AuthPanel — only subscribes to AuthContext.
 * Theme or cart changes do NOT re-render this component.
 */
export default function AuthPanel() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const renders = useRenderCount('AuthPanel');
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim()) { login(name.trim()); setName(''); }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">🔐 Auth Context</h3>
        <RenderBox name="AuthPanel" count={renders} contexts={['AuthContext']}
          note="Only re-renders on auth changes" />
      </div>

      <div className="panel-body">
        {isLoggedIn ? (
          <div className="auth-user">
            <div className="avatar">{user.name[0].toUpperCase()}</div>
            <div>
              <p className="auth-name">{user.name}</p>
              <p className="auth-email">{user.email}</p>
              <p className="auth-role">Role: {user.role}</p>
            </div>
          </div>
        ) : (
          <p className="muted-note">Not logged in</p>
        )}

        <div className="auth-actions">
          {!isLoggedIn ? (
            <>
              <input
                className="field-input sm"
                placeholder="Enter your name..."
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
              <button className="btn-accent sm" onClick={handleLogin}>Login</button>
            </>
          ) : (
            <button className="btn-ghost sm" onClick={logout}>Logout</button>
          )}
        </div>

        <div className="context-state">
          <p className="cs-label">Context Value</p>
          <pre>{JSON.stringify({ isLoggedIn, user }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
