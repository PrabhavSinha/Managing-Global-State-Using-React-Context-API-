import React from 'react';
import { useTheme, ACCENT_KEYS } from '../context/ThemeContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from './RenderBox';

/**
 * ThemePanel — only subscribes to ThemeContext.
 * Changing the cart or auth state will NOT re-render this component.
 * Only theme changes trigger a re-render here.
 */
export default function ThemePanel() {
  const { mode, accent, allAccents, toggleMode, setAccent } = useTheme();
  const renders = useRenderCount('ThemePanel');

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">🎨 Theme Context</h3>
        <RenderBox name="ThemePanel" count={renders} contexts={['ThemeContext']}
          note="Only re-renders on theme changes" />
      </div>

      <div className="panel-body">
        <div className="setting-row">
          <span className="setting-label">Mode</span>
          <button className="toggle-btn" onClick={toggleMode}>
            <span className={`toggle-knob ${mode === 'light' ? 'right' : ''}`} />
            <span className="toggle-text">{mode === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
          </button>
        </div>

        <div className="setting-row col">
          <span className="setting-label">Accent Colour</span>
          <div className="accent-swatches">
            {ACCENT_KEYS.map(key => (
              <button
                key={key}
                className={`swatch ${accent === key ? 'active' : ''}`}
                style={{ background: allAccents[key].primary }}
                onClick={() => setAccent(key)}
                title={allAccents[key].name}
              />
            ))}
          </div>
        </div>

        <div className="context-state">
          <p className="cs-label">Context Value</p>
          <pre>{JSON.stringify({ mode, accent }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
