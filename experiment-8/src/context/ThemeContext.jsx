import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ThemeContext — Context #2
 * Controls dark/light mode AND accent colour across the whole app.
 * CSS variables are written directly onto :root so every element
 * responds without needing to re-render.
 *
 * Consumers that call useTheme() re-render when mode or accent changes.
 * Components that only READ CSS variables (via styles) don't re-render at all.
 */
const ThemeContext = createContext(null);

const ACCENTS = {
  violet: { primary: '#7c6dfa', light: '#a89eff', name: 'Violet' },
  emerald: { primary: '#34d399', light: '#6ee7b7', name: 'Emerald' },
  rose:   { primary: '#fb7185', light: '#fda4af', name: 'Rose'   },
  amber:  { primary: '#fbbf24', light: '#fcd34d', name: 'Amber'  },
  sky:    { primary: '#38bdf8', light: '#7dd3fc', name: 'Sky'    },
};

export const ACCENT_KEYS = Object.keys(ACCENTS);

function applyTheme(mode, accentKey) {
  const root = document.documentElement;
  const accent = ACCENTS[accentKey] || ACCENTS.violet;

  if (mode === 'light') {
    root.style.setProperty('--bg',         '#f5f5f7');
    root.style.setProperty('--surface',    '#ffffff');
    root.style.setProperty('--surface2',   '#ebebef');
    root.style.setProperty('--border',     '#d8d8e0');
    root.style.setProperty('--text',       '#111118');
    root.style.setProperty('--text-muted', '#5a5a6a');
    root.style.setProperty('--text-dim',   '#9a9aaa');
  } else {
    root.style.setProperty('--bg',         '#08090a');
    root.style.setProperty('--surface',    '#111214');
    root.style.setProperty('--surface2',   '#1a1b1f');
    root.style.setProperty('--border',     '#252629');
    root.style.setProperty('--text',       '#eeeef2');
    root.style.setProperty('--text-muted', '#7a7a8c');
    root.style.setProperty('--text-dim',   '#44444f');
  }

  root.style.setProperty('--accent',       accent.primary);
  root.style.setProperty('--accent-light', accent.light);
}

export function ThemeProvider({ children }) {
  const [mode, setMode]     = useState('dark');
  const [accent, setAccent] = useState('violet');

  // Apply to DOM whenever either value changes
  useEffect(() => { applyTheme(mode, accent); }, [mode, accent]);

  const toggleMode = () => setMode(m => m === 'dark' ? 'light' : 'dark');

  const value = {
    mode, accent,
    accentInfo: ACCENTS[accent],
    allAccents: ACCENTS,
    toggleMode,
    setAccent,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
