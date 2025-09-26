import React, { useState } from "react";
import "./Login.css";   

const sections = [
  {
    title: "Account Info",
    icon: "👤",
    items: [
      "Profile",
      "Rewards History",
      "Payment Methods",
      "Delete Account",
    ],
  },
  {
    title: "My Orders",
    icon: "🧾",
    items: [
      "Order History",
      "Upcoming Orders",
    ],
  },
  {
    title: "Find a Restaurant",
    icon: "📍",
    items: [],
  },
  {
    title: "Support",
    icon: "📞",
    items: [
      "Visit Support",
      "FAQs",
    ],
  },
];

export default function LoginSidebar({ isOpen, onClose }) {
  const [openSections, setOpenSections] = useState([0, 1, 3]); // Default open

  const toggleSection = idx => {
    setOpenSections(openSections =>
      openSections.includes(idx)
        ? openSections.filter(i => i !== idx)
        : [...openSections, idx]
    );
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Hi, rofla!</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="sidebar-content">
        {sections.map((section, idx) => (
          <div key={section.title} className="sidebar-section">
            <div
              className="section-title"
              onClick={() => toggleSection(idx)}
              style={{ cursor: section.items.length ? "pointer" : "default" }}
            >
              <span className="section-icon">{section.icon}</span>
              {section.title}
              {section.items.length > 0 && (
                <span className="arrow">{openSections.includes(idx) ? "▲" : "▼"}</span>
              )}
            </div>
            {section.items.length > 0 && openSections.includes(idx) && (
              <ul className="section-list">
                {section.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="quick-links">
          <button>🍽️ Catering</button>
          <button>🎁 Gift Cards</button>
          <button>🏛️ Foundation</button>
        </div>

        <div className="legal-links">
          <a href="#">Legal Terms & Policies</a> | <a href="#">We're Hiring</a> | <a href="#">Nutrition & Allergen</a> | <a href="#">Foundation</a> | <a href="#">Open A Popeyes</a> | <a href="#">All Locations</a> | <a href="#">App Diagnostics</a>
        </div>

        <div className="sidebar-footer">
          <small>
            Product availability, prices, offers and discounts may vary from restaurant. Popeyes printed coupons not valid on online orders.
          </small>
        </div>
      </div>
    </div>
  );
}
