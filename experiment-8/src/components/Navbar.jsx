import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useRenderCount } from '../hooks/useRenderCount';

/**
 * Navbar — consumes ALL THREE contexts.
 * Re-renders whenever auth, theme, OR cart changes.
 * The render count badge makes this visible.
 */
export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { mode, toggleMode, accent, accentInfo } = useTheme();
  const { totalItems } = useCart();
  const renders = useRenderCount('Navbar');

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <span className="brand-mark" />
        <span>Context<strong>Lab</strong></span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/"        end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
        <NavLink to="/shop"       className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Shop</NavLink>
        <NavLink to="/cart"       className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>
        <NavLink to="/profile"    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Profile</NavLink>
        <NavLink to="/renders"    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Re-renders</NavLink>
      </div>

      <div className="nav-right">
        <button className="icon-btn" onClick={toggleMode} title="Toggle theme">
          {mode === 'dark' ? '☀️' : '🌙'}
        </button>
        {isLoggedIn
          ? <button className="btn-ghost sm" onClick={logout}>Logout ({user.name})</button>
          : <NavLink to="/login" className="btn-accent sm">Login</NavLink>
        }
        <span className="render-pill" title="Navbar render count">⚡{renders}</span>
      </div>
    </nav>
  );
}
