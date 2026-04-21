import React, { useState } from "react"; // we are importing the react library and the usestate hook for state management

function Navbar() { // this is the navbar component that will be used to navigate through the different sections of our website
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Kwizin Ayisyen Lafleur Logo" />
          <span>Kwizin Ayisyen Lafleur</span>
        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
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
// 1. We are using the useState hook to manage the state of the menu (open or closed).
// 2. We have a hamburger menu that toggles the state of the menu when clicked.
// 3. The navigation links are conditionally rendered based on the state of the menu (active class is added when menu is open).
// 4. The logo is displayed on the left side of the navbar, and the navigation links are displayed on the right side.
export default Navbar;