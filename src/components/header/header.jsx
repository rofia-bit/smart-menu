import React, { useState } from "react";
import Logo from '../../assets/Logo.png';
import { User, Coins } from "lucide-react";
import LoginModal from "../Login/Login";
import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="header">
        {/* Logo on left */}
        <div className="logo">
          <img src={Logo} alt="App Logo" className="logo-img" />
        </div>

        {/* Right side: coins + avatar */}
        <div className="right-side">
          <div className="coin-container">
            <Coins className="coin-icon" />
            <span className="coin-number">120</span>
          </div>
          <div className="avatar" onClick={() => setShowLogin(true)}>
            <User className="icon" />
          </div>
        </div>
      </header>

      {/* Login modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
