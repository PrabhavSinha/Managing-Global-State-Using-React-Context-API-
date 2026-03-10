import { useRef, useEffect } from 'react';

/**
 * useRenderCount — tracks how many times a component has rendered.
 * Used to demonstrate context re-rendering behaviour in the UI.
 *
 * When ThemeContext changes → only theme consumers increment.
 * When CartContext changes  → only cart consumers increment.
 * This makes independent context updates visible.
 */
export function useRenderCount(label) {
  const count = useRef(0);
  count.current += 1;

  // Log to console for devtools inspection
  useEffect(() => {
    console.log(`[Re-render] ${label} → #${count.current}`);
  });

  return count.current;
}
