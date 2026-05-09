const express = require("express"); 
const Cart = require("../models/Cart");

const router = express.Router(); // create a router instance from express

function cleanCartItems(items = []) { // clean the cart items
  return items.map((item) => ({ // map each item to a new object with the desired properties
    menuItemId: item.menuItemId,
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));
}

function calculateTotal(items = []) { // calculate the total cost of the cart items
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Number(total.toFixed(2));
}

// GET /api/cart/:guestId - read one guest cart.
router.get("/:guestId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ guestId: req.params.guestId }); // find the cart for the given guest ID

    if (!cart) {
      return res.json({ guestId: req.params.guestId, items: [], total: 0 }); // return an empty cart if not found
    }

    res.json(cart); // send the cart as a JSON response
  } catch (error) { // catch any errors that occur
    res.status(500).json({ message: "Could not load cart.", error: error.message }); // json response
  }
});

// PUT /api/cart/:guestId - save or replace one guest cart.
router.put("/:guestId", async (req, res) => {
  try {
    const items = cleanCartItems(req.body.items || []);
    const total = calculateTotal(items);

    const cart = await Cart.findOneAndUpdate(
      { guestId: req.params.guestId },
      { guestId: req.params.guestId, items, total },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: "Could not save cart.", error: error.message });
  }
});

// DELETE /api/cart/:guestId - clear/delete one guest cart.
router.delete("/:guestId", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ guestId: req.params.guestId });
    res.json({ message: "Cart cleared.", guestId: req.params.guestId });
  } catch (error) {
    res.status(500).json({ message: "Could not clear cart.", error: error.message });
  }
});

module.exports = router;
