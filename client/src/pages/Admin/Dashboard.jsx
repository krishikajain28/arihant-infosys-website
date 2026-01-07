import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";

// CORRECT IMPORTS (Moving up 2 folders to find components)
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

// LOCAL IMPORTS (Same folder)
import AdminStats from "./AdminStats";
import AddProductForm from "./AddProductForm";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const reversedData = response.data.reverse();
      setProducts(reversedData);
      setFilteredProducts(reversedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* NAVBAR: We reuse the main navbar, but here it acts as the Admin Header */}
      <Navbar onAddClick={() => setShowAddForm(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* ADMIN STATS SECTION */}
        <AdminStats products={products} onSearch={handleSearch} />

        {/* INVENTORY GRID */}
        {loading ? (
          <div className="text-center py-20">Loading Dashboard...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
            <FaBoxOpen className="text-6xl mx-auto mb-4 text-slate-600" />
            <p className="text-slate-500">Inventory is Empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-slate-900/80 transition-all flex justify-center items-center p-4">
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onProductAdded={fetchProducts}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
