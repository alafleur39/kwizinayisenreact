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
const allowedOrigins = [
  "http://localhost:5173",
  "https://alafleur39.github.io",
  process.env.CLIENT_URL,
].filter(Boolean);

// Allow local Vite and deployed GitHub Pages frontend to call this API.
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // enabled cross origin resource sharing to accept our github pages frontend

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
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Kwizin Ayisyen Lafleur API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
