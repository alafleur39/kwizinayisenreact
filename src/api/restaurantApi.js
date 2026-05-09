const API_BASE_URL = "http://localhost:5050/api";
const GUEST_ID_KEY = "kwizin_guest_id";
// this file serves as the api layer to connect frontend and backend
// RESTFUL API
function checkResponse(response, errorMessage) { // we are checking the response from the server
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export function getCartMenuItemId(item) { // we getting the ID of the menu item in the cart
  return item.menuItemId || item._id || item.id;
}

export function formatCartItems(items) { // we are formatting cart items
  return items.map((item) => ({ // we are creating a new object with the formatted cart item data
    menuItemId: getCartMenuItemId(item),
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));
}

export function getGuestId() { // we are getting the guest ID
  const savedGuestId = localStorage.getItem(GUEST_ID_KEY);

  if (savedGuestId) { // if there is a saved guest ID, return it
    return savedGuestId;
  }

  const newGuestId = crypto.randomUUID(); // otherwise, generate a new guest ID
  localStorage.setItem(GUEST_ID_KEY, newGuestId); // store the new guest ID in local storage
  return newGuestId; 
}

export async function getMenuItems() { // we are fetching the menu items from the server
  const response = await fetch(`${API_BASE_URL}/menu`); // we are fetching the menu items from the server
  return checkResponse(response, "Could not load menu items from the server.");
}

export async function getCart(guestId) { // we are fetching the cart from the server
  const response = await fetch(`${API_BASE_URL}/cart/${guestId}`); // we are fetching the cart from the server
  return checkResponse(response, "Could not load cart from the server."); 
} // we are fetching the cart from the server

export async function updateCart(guestId, items) { // we are updating the cart on the server
  const response = await fetch(`${API_BASE_URL}/cart/${guestId}`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: formatCartItems(items),
    }),
  });

  return checkResponse(response, "Could not update cart on the server."); 
} 

export async function clearCart(guestId) { // we use a delete method in the backend for clearing the cart
  const response = await fetch(`${API_BASE_URL}/cart/${guestId}`, {
    method: "DELETE",
  });

  return checkResponse(response, "Could not clear cart on the server.");
}

export async function placeOrder(orderData) { //  Place an order should be a post request
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return checkResponse(response, "Could not place order.");
}
