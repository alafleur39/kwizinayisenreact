
// 1. We are using the useState hook to manage the state of the menu (open or closed).
// 2. We have a hamburger menu that toggles the state of the menu when clicked.
// 3. The navigation links are conditionally rendered based on the state of the menu (active class is added when menu is open).
// 4. The logo is displayed on the left side of the navbar, and the navigation links are displayed on the right side
// 5. professor requested a cart icon that shows the number of items in the cart

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"; // (Andy) Navlink is special version of the link component that will help with multi page behavior navigation
import { FaShoppingCart } from "react-icons/fa"; // we are importing the shopping cart icon from the react-icons library to use in our navbar component
import { getImagePath } from "../utils/getImagePath"; // we are importing the getImagePath function from our utils folder to help us get the correct path for our logo image in the navbar component
 
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Gallery", path: "/gallery" },
];

function Navbar({ cartCount, currentPath }) { // we initlized a div with the class name "cart icon" that contains the shopping cart icon  and a span element that displays the number of items in the cart
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  function getLinkClass(isActive, extraClass = "") {
    const classes = [];

    if (extraClass) {
      classes.push(extraClass);
    }

    if (isActive) {
      classes.push("active-link");
    }

    return classes.join(" ");
  }

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img
            src={getImagePath("images/logo.png")}
            alt="Kwizin Ayisyen Lafleur Logo"
          />
          <span>Kwizin Ayisyen Lafleur</span>
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => getLinkClass(isActive, "cart-icon")}
              onClick={() => setMenuOpen(false)}
              aria-label={`Shopping cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <FaShoppingCart />
              <span className="cart-count">{cartCount}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
