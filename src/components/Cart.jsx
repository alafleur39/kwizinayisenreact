import React from "react";
import { Link } from "react-router-dom"; 

function Cart({ cartItems, removeFromCart, clearCart }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <div className="cart-section">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/menu" className="btn cart-link-button">
              Browse the Menu
            </Link>
          </div>
        ) : (
          <>
            <div id="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>
                      ${item.price} × {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <h3>
                Total: $<span>{total.toFixed(2)}</span>
              </h3>

              <button id="clear-cart" type="button" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
//1. The Cart component receives three props: cartItems (an array of items in the cart), removeFromCart (a function to remove an item from the cart), and clearCart (a function to clear all items from the cart).
//2. The total cost of the items in the cart is calculated using the reduce method, which sums up the price of each item multiplied by its quantity.
//3. The component conditionally renders either a message indicating that the cart is empty or a list of cart items along with their details (name, price, quantity, and total price for that item).
//4. Each cart item includes a "Remove" button that calls the removeFromCart function with the item's id when clicked.
//5. If there are items in the cart, the total cost is displayed along with a "Clear Cart" button that calls the clearCart function when clicked.
