import React, { useState } from "react";
import { UserRoundCheck, ShoppingBag, ChevronDown, ChevronUp, Phone } from "lucide-react";
import "./Login.css";   

const sections = [
  {
    title: "Account Info",
    icon: <UserRoundCheck />,
    items: [
      "Profile",
      "Coins & rewards",
      "Delete Account",
    ],
  },
  {
    title: "My Orders",
    icon: <ShoppingBag />,
    items: [
      "Order History",
      "Upcoming Orders",
    ],
  },
  {
    title: "Support",
    icon: <Phone />,
    items: [
      "+213 ---------",
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
                <span className="arrow">
                  {openSections.includes(idx)
                    ? <ChevronUp size={18} color="#f97316" />
                    : <ChevronDown size={18} color="#f97316" />}
                </span>
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
       
      </div>
      <div className="sidebar-language">
        <label htmlFor="language-select" style={{ marginRight: 8, fontWeight: 500 }}>Language:</label>
        <select id="language-select" style={{ padding: "4px 8px", borderRadius: 6 }}>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
  );
}
