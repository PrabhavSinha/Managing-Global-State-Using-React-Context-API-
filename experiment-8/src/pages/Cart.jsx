import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from '../components/RenderBox';

export default function Cart() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const renders = useRenderCount('Cart');

  return (
    <div className="page page-anim">
      <div className="page-header">
        <div>
          <p className="page-label">CartContext consumer</p>
          <h1 className="page-title">Cart {totalItems > 0 && `(${totalItems})`}</h1>
          {user && <p className="page-sub">Logged in as <strong>{user.name}</strong> — from AuthContext</p>}
        </div>
        <RenderBox name="Cart Page" count={renders} contexts={['CartContext', 'AuthContext']}
          note="Re-renders on cart or auth change" />
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <span>🛒</span>
          <p>Your cart is empty</p>
          <Link to="/shop" className="btn-accent">Browse Shop</Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <div className="cart-list">
            {items.map(item => (
              <div key={item.id} className="cart-item-row">
                <img src={item.thumbnail} alt={item.title} className="cart-img" />
                <div className="ci-info">
                  <h3 className="ci-title">{item.title}</h3>
                  <p className="ci-unit">${item.price} each</p>
                </div>
                <div className="qty-ctrl lg">
                  <button onClick={() => decrement(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increment(item.id)}>+</button>
                </div>
                <p className="ci-subtotal">${(item.price * item.qty).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Items</span><span>{totalItems}</span></div>
            <div className="summary-row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="summary-row total"><span>Total</span><strong>${totalPrice.toFixed(2)}</strong></div>
            <button className="btn-accent full">Checkout</button>
            <button className="btn-ghost full" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
