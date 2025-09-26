import React from "react";
import "./navbar.css";

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🍕 PizzaApp</div>

      <div className="navbar-actions">
        <button className="navbar-btn" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
