export const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://arihant-backend.onrender.com/api"; // You will get this URL after backend deploy
