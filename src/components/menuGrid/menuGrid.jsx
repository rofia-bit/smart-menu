import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart as HeartIcon } from "lucide-react";
import "./menuGrid.css"; 

export default function MenuGrid({ selectedCategory }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // favorites persisted locally
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fav_items") || "[]");
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      try { localStorage.setItem("fav_items", JSON.stringify(next)); } catch {
        // Ignore localStorage errors
      }
      return next;
    });
  };

  const fetchMenu = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8000/api/menu-items/") 
      .then((response) => {
        console.log("API response:", response.data);  
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMenu();
  }, []);


  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="menu-loading" aria-busy="true">
        <div className="loading-box">
          <div className="spinner" role="img" aria-label="Loading"></div>
          <div className="loading-text">
            <strong>Loading menu...</strong>
            <div className="loading-sub">Fetching fresh items for you</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-error">
        <div className="error-box" role="alert">
          <svg className="error-icon" viewBox="0 0 24 24" width="36" height="36" aria-hidden>
            <circle cx="12" cy="12" r="10" fill="#fee2e2"></circle>
            <path d="M12 7v6" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 16h.01" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <div className="error-text">
            <strong>Could not load menu</strong>
            <div className="error-sub">Check your connection or try again.</div>
            <div className="error-actions">
              <button className="retry-btn" onClick={fetchMenu}>Retry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  const addToCart = (item) => {
    // cart logic here if u want (not necessary for now)
    alert(`${item.name} added to cart!`);
  };

  return (
    <section className="menu-section">
      <header className="menu-header">
        <h2>Our Menu</h2>
        <p>Choose your favorite</p>
      </header>

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <article key={item.item_id} className="menu-card">
            {/* favorite heart (bottom-left) */}
            <button
              className={`fav-btn ${favorites.includes(item.item_id) ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); toggleFavorite(item.item_id); }}
              aria-pressed={favorites.includes(item.item_id)}
              title={favorites.includes(item.item_id) ? "Remove favorite" : "Add to favorites"}
            >
              <HeartIcon />
            </button>

            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="menu-card-image"
              />
            ) : (
              <div className="menu-card-placeholder hidden">No Image</div>
            )}

            <div className="menu-card-body">
              <h3>{item.name}</h3>
              <p className="menu-desc">{item.description}</p>
              <p className="menu-price">${item.price}</p>
              <button onClick={() => addToCart(item)} className="add-btn">
                Add to Cart
              </button>
            </div>
          </article>

        ))}
      </div>
    </section>
  );
}
