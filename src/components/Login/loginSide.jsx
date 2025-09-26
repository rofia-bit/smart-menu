import React, { useState } from "react";
import LoginForm from "./loginForm";
import "./Login.css";

export default function LoginSidebar({ isOpen, onClose }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (credentials) => {
    console.log("User logged in with:", credentials);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>{isLoggedIn ? "Welcome back!" : "Login"}</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="sidebar-content">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <div className="user-menu">
            <p>Hi, User</p>
            <ul>
              <li>Profile</li>
              <li>Order History</li>
              <li onClick={handleLogout} className="logout">
                Logout
              </li>
            </ul>
          </div>
        )}
        <div className="language-selector">
          <label htmlFor="language">Language:</label>
          <select id="language" name="language">
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Arabic</option>        
          </select>
        </div>
      </div>
    </div>
  );
}
