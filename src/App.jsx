// (Andy) the beauty of React is that we can break down our UI into reusable components, making it easier to manage and maintain our code. 
// Each component can be developed and tested independently, 
// which promotes better code organization and reusability.

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() { // we are moving cart state and related functions to the App component so that they can be passed down to both the Navbar and Cart components as props, allowing for better state management and communication between components.
  const [cartItems, setCartItems] = useState([]); // we are using the useState hook to manage the state of our cart items, which is initially an empty array
  const [notification, setNotification] = useState("");

  function addToCart(item) { // this functions handles the logic for adding items to the cart.
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setNotification(`${item.name} added to cart!`);

    setTimeout(() => {
      setNotification("");
    }, 2000);
  }

  function removeFromCart(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount} />

      {notification && (
        <div className="cart-notification">{notification}</div>
      )}

      <Hero />
      <Menu
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}

export default App;