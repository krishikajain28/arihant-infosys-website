// client/src/config.js

// Check if the browser is running on localhost
const isLocal = window.location.hostname === "localhost";

// Export the API URL based on the environment
export const API_URL = isLocal
  ? "http://localhost:5000/api"
  : "https://arihant-backend.onrender.com/api"; // We will generate this URL on Render later
