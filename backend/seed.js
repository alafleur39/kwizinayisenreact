const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("./models/MenuItem");
// filling out the mongodb database with our menu items
// seeding the database with initial data
dotenv.config();

const menuItems = [ // list of menu items
  {
    name: "Griot",
    price: 10,
    category: "Entrees",
    image: "images/griot-recipe.jpg.webp",
    description: "Crispy fried pork served with pikliz.",
    available: true,
  },
  {
    name: "Tassot Cabrit",
    price: 13,
    category: "Entrees",
    image: "images/tassot-de-cabrit.jpg",
    description: "Seasoned fried goat with Haitian spices.",
    available: true,
  },
  {
    name: "Banan Peze",
    price: 13,
    category: "Sides",
    image: "images/bananpeze.jpg",
    description: "Seasoned fried plantains served with your meat of choice.",
    available: true,
  },
  {
    name: "Legume",
    price: 11,
    category: "Entrees",
    image: "images/legume.jpeg.webp",
    description: "Traditional vegetable stew with beef.",
    available: true,
  },
  {
    name: "Diri ak Djon Djon",
    price: 12,
    category: "Rice",
    image: "images/diridjondjon.jpg",
    description: "Black mushroom rice specialty.",
    available: true,
  },
  {
    name: "Pâté Kòde",
    price: 12,
    category: "Appetizers",
    image: "images/PateKode.jpg.webp",
    description: "Traditional Haitian meat pâté served inside fried dough.",
    available: true,
  },
];

async function seedMenu() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Create backend/.env before running the seed.");
    } // check if MONGO_URI is available

    await mongoose.connect(process.env.MONGO_URI); // connect to MongoDB
    console.log("Connected to MongoDB");

    await MenuItem.deleteMany({}); // delete all existing menu items
    await MenuItem.insertMany(menuItems); // insert the new 