// (Andy) the beauty of React is that we can break down our UI into reusable components, making it easier to manage and maintain our code. 
// Each component can be developed and tested independently, 
// which promotes better code organization and reusability.

import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./App.css";

const routes = { // i created a routes object to centralize paths for multi page behavior
  home: "/",
  menu: "/menu", 
  about: "/about",
  gallery: "/gallery",
  contact: "/contact",
  cart: "/cart",
};

function App() { // we are moving cart state and related functions to the App component so that they can be passed down to both the Navbar and Cart components as props, allowing for better state management and communication between components.
  const [cartItems, setCartItems] = useState([]); // we are using the useState hook to manage the state of our cart items, which is initially an empty array
  const [notification, setNotification] = useState("");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setNotification("");
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [notification]);

  function addToCart(item) { // this functions handles the logic for adding items to the cart.
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });

    setNotification(`${item.name} added to cart!`);
  }

  function removeFromCart(id) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
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
      <Navbar cartCount={cartCount} currentPath={location.pathname} />

      {notification && (
        <div className="cart-notification" role="status" aria-live="polite">
          {notification}
        </div>
      )}

      <main className={location.pathname === routes.home ? "app-main" : "app-main inner-page"}>
        <Routes>
          <Route path={routes.home} element={<Hero />} />
          <Route path={routes.menu} element={<Menu addToCart={addToCart} />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.gallery} element={<Gallery />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route
            path={routes.cart}
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
