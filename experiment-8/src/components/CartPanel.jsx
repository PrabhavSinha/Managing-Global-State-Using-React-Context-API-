import React from 'react';
import { useCart } from '../context/CartContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from './RenderBox';

/**
 * CartPanel — only subscribes to CartContext.
 * Theme or auth changes do NOT cause this to re-render.
 */
export default function CartPanel() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clearCart } = useCart();
  const renders = useRenderCount('CartPanel');

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">🛒 Cart Context</h3>
        <RenderBox name="CartPanel" count={renders} contexts={['CartContext']}
          note="Only re-renders on cart changes" />
      </div>

      <div className="panel-body">
        {items.length === 0 ? (
          <p className="muted-note">Cart is empty. Add items from the Shop page.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-row">
                  <img src={item.thumbnail} alt={item.title} className="cart-thumb" />
                  <div className="cart-info">
                    <p className="cart-title">{item.title}</p>
                    <p className="cart-price">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                  <div className="qty-ctrl">
                    <button onClick={() => decrement(item.id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <span className="cart-total">{totalItems} items · <strong>${totalPrice.toFixed(2)}</strong></span>
              <button className="btn-ghost sm" onClick={clearCart}>Clear</button>
            </div>
          </>
        )}

        <div className="context-state">
          <p className="cs-label">Context Value (summary)</p>
          <pre>{JSON.stringify({ totalItems, totalPrice: totalPrice.toFixed(2), itemIds: items.map(i => i.id) }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
