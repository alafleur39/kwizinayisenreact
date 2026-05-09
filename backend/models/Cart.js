const mongoose = require("mongoose"); // Prof. Baffour taught that mongoose is where we initlize our schemas
// what data structure is the schema for the Cart model? it is a Mongoose schema that defines the structure of a cart document.
const cartItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    // guestId lets us save a cart before adding user accounts or login.
    guestId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
