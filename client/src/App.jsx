import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaBoxOpen } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Connects to your running server
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* HEADER */}
      <nav className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400 tracking-wider">
          ARIHANT INFOSYS
        </h1>
        <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded flex items-center gap-2">
          <FaPlus /> Add Item
        </button>
      </nav>

      {/* SEARCH BAR */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search RAM, SSD, HDD..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* INVENTORY LIST */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading Inventory...</p>
        ) : products.length === 0 ? (
          // EMPTY STATE (This is what you should see now)
          <div className="text-center py-20 text-gray-500">
            <FaBoxOpen className="text-6xl mx-auto mb-4 opacity-50" />
            <p className="text-xl">Inventory is Empty</p>
            <p className="text-sm">Click "Add Item" to start.</p>
          </div>
        ) : (
          // PRODUCT GRID (Will show later)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700"
              >
                <h2 className="font-bold text-lg">{product.title}</h2>
                <div className="flex justify-between mt-2 text-gray-400 text-sm">
                  <span>{product.category}</span>
                  <span className="text-green-400 font-mono">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
