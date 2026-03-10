import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider }  from './context/CartContext';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import Shop         from './pages/Shop';
import Cart         from './pages/Cart';
import Profile      from './pages/Profile';
import RendersDemo  from './pages/RendersDemo';
import Login        from './pages/Login';
import './App.css';

/**
 * App — three Context Providers nested at the root.
 *
 * Provider order (outer → inner):
 *   ThemeProvider  → ThemeContext available everywhere
 *   AuthProvider   → AuthContext available everywhere
 *   CartProvider   → CartContext available everywhere
 *
 * Each Provider is independent:
 *  - Updating cart state ONLY re-renders CartContext consumers
 *  - Updating theme ONLY re-renders ThemeContext consumers
 *  - Updating auth ONLY re-renders AuthContext consumers
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/shop"    element={<Shop />} />
            <Route path="/cart"    element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/renders" element={<RendersDemo />} />
            <Route path="/login"   element={<Login />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
