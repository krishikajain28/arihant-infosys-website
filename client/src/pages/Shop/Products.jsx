import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaShoppingCart } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "RAM",
    "SSD",
    "HDD",
    "NVMe",
    "CPU",
    "Laptop",
    "Desktop",
    "Server",
    "Workstation",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data.reverse());
      setFilteredProducts(res.data);
      setLoading(false);
    });
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let result = products;

    // 1. Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by Search
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm, products]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* HEADER & SEARCH */}
      <div className="bg-slate-900 pt-32 pb-10 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Full Inventory</h1>
            <p className="text-slate-400 text-sm mt-1">
              Browse our complete collection of verified hardware.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search '8GB RAM', 'Dell'..."
              className="w-full bg-slate-950 border border-slate-700 rounded-full py-3 pl-12 pr-6 text-white focus:border-emerald-500 outline-none transition-colors"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR FILTERS (Desktop) */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-400 mb-4 uppercase tracking-wider text-xs">
            <FaFilter /> Filter Category
          </div>
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-20 text-slate-500">
              Loading Catalog...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-2xl"
                >
                  {/* IMAGE */}
                  <div className="h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-bold text-white border border-slate-700 z-10">
                      {product.category}
                    </div>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-4xl opacity-20 font-bold">IMG</span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-5">
                    <h3 className="font-bold text-white truncate group-hover:text-emerald-400 transition-colors mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      {product.brand} • {product.specs?.capacity || "STD"}
                    </p>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                      <span className="text-lg font-bold text-emerald-400">
                        ₹{product.price}
                      </span>
                      <button className="text-slate-400 hover:text-white bg-slate-800 hover:bg-emerald-500 p-2 rounded-lg transition-colors">
                        <FaShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
              <p className="text-slate-500 text-lg">
                No products found for "{activeCategory}"
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="text-emerald-400 font-bold mt-2 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
