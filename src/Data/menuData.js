const menuData = [
  {
    id: 1,
    name: "Griot",
    price: 10,
    image: "/images/griot-recipe.jpg.webp",
    description: "Crispy fried pork served with pikliz",
  },
  {
    id: 2,
    name: "Tassot Cabrit",
    price: 13,
    image: "/images/tassot-de-cabrit.jpg",
    description: "Seasoned fried goat with Haitian spices",
  },
  {
    id: 3,
    name: "Banan Peze",
    price: 13,
    image: "/images/bananpeze.jpg",
    description: "Seasoned fried plantains served with your meat of choice",
  },
  {
    id: 4,
    name: "Legume",
    price: 11,
    image: "/images/legume.jpeg.webp",
    description: "Traditional vegetable stew with beef",
  },
  {
    id: 5,
    name: "Diri ak Djon Djon",
    price: 12,
    image: "/images/diridjondjon.jpg",
    description: "Black mushroom rice specialty",
  },
  {
    id: 6,
    name: "Pâté Kòde",
    price: 12,
    image: "/images/PateKode.jpg.webp",
    description: "Traditional Haitian meat pâté served inside fried dough",
  },
  {
    id: 7,
    name: "Bouyon Bef",
    price: 12,
    image: "/images/bouyonbef.jpeg",
    description: "Traditional beef soup with vegetables",
  },
  {
    id: 8,
    name: "Diri Kole ak Pwa",
    price: 12,
    image: "/images/dirikole.jpg.jxl",
    description: "Traditional Haitian rice and beans served with meat of your choice",
  },
];

export default menuData;
// 1. The menuData array contains objects representing each menu item, with properties such as id, name, price, image, and description.
// 2. Each menu item has a unique id, a name, a price, an image URL, and a description of the dish.
// 3. This data is exported as the default export of the module, allowing it to be imported and used in other components like Menu.js) to display the menu items on the ui

