import React, { useEffect, useState } from "react";
import axios from "axios";
import "./menuGrid.css"; 

export default function MenuGrid({ selectedCategory }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
}, []);


  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="menu-loading">
        <p>Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-error">
        <p>{error}</p>
      </div>
    );
  }


  const addToCart = (item) => {
    // cart logic here
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
