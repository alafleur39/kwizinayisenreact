
import React from "react";
import menuData from "../data/menuData";
import Cart from "./Cart";

function Menu({ cartItems, addToCart, removeFromCart, clearCart }) {
  return (
    <section className="menu" id="menu">
      <h1>Our Menu</h1>

      <div className="menu-container">
        {menuData.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>${item.price}</span>
            <button
              className="add-to-cart"
              onClick={() => addToCart(item)}
              type="button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </section>
  );
}

export default Menu;
// 1. The Menu component uses the useState hook to manage the state of the cart items.
// 2. The addToCart function checks if the item is already in the cart. If it is, it updates the quantity; if not, it adds the item to the cart with a quantity of 1.
// 3. The removeFromCart function removes an item from the cart based on its id.
// 4. The clearCart function empties the cart by setting the cartItems state to an empty array.
// 5. The component renders a list of menu items using the menuData array, displaying each item's image, name, description, price, and an "Add to Cart" button.
// 6. The Cart component is rendered at the bottom of the menu section, receiving the current cart items and functions to manage the cart as props.
// april 22nd 2026 i updated the menu component to include the cart component and 
// pass down the necessary props for managing the cart state. 
// This allows users to see their cart items and manage them directly from the menu page.