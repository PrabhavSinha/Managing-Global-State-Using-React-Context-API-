import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme, ACCENT_KEYS } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from '../components/RenderBox';

/** ---- Isolated consumer components ---- */

// Subscribes to AuthContext ONLY
function AuthOnly() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const renders = useRenderCount('AuthOnly');
  return (
    <div className="demo-card">
      <RenderBox name="AuthOnly" count={renders} contexts={['AuthContext']} />
      <p className="demo-state">{isLoggedIn ? `👤 ${user.name}` : 'Not logged in'}</p>
      {isLoggedIn
        ? <button className="btn-ghost sm" onClick={logout}>Logout</button>
        : <button className="btn-accent sm" onClick={() => login('Demo User')}>Quick Login</button>
      }
    </div>
  );
}

// Subscribes to ThemeContext ONLY
function ThemeOnly() {
  const { mode, accent, toggleMode, setAccent, allAccents } = useTheme();
  const renders = useRenderCount('ThemeOnly');
  return (
    <div className="demo-card">
      <RenderBox name="ThemeOnly" count={renders} contexts={['ThemeContext']} />
      <p className="demo-state">Mode: {mode} · Accent: {allAccents[accent].name}</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="btn-ghost sm" onClick={toggleMode}>Toggle Mode</button>
        {ACCENT_KEYS.map(k => (
          <button key={k} className={`swatch ${accent === k ? 'active' : ''}`}
            style={{ background: allAccents[k].primary }}
            onClick={() => setAccent(k)} />
        ))}
      </div>
    </div>
  );
}

// Subscribes to CartContext ONLY
function CartOnly() {
  const { totalItems, totalPrice, addItem, clearCart } = useCart();
  const renders = useRenderCount('CartOnly');
  const dummyItem = { id: 999, title: 'Demo Item', price: 9.99, thumbnail: '' };
  return (
    <div className="demo-card">
      <RenderBox name="CartOnly" count={renders} contexts={['CartContext']} />
      <p className="demo-state">{totalItems} items · ${totalPrice.toFixed(2)}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-accent sm" onClick={() => addItem(dummyItem)}>Add Item</button>
        <button className="btn-ghost sm" onClick={clearCart}>Clear</button>
      </div>
    </div>
  );
}

// Subscribes to ALL THREE
function AllContexts() {
  const { isLoggedIn } = useAuth();
  const { mode } = useTheme();
  const { totalItems } = useCart();
  const renders = useRenderCount('AllContexts');
  return (
    <div className="demo-card highlight">
      <RenderBox name="AllContexts" count={renders} contexts={['AuthContext', 'ThemeContext', 'CartContext']}
        note="Re-renders on ANY context change" />
      <p className="demo-state">auth:{isLoggedIn ? '✓' : '✗'} · mode:{mode} · cart:{totalItems}</p>
    </div>
  );
}

// Subscribes to NONE — pure display
function NoContext() {
  const renders = useRenderCount('NoContext');
  return (
    <div className="demo-card">
      <RenderBox name="NoContext" count={renders} contexts={[]}
        note="Uses no context — never re-renders from context changes" />
      <p className="demo-state">Static component</p>
    </div>
  );
}

/** ---- Page ---- */
export default function RendersDemo() {
  const renders = useRenderCount('RendersDemo');

  return (
    <div className="page page-anim">
      <div className="page-header">
        <div>
          <p className="page-label">Re-rendering Behaviour</p>
          <h1 className="page-title">Context Re-renders</h1>
          <p className="page-sub">
            Each box shows how many times it has rendered. Interact with the controls
            and watch <em>only the relevant subscribers</em> increment.
          </p>
        </div>
        <RenderBox name="RendersDemo (page)" count={renders} contexts={[]} note="Page itself uses no context" />
      </div>

      <div className="concept-strip sm">
        <div className="concept-card sm">
          <strong>Key insight</strong>
          <p>A component only re-renders when the specific context it subscribes to changes — not when other unrelated contexts update.</p>
        </div>
        <div className="concept-card sm">
          <strong>Prop drilling vs Context</strong>
          <p>Without Context, every intermediate parent would re-render too. Context lets consumers subscribe directly.</p>
        </div>
        <div className="concept-card sm">
          <strong>Multiple Contexts</strong>
          <p>Auth, Theme, Cart are three separate context trees. Their updates are fully independent.</p>
        </div>
      </div>

      <h2 className="section-title">Component Subscribers</h2>
      <p className="section-sub">Use the controls inside each card. Watch which other cards increment — and which don't.</p>

      <div className="demo-grid">
        <AuthOnly />
        <ThemeOnly />
        <CartOnly />
        <AllContexts />
        <NoContext />
      </div>

      <div className="re-render-legend">
        <p>Render count colour guide:</p>
        <span className="render-pill cool">1–2 Cool</span>
        <span className="render-pill warm">3–5 Warm</span>
        <span className="render-pill hot">6+ Hot</span>
      </div>
    </div>
  );
}
