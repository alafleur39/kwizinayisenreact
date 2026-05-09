import React, { useState } from "react";
import { Link } from "react-router-dom"; 

function Cart({ cartItems, removeFromCart, clearCart, onPlaceOrder }) { // 
  const [customerName, setCustomerName] = useState(""); // (Andy) Initialize the customer name state
  const [customerEmail, setCustomerEmail] = useState(""); // (Andy) Initialize the customer email state
  const [isSubmitting, setIsSubmitting] = useState(false); // (Andy) Initialize the submitting state
  const [orderMessage, setOrderMessage] = useState(""); // (Andy) Initialize the order message state
  const [errorMessage, setErrorMessage] = useState("");

  const total = cartItems.reduce( //  (Andy) the total cost of the items in the cart is calculated using the reduce method, which sums up the price of each item multiplied by its quantity.
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isPlaceOrderDisabled = // (Andy) The place order button is disabled if the cart is empty, the customer name is empty, or the form is submitting.
    cartItems.length === 0 || customerName.trim() === "" || isSubmitting;

  async function handleSubmit(event) { // (Andy) Handle the form submission
    event.preventDefault();

    if (isPlaceOrderDisabled) {
      return;
    }

    setIsSubmitting(true); // (Andy) Set the submitting state to true
    setOrderMessage("");
    setErrorMessage("");

    try {
      await onPlaceOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
      });

      setCustomerName("");
      setCustomerEmail("");
      setOrderMessage("Order placed successfully!");
    } catch {
      setErrorMessage("Could not place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Checkout</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="checkout-name">
              Customer Name
            </label>
            <input
              id="checkout-name"
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="checkout-email">
              Customer Email
            </label>
            <input
              id="checkout-email"
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
            />
          </div>

          {orderMessage && <p className="order-success">{orderMessage}</p>}
          {errorMessage && <p className="order-error">{errorMessage}</p>}

          <button type="submit" disabled={isPlaceOrderDisabled}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </section>
  ); 
} // (Andy) The Cart component

export default Cart;
//1. The Cart component receives three props: cartItems (an array of items in the cart), removeFromCart (a function to remove an item from the cart), and clearCart (a function to clear all items from the cart).
//2. The total cost of the items in the cart is calculated using the reduce method, which sums up the price of each item multiplied by its quantity.
//3. The component conditionally renders either a message indicating that the cart is empty or a list of cart items along with their details (name, price, quantity, and total price for that item).
//4. Each cart item includes a "Remove" button that calls the removeFromCart function with the item's id when clicked.
//5. If there are items in the cart, the total cost is displayed along with a "Clear Cart" button that calls the clearCart function when clicked.
