import React, { useRef } from "react";
import "./categoryBar.css"; 
import { ChevronLeft, ChevronRight } from "lucide-react"; 

import dessertSVG from "../../assets/dessert.svg";
import seadfoodSVG from "../../assets/seafood.svg";
import chickenSVG from "../../assets/chicken.svg";
import Drinks from "../../assets/Drinks.svg";
import HotDrinksSVG from "../../assets/HotDrinks.svg";
import gelatoSVG from "../../assets/gelato.svg";
import bakerySVG from "../../assets/bakery.svg";
import piazzaSVG from "../../assets/piazza.svg";

const categories = [
  { name: "Pizzas", icon: piazzaSVG },
  { name: "For you", icon: chickenSVG },
  { name: "Salads", icon: seadfoodSVG },
  { name: "Desserts", icon: dessertSVG },
  { name: "Drinks", icon: Drinks },
  { name: "Hot Drinks", icon: HotDrinksSVG },
  { name: "Gelato", icon: gelatoSVG },
  { name: "Bakery", icon: bakerySVG },
];

const CategoryBar = ({ selectedCategory, onCategoryChange }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const scrollAmount = 200; 
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="category-bar">
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <ChevronLeft size={24} />
      </button>

      <div className="category-container" ref={containerRef}>
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`category-item ${
              selectedCategory === category.name ? "active" : ""
            }`}
          >
            <img
              src={category.icon}
              alt={category.name}
              className="category-icon"
            />
            <span className="category-label">{category.name}</span>
          </div>
        ))}
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CategoryBar;
