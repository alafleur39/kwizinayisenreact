const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5050;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Allow the Vite frontend to make requests to this API.
app.use(cors({ origin: CLIENT_URL }));

// Allow Express to read JSON request bodies.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kwizin Ayisyen Lafleur API is running.");
});

app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Create backend/.env before starting the server.");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      // Fail faster during class demos instead of looking frozen for a long time.
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to 