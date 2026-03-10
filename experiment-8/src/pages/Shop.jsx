import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRenderCount } from '../hooks/useRenderCount';
import RenderBox from '../components/RenderBox';

const cache = {};

export default function Shop() {
  const { addItem, items } = useCart();
  const { isLoggedIn } = useAuth();
  const renders = useRenderCount('Shop');

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [added, setAdded]       = useState({});

  useEffect(() => {
    let active = true;
    if (cache.data) { setProducts(cache.data); setLoading(false); return; }
    fetch('https://dummyjson.com/products?limit=12')
      .then(r => r.json())
      .then(d => { cache.data = d.products; if (active) { setProducts(d.products); setLoading(false); } })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const handleAdd = (product) => {
    addItem({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1200);
  };

  const inCart = (id) => items.some(i => i.id === id);

  return (
    <div className="page page-anim">
      <div className="page-header">
        <div>
          <p className="page-label">CartContext consumer</p>
          <h1 className="page-title">Shop</h1>
          <p className="page-sub">Adding to cart updates CartContext — only Cart consumers re-render.</p>
        </div>
        <RenderBox name="Shop" count={renders} contexts={['CartContext', 'AuthContext']}
          note="Re-renders on cart or auth change" />
      </div>

      {!isLoggedIn && (
        <div className="info-banner">
          💡 <Link to="/login">Log in</Link> to see your name in the cart. Auth state comes from AuthContext.
        </div>
      )}

      {loading ? (
        <div className="skel-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skel-tile">
              <div className="skel-img shimmer" />
              <div className="skel-body">
                <div className="skel-line shimmer" /><div className="skel-line short shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="shop-grid">
          {products.map(p => (
            <div key={p.id} className="shop-tile">
              <div className="tile-img"><img src={p.thumbnail} alt={p.title} loading="lazy" /></div>
              <div className="tile-body">
                <p className="tile-brand">{p.brand}</p>
                <h3 className="tile-title">{p.title}</h3>
                <p className="tile-price">${p.price}</p>
                <button
                  className={`add-btn ${inCart(p.id) ? 'in-cart' : ''} ${added[p.id] ? 'just-added' : ''}`}
                  onClick={() => handleAdd(p)}
                >
                  {added[p.id] ? '✓ Added!' : inCart(p.id) ? 'Add Again' : '+ Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
