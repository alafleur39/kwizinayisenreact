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
import {
  clearCart as clearSavedCart,
  getCart,
  getGuestId,
  updateCart,
} from "./api/restaurantApi";
import "./App.css";

const routes = { // i created a routes object to centralize paths for multi page behavior
  home: "/",
  menu: "/menu", 
  about: "/about",
  gallery: "/gallery",
  contact: "/contact",
  cart: "/cart",
};

function normalizeCartItem(item) {
  const menuItemId = item.menuItemId || item._id || item.id;

  return {
    ...item,
    id: item.id || menuItemId,
    menuItemId,
    price: Number(item.price),
    quantity: Number(item.quantity) || 1,
  };
}

function App() { // we are moving cart state and related functions to the App component so that they can be passed down to both the Navbar and Cart components as props, allowing for better state management and communication between components.
  const [guestId] = useState(getGuestId);
  const [cartItems, setCartItems] = useState([]); // we are using the useState hook to manage the state of our cart items, which is initially an empty array
  const [notification, setNotification] = useState("");
  const location = useLocation();

  async function saveCartItems(items) {
    try {
      await updateCart(guestId, items);
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    let ignoreCartLoad = false;

    async function loadSavedCart() {
      try {
        const savedCart = await getCart(guestId);

        if (!ignoreCartLoad) {
          setCartItems((savedCart.items || []).map(normalizeCartItem));
        }
      } catch (error) {
        console.error("Could not load saved cart:", error);
      }
    }

    loadSavedCart();

    return () => {
      ignoreCartLoad = true;
    };
  }, [guestId]);

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
    const cartItem = normalizeCartItem(item);
    const existingItem = cartItems.find(
      (currentItem) => currentItem.id === cartItem.id
    );

    const nextCartItems = existingItem
      ? cartItems.map((currentItem) =>
          currentItem.id === cartItem.id
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem
        )
      : [...cartItems, cartItem];

    setCartItems(nextCartItems);
    saveCartItems(nextCartItems);

    setNotification(`${item.name} added to cart!`);
  }

  function removeFromCart(id) {
    const nextCartItems = cartItems.filter((item) => item.id !== id);

    setCartItems(nextCartItems);
    saveCartItems(nextCartItems);
  }

  function clearCart() {
    setCartItems([]);
    clearSavedCart(guestId).catch((error) => {
      console.error("Could not clear saved cart:", error);
    });
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
