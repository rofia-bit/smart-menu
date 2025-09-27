import React, { useEffect, useState } from "react";
import './assets/fonts/style.css'
import CategoryBar from "./components/categoryBar/categoryBar";
import MenuGrid from "./components/menuGrid/menuGrid";
import CartButton from "./components/Cart/cartbutton";
import Header from "./components/header/header";
import LoginSidebar from "./components/Login/loginSide";
// import "./i18n";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [coins] = useState(0);

  // persisted simple username
  const [user, setUser] = useState(() => {
    return localStorage.getItem("sm_username") || null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("sm_username", user);
    else localStorage.removeItem("sm_username");
  }, [user]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // UPDATED: accept tokens from LoginForm and persist them
  const handleLogin = ({ username, access, refresh }) => {
    // persist username
    setUser(username);

    // store tokens for api interceptor
    if (access) localStorage.setItem("access_token", access);
    if (refresh) localStorage.setItem("refresh_token", refresh);

    // sidebar open so the questionnaire prompt can show
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
  };

  return (
    <div>
      <Header
        coins={coins}
        user={user}
        onAvatarClick={() => setIsLoginOpen(true)}
        onLogoClick={() => console.log("Logo clicked -> go home")}
        onLogout={handleLogout}
      />

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <MenuGrid selectedCategory={selectedCategory} addToCart={addToCart} />

      <CartButton itemCount={cartItems.length} />

      {/* Login : receives user + handlers */}
      <LoginSidebar
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}
