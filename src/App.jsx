import React, { useState } from "react";
import './assets/fonts/style.css'
import CategoryBar from "./components/categoryBar/categoryBar";
import MenuGrid from "./components/menuGrid/menuGrid";
import CartButton from "./components/Cart/cartButton";
import Header from './components/header/header'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div>
      
      <Header/>

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <MenuGrid selectedCategory={selectedCategory} addToCart={addToCart} />

      <CartButton itemCount={cartItems.length} />
    </div>
  );
}
