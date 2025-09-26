import React, { useState } from "react";
import CategoryBar from "./components/categoryBar/categoryBar";
import MenuGrid from "./components/menuGrid/menuGrid";
import CartButton from "./components/Cart/cartButton";
import Header from "./components/header/header";
import LoginSidebar from "./components/Login/loginSide";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [coins] = useState(0); 

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div>
      <Header 
        coins={coins} 
        onAvatarClick={() => setIsLoginOpen(true)} // <-- Open drawer
        onLogoClick={() => console.log("Logo clicked -> go home")}
      />

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <MenuGrid selectedCategory={selectedCategory} addToCart={addToCart} />

      <CartButton itemCount={cartItems.length} />

      {/* Login sidebar */}
      <LoginSidebar isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
