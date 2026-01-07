import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

// PAGES
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import Home from "./pages/Shop/Home";

// PROTECTED ROUTE COMPONENT (The Bouncer)
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // If not admin, kick them to login page
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC: Customers can see this */}
        <Route path="/" element={<Home />} />

        {/* PUBLIC: Login Page */}
        <Route path="/login" element={<Login />} />

        {/* PRIVATE: Only Rahul Bhaiya can see this */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
