const API_BASE_URL = "http://localhost:5050/api";
const GUEST_ID_KEY = "kwizin_guest_id";
// this file serves as the api layer to connect frontend and backend
function checkResponse(response, errorMessage) { // we are checking the response from the server
  if (!respon