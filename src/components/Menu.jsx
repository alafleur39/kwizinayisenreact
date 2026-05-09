import React, { useEffect, useState } from "react";
import { getMenuItems } from "../api/restaurantApi";
import { getImagePath } from "../utils/getImagePath";

function Menu({ addToCart }) { // The Menu component is responsible for displaying the restaurant's menu items and allowing customers to add items to their shopping cart. It receives the addToCart function as a prop from the App component, which allows it to update the cart state when a customer adds an item.
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMenuItems() {
      try {
        const items = await getMenuItems();

        // MongoDB uses _id. The cart already expects id, so we keep that shape here.
        const formattedItems = items.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));

        setMenuItems(formattedItems);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenuItems();
  }, []);

  function getMenuImage(image) {
    if (!image) {
      return "";
    }

    if (image.startsWith("http") || image.startsWith("/")) {
      return image;
    }

    return getImagePath(image);
  }

  return (
    <section className="menu" id="menu">
      <h1>Our Menu</h1>

      {loading && <p>Loading menu...</p>}
      {error && <p>{error}</p>}

      <div className="menu-container">
        {menuItems.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={getMenuImage(item.image)} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>${item.price}</span>
            <button
              className="add-to-cart"
              onClick={() => addToCart(item)}
              type="button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
// 1. The Menu component renders the restaurant items from the menuData array.
// 2. The shared addToCart function is passed in from App so the cart state stays connected across pages.
// 3. Each menu card displays the image, name, description, price, and an "Add to Cart" button.
// 4. Clicking "Add to Cart" sends the selected item back to App so the cart quantity can update.
// 5. The menu page stays focused on browsing dishes while the navbar still shows the live cart count.
// 6. The cart is now shown on its own page, while the menu still uses the shared cart functions passed down from App.
// april 22nd 2026 i updated the menu component so it still works with the shared cart state
// while the shopping cart is now accessed from its own navbar page. 
