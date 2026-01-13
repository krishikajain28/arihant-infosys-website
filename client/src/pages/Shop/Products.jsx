import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaBoxOpen,
  FaExclamationCircle,
  FaTimes,
  FaChevronRight,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

// ----------------------------------------------------------------------
// HELPER: IMAGE URL FIXER (Kept this as it stops broken images)
// ----------------------------------------------------------------------
const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  return `http://localhost:5000${imagePath}`;
};

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

// FILTER TAG (Clean, Business Style)
const FilterTag = ({ label, onRemove }) => (
  <button
    onClick={onRemove}
    className="flex items-center gap-2 bg-white text-slate-900 border border-slate-300 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide hover:bg-slate-100 transition-colors shadow-sm"
  >
    {label}
    <FaTimes className="text-slate-500 hover:text-red-600" />
  </button>
);

// ----------------------------------------------------------------------
// MAIN PAGE
// ----------------------------------------------------------------------

const Products = () => {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI Controls
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 9 fits perfectly in a 3x3 grid

  // URL Management
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const sortOrder = searchParams.get("sort") || "newest";
  const searchTermURL = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(searchTermURL);

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

  // --- DATA FETCHING ---
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.reverse());
        setLoading(false);
      } catch (err) {
        console.error("Inventory Fetch Error:", err);
        setError("Unable to load current stock. Please refresh.");
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // --- SEARCH DEBOUNCE ---
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchTermURL) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          if (localSearch) newParams.set("search", localSearch);
          else newParams.delete("search");
          newParams.delete("page");
          return newParams;
        });
        setCurrentPage(1);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [localSearch, searchTermURL, setSearchParams]);

  // --- FILTERING ENGINE ---
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchTermURL) {
      const lower = searchTermURL.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      );
    }
    if (sortOrder === "low-high") result.sort((a, b) => a.price - b.price);
    else if (sortOrder === "high-low") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, activeCategory, searchTermURL, sortOrder]);

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [currentPage, filteredProducts]);

  // --- HANDLERS ---
  const updateFilter = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === "All" && key === "category") newParams.delete("category");
      else newParams.set(key, value);
      return newParams;
    });
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setLocalSearch("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  // ----------------------------------------------------------------------
  // VIEW RENDER
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative bg-slate-900 border-b border-slate-800">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg/inventory.png"
            alt="Inventory Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent"></div>{" "}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">
                <FaBuilding /> Corporate Hardware Solutions
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Wholesale Inventory
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl font-medium">
                Verified pulls from corporate environments. Fully tested. <br />
                <span className="text-slate-400 text-sm mt-3 block">
                  <FaCheckCircle className="inline mr-1 text-emerald-500" /> GST
                  Invoice Available
                  <span className="mx-2">•</span>
                  <FaCheckCircle className="inline mr-1 text-emerald-500" />{" "}
                  Pan-India Shipping
                </span>
              </p>
            </div>

            {/* SEARCH INPUT */}
            <div className="w-full md:w-[450px]">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search Part No, Brand, Model..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-white text-slate-900 rounded-md py-4 pl-12 pr-12 font-medium shadow-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                {localSearch && (
                  <button
                    onClick={() => setLocalSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 w-full relative">
        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full flex justify-center items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-md font-bold text-sm border border-slate-700"
          >
            <FaFilter /> Filter Stock
          </button>
        </div>

        {/* 2. SIDEBAR FILTER */}
        <aside
          className={`
          fixed inset-0 z-50 bg-slate-900 p-6 transition-transform duration-300 lg:translate-x-0 lg:static lg:bg-transparent lg:p-0 lg:z-auto lg:w-64 flex-shrink-0 border-r border-slate-800 lg:border-none
          ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex justify-between items-center lg:hidden mb-8">
            <h2 className="text-xl font-bold text-white">Filter Stock</h2>
            <button onClick={() => setIsMobileFilterOpen(false)}>
              <FaTimes size={24} />
            </button>
          </div>

          <div className="sticky top-24 space-y-8">
            {/* Category List */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaFilter /> Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilter("category", cat)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex justify-between items-center group ${
                      activeCategory === cat
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <FaChevronRight className="text-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaSortAmountDown /> Sort Order
              </h3>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                {[
                  { label: "New Arrivals", val: "newest" },
                  { label: "Price: Low to High", val: "low-high" },
                  { label: "Price: High to Low", val: "high-low" },
                ].map((opt) => (
                  <label
                    key={opt.val}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        sortOrder === opt.val
                          ? "border-emerald-500"
                          : "border-slate-600"
                      }`}
                    >
                      {sortOrder === opt.val && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="sort"
                      className="hidden"
                      checked={sortOrder === opt.val}
                      onChange={() => updateFilter("sort", opt.val)}
                    />
                    <span
                      className={
                        sortOrder === opt.val
                          ? "text-white text-sm"
                          : "text-slate-400 text-sm group-hover:text-slate-200"
                      }
                    >
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 3. INVENTORY GRID */}
        <main className="flex-1 min-h-[600px]">
          {/* Top Bar (Desktop) */}
          <div className="hidden lg:flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm font-medium">
                Showing{" "}
                <strong className="text-white">{currentProducts.length}</strong>{" "}
                of{" "}
                <strong className="text-white">
                  {filteredProducts.length}
                </strong>{" "}
                items
              </span>

              {/* Active Filters */}
              {(activeCategory !== "All" || searchTermURL) && (
                <div className="flex gap-2 ml-4 pl-4 border-l border-slate-800">
                  {activeCategory !== "All" && (
                    <FilterTag
                      label={activeCategory}
                      onRemove={() => updateFilter("category", "All")}
                    />
                  )}
                  {searchTermURL && (
                    <FilterTag
                      label={`"${searchTermURL}"`}
                      onRemove={() => {
                        setLocalSearch("");
                        setSearchParams((p) => {
                          p.delete("search");
                          return p;
                        });
                      }}
                    />
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-slate-500 hover:text-white underline ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* STATES */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-6 rounded-lg flex items-center gap-4 mb-6">
              <FaExclamationCircle className="text-2xl text-red-500" />
              <div>
                <h3 className="font-bold">System Error</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-slate-900 h-80 rounded-lg border border-slate-800 animate-pulse"
                ></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* GRID CONTENT AREA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isAdmin={false}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-12 py-6 border-t border-slate-800 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 px-4 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 disabled:opacity-50 transition-all text-sm font-bold"
                  >
                    Prev
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-9 h-9 rounded-md text-sm font-bold border transition-all ${
                          currentPage === i + 1
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 px-4 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 disabled:opacity-50 transition-all text-sm font-bold"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            // EMPTY STATE
            <div className="text-center py-24 bg-slate-900 border border-slate-800 border-dashed rounded-lg flex flex-col items-center">
              <FaBoxOpen className="text-6xl text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Item Not Found
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-6">
                We don't have stock matching "{searchTermURL}" right now.
              </p>
              <button
                onClick={clearFilters}
                className="bg-white text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-slate-200 transition-colors"
              >
                Reset Search
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
