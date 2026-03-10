import React from 'react';
import { Link } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import ThemePanel from '../components/ThemePanel';
import CartPanel from '../components/CartPanel';
import { useRenderCount } from '../hooks/useRenderCount';

/**
 * Home — renders all three context panels.
 * Notice: updating only the cart re-renders CartPanel + Navbar,
 * but NOT AuthPanel or ThemePanel.
 */
export default function Home() {
  const renders = useRenderCount('Home');

  return (
    <div className="page page-anim">
      <div className="page-header">
        <div>
          <p className="page-label">Experiment 8 · Week 8</p>
          <h1 className="page-title">React Context API</h1>
          <p className="page-sub">Three independent contexts. Each panel only re-renders when its own context changes.</p>
        </div>
        <div className="home-render-pill">
          <span className="render-pill warm">⚡ Home rendered {renders}×</span>
        </div>
      </div>

      <div className="concept-strip">
        {[
          { icon: '🏗️', title: 'createContext',    desc: 'Creates a context object with a default value' },
          { icon: '📦', title: 'Provider',          desc: 'Wraps the tree, supplies the context value to all children' },
          { icon: '🪝', title: 'useContext',         desc: 'Hook that subscribes a component to a context' },
          { icon: '⚡', title: 'Re-renders',         desc: 'Only consumers of a changed context re-render' },
          { icon: '🧩', title: 'Multiple Contexts',  desc: 'Auth, Theme and Cart update fully independently' },
        ].map(c => (
          <div key={c.title} className="concept-card">
            <span className="concept-icon">{c.icon}</span>
            <strong>{c.title}</strong>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Live Context Panels</h2>
      <p className="section-sub">Each panel shows its render count. Change one context — watch <em>only that panel</em> increment.</p>

      <div className="panels-grid">
        <AuthPanel />
        <ThemePanel />
        <CartPanel />
      </div>

      <div className="cta-row">
        <Link to="/shop" className="btn-accent">Go to Shop →</Link>
        <Link to="/renders" className="btn-ghost">View Re-render Demo →</Link>
      </div>
    </div>
  );
}
