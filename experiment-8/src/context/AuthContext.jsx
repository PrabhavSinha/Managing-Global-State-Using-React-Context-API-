import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * AuthContext — Context #1
 * Manages user login/logout state globally.
 * Any component that calls useAuth() gets live access to isLoggedIn & user.
 * When login/logout is called anywhere, ALL consumers re-render.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((name) => {
    setUser({ name, email: `${name.toLowerCase().replace(' ', '.')}@example.com`, role: 'member' });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = {
    user,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
