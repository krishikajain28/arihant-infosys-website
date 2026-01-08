import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// PAGES
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import Home from "./pages/Shop/Home";
import About from "./pages/Shop/About";
import Contact from "./pages/Shop/Contact";
import ProductDetails from "./pages/Shop/ProductDetails";

// components
import ScrollToTop from "./components/ScrollToTop";

// PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* PRIVATE ADMIN ROUTES */}
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
