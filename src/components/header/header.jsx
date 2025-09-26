import React from 'react'
import { User, Coins} from "lucide-react";
import Logo from '../../assets/Logo.png';
import './header.css';

const Header = () => {
  return (
     <header className="header">
      {/* Logo image on the far left */}
      <div className="logo">
        <img src={Logo} alt="App Logo" className="logo-img" />
      </div>

      {/* Right side: coins + avatar */}
      <div className="right-side">
        <div className="coin-container">
          <Coins className="coin-icon" />
          <span className="coin-number">120</span>
        </div>
        <div className="avatar">
          <User className="icon" />
        </div>
      </div>
    </header>
  );

}

export default Header;
