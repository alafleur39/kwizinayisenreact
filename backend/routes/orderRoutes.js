const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

function cleanOrderItems(items = []) { // we are cleaning the order items
  return items.map((item) => ({ // we are creating a new object with the cleaned order item data
    menuItemId: item.menuItemId,
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));
} 

function calculateTotal(items = []) { // we are calculating the total cost of the order
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Number(total.toFixed(2));
} 

// GET /api/orders  read all orders.
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Could not load orders.", error: error.message });
  }
});

// POST /api/orders create a customer order.
router.post("/", async (req, res) => {
  try {
    const items = cleanOrderItems(req.body.items || []);

    if (items.length === 0) {
      return res.status(400).json({ message: "Order must include at least one item." });
    }

    // Recalculate total on the server so the database is not trusting browser math.
    const total = calculateTotal(items);

    const order = await Order.create({
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      items,
      total,
      status: req.body.status,
    });

    if (req.body.guestId) {
      await Cart.findOneAndDelete({ guestId: req.body.guestId });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Could not create order.", error: error.message });
  }
});

// PUT /api/orders/:id update order information or status.
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.guestId;

    if (Array.isArray(req.body.items)) {
      updateData.items = cleanOrderItems(req.body.items);
      updateData.total = calculateTotal(updateData.items);
    }

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Could not update order.", error: error.message });
  }
});

// DELETE /api/orders/:id  delete one order.
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id); // delete the order by its ID

    if (!order) { // if the order is not found
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({ message: "Order deleted.", order }); // json response
  } catch (error) {
    res.status(400).json({ message: "Could not delete order.", error: error.message }); // json response
  }
});

module.exports = router;
