import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaBoxOpen,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard"; // REUSING THE CARD

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTERS
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest, low-high, high-low

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
      // Default: Newest first
      const data = res.data.reverse();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    });
  }, []);

  // MASTER FILTER LOGIC
  useEffect(() => {
    let result = [...products]; // Create a copy

    // 1. Category Filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Search Filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      );
    }

    // 3. Sorting Logic
    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default is newest (based on how we fetched, or DB ID)
      // Since we reversed initially, we can leave it or re-sort by date if we had a date field
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm, sortOrder, products]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* 1. COMPACT HERO BANNER */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 pt-28 pb-10 px-6 border-b border-slate-800 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Inventory.</h1>
            <p className="text-slate-400">
              Verified corporate pulls. 100% Tested.
            </p>
          </div>

          {/* SEARCH BAR (Floating) */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search '8GB RAM', 'Dell'..."
                className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 pl-12 pr-6 text-white focus:border-emerald-500 outline-none transition-all shadow-xl"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-10">
        {/* 2. SIDEBAR (Sticky on Desktop) */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Sort Dropdown (Mobile + Desktop) */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <FaSortAmountDown /> Sort By
              </div>
              <select
                className="w-full bg-slate-950 text-white p-2 rounded-lg border border-slate-700 outline-none focus:border-emerald-500"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-wider text-xs">
                <FaFilter /> Categories
              </div>
              {/* Horizontal Scroll on Mobile, Vertical List on Desktop */}
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-lg transition-all font-medium whitespace-nowrap text-sm border ${
                      activeCategory === cat
                        ? "bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-lg shadow-emerald-500/20"
                        : "bg-transparent text-slate-400 border-transparent hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 3. PRODUCT GRID */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-400 text-sm">
              Showing <strong>{filteredProducts.length}</strong> results
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-slate-900 h-80 rounded-2xl border border-slate-800"
                ></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                // REUSING YOUR PRODUCT CARD (No Admin Controls Here)
                <ProductCard
                  key={product._id}
                  product={product}
                  isAdmin={false}
                />
              ))}
            </div>
          ) : (
            // EMPTY STATE
            <div className="text-center py-32 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
              <FaBoxOpen className="text-6xl text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white">
                No products found
              </h3>
              <p className="text-slate-500 mt-2">
                Try adjusting your filters or search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                }}
                className="mt-6 text-emerald-400 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
