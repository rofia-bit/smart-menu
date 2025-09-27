import React from "react";
import "./Login.css";

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Login</h2>
        <form className="modal-form">
          <input
            type="tel"
            placeholder="Phone Number"
            className="modal-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="modal-input"
          />
          <button type="submit" className="modal-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
