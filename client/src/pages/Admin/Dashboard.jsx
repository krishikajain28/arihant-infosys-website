import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaClipboardList, FaLayerGroup } from "react-icons/fa";

// IMPORTS
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import AdminStats from "./AdminStats";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import InquiriesPanel from "./InquiriesPanel"; // 🟢 IMPORT NEW PANEL
import { API_URL } from "../../config";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("inventory"); // 🟢 TAB STATE
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATES
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
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
      <Navbar onAddClick={() => setShowAddForm(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* STATS STRIP (Always Visible) */}
        <AdminStats products={products} onSearch={handleSearch} />

        {/* 🟢 TABS NAVIGATOR */}
        <div className="flex gap-4 border-b border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === "inventory"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-500 hover:text-white"
            }`}
          >
            <FaLayerGroup /> Inventory Database
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === "inquiries"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-500 hover:text-white"
            }`}
          >
            <FaClipboardList /> Customer Inquiries
          </button>
        </div>

        {/* 🟢 CONDITIONAL CONTENT */}
        {activeTab === "inventory" ? (
          // --- INVENTORY VIEW ---
          loading ? (
            <div className="text-center py-20">Loading Dashboard...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
              <FaBoxOpen className="text-6xl mx-auto mb-4 text-slate-600" />
              <p className="text-slate-500">Inventory is Empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isAdmin={true}
                  onDelete={(action) => {
                    if (action === "EDIT") {
                      setEditingProduct(product);
                    } else {
                      fetchProducts();
                    }
                  }}
                />
              ))}
            </div>
          )
        ) : (
          // --- INQUIRIES VIEW (NEW) ---
          <InquiriesPanel />
        )}
      </div>

      <Footer />

      {/* MODALS */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-slate-900/80 transition-all flex justify-center items-center p-4">
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onProductAdded={fetchProducts}
          />
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-slate-900/80 transition-all flex justify-center items-center p-4">
          <EditProductForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onProductUpdated={() => {
              fetchProducts();
              setEditingProduct(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
