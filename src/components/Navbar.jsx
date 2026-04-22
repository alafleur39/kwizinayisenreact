
// 1. We are using the useState hook to manage the state of the menu (open or closed).
// 2. We have a hamburger menu that toggles the state of the menu when clicked.
// 3. The navigation links are conditionally rendered based on the state of the menu (active class is added when menu is open).
// 4. The logo is displayed on the left side of the navbar, and the navigation links are displayed on the right side
// 5. professor requested a cart icon that shows the number of items in the cart

import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // we are importing the shopping cart icon from the react-icons library to use in our navbar component

function Navbar({ cartCount }) { // we initlized a div with the class name "cart icon" that contains the shopping cart icon  and a span element that displays the number of items in the cart
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Kwizin Ayisyen Lafleur Logo" />
          <span>Kwizin Ayisyen Lafleur</span>
        </div>

        <div className="nav-right">
         <a href="#menu" className="cart-icon">
  <FaShoppingCart /> 
       </a>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;