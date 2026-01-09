import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaWhatsapp,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaLaptop,
  FaTag,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]); // Changed from 'relatedProducts'
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top

    axios
      .get(`http://localhost:5000/api/products`)
      .then((res) => {
        const allProducts = res.data;
        const found = allProducts.find((p) => p._id === id);
        setProduct(found);

        // 2. SMART RECOMMENDATION LOGIC
        if (found) {
          // A. Get items from SAME Category (exclude current)
          const sameCategory = allProducts.filter(
            (p) => p.category === found.category && p._id !== found._id
          );

          // B. Get items from OTHER Categories (to fill gaps)
          const otherCategories = allProducts.filter(
            (p) => p.category !== found.category
          );

          // C. Combine: Put Same Category FIRST, then fill with Others
          // We take up to 4 items total
          const mixedList = [...sameCategory, ...otherCategories].slice(0, 4);

          setRecommendations(mixedList);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Icon Logic
  const getIcon = (category) => {
    switch (category) {
      case "RAM":
        return <FaMemory className="text-9xl text-slate-700" />;
      case "SSD":
        return <FaHdd className="text-9xl text-slate-700" />;
      case "HDD":
        return <FaHdd className="text-9xl text-slate-700" />;
      case "CPU":
        return <FaMicrochip className="text-9xl text-slate-700" />;
      case "Laptop":
        return <FaLaptop className="text-9xl text-slate-700" />;
      default:
        return <FaMicrochip className="text-9xl text-slate-700" />;
    }
  };

  const handleBuy = () => {
    if (!product) return;
    const message = `*Hi Arihant Infosys, I am interested in this item:*\n\n*${product.title}*\nPrice: ₹${product.price}\nCondition: ${product.condition}\n\nIs it available?`;
    window.open(
      `https://wa.me/919702730050?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Specs...
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Product Not Found.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <FaArrowLeft /> Back to Store
        </button>

        {/* MAIN PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* LEFT: IMAGE / ICON */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex items-center justify-center relative overflow-hidden h-[400px] md:h-[500px]">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                {getIcon(product.category)}
                <span className="text-slate-600 font-bold text-2xl uppercase tracking-widest">
                  No Image
                </span>
              </div>
            )}
            <div className="absolute top-6 left-6">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                {product.condition}
              </span>
            </div>
          </div>

          {/* RIGHT: SPECS & BUY */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">
                {product.brand} / {product.category}
              </h2>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                {product.title}
              </h1>
              <div className="text-4xl font-mono text-emerald-400 font-bold">
                ₹{product.price.toLocaleString()}
              </div>
            </div>

            {/* SPECS GRID */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <span className="text-slate-500 block">Capacity/Size</span>
                  <span className="text-white font-mono">
                    {product.specs?.capacity || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Type/Interface</span>
                  <span className="text-white font-mono">
                    {product.specs?.type || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Speed/Refresh</span>
                  <span className="text-white font-mono">
                    {product.specs?.speed || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Stock Status</span>
                  <span
                    className={`${
                      product.stock > 0 ? "text-green-400" : "text-red-400"
                    } font-bold`}
                  >
                    {product.stock > 0
                      ? `${product.stock} Units Available`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <button
              onClick={handleBuy}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-all text-lg shadow-lg shadow-emerald-500/20"
            >
              <FaWhatsapp size={24} /> Buy on WhatsApp
            </button>

            <p className="text-slate-500 text-xs text-center">
              * Actual product may vary slightly from image. 7 Days Replacement
              Warranty.
            </p>
          </div>
        </div>

        {/* RECOMMENDATIONS SECTION (ALWAYS FULL) */}
        {recommendations.length > 0 && (
          <div className="border-t border-slate-800 pt-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              You Might Also Like
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <Link
                  to={`/product/${rec._id}`}
                  key={rec._id}
                  className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all"
                >
                  <div className="h-40 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-bold text-white border border-slate-700">
                      {rec.category}
                    </div>

                    {rec.images && rec.images.length > 0 ? (
                      <img
                        src={rec.images[0]}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-slate-700 font-bold text-4xl">
                        IMG
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                      {rec.title}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-emerald-400 font-mono font-bold">
                        ₹{rec.price}
                      </p>
                      <span className="text-[10px] text-slate-500 border border-slate-700 px-1 rounded">
                        {rec.condition}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
