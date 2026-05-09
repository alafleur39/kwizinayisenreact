const express = require("express"); 
const MenuItem = require("../models/MenuItem");

const router = express.Router(); // create a router innstance from express

// GET /api/menu - read all menu items from MongoDB.
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ createdAt: 1 }); // find all menu items and sort them by creation date
    res.json(menuItems); // send the menu items as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Could not load menu items.", error: error.message }); // json response
  }
});

// POST /api/menu - create a new menu item.
router.post("/", async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: "Could not create menu item.", error: error.message });
  }
});

// PUT /api/menu/:id - update one menu item by MongoDB id.
router.put("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: "Could not update menu item.", error: error.message });
  }
});

// DELETE /api/menu/:id - delete one menu item by MongoDB id.
router.delete("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.json({ message: "Menu item deleted.", menuItem });
  } catch (error) {
    res.status(400).json({ message: "Could not delete menu item.", error: error.message });
  }
});

module.exports = router;
// Kwamme Baffour taught me that we use JSON for communication between the client and server.