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
  FaServer,
  FaBan,
  FaCheckCircle,
  FaBolt,
  FaShippingFast,
  FaShieldAlt,
  FaTag,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get(`http://localhost:5000/api/products`)
      .then((res) => {
        const allProducts = res.data;
        const found = allProducts.find((p) => p._id === id);
        setProduct(found);

        if (found) {
          const others = allProducts.filter((p) => p._id !== found._id);
          const sorted = others.sort((a, b) => {
            if (a.category === found.category) return -1;
            return 1;
          });
          setRecommendations(sorted.slice(0, 4));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const getIcon = (category) => {
    if (category?.includes("RAM"))
      return <FaMemory className="text-6xl text-slate-300" />;
    if (category?.includes("SSD") || category?.includes("HDD"))
      return <FaHdd className="text-6xl text-slate-300" />;
    if (category?.includes("Laptop"))
      return <FaLaptop className="text-6xl text-slate-300" />;
    return <FaMicrochip className="text-6xl text-slate-300" />;
  };

  const handleBuy = () => {
    if (!product || product.stock <= 0) return;
    const message = `*Hi Arihant Infosys, I am interested in this item:*\n\n*${product.title}*\nPrice: ₹${product.price}\nCondition: ${product.condition}\n\nIs it available?`;
    window.open(
      `https://wa.me/919702730050?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500">
        <FaMicrochip className="animate-spin text-4xl" />
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Product Not Found.
      </div>
    );

  const isOutOfStock = product.stock <= 0;

  // CALCULATE DISCOUNT
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <SEO
        title={product.title}
        description={`Buy ${product.title}. ${product.specs?.capacity || ""} ${
          product.specs?.type || ""
        } available now at Arihant Infosys.`}
        image={product.images[0]}
        url={window.location.href}
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* NAV BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* --- LEFT: IMAGE SECTION (WHITE BG FIX) --- */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 flex items-center justify-center relative overflow-hidden h-[400px] md:h-[500px] shadow-2xl group border-4 border-slate-900">
              {/* Status Badges */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.condition && (
                  <span className="bg-slate-900 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-lg">
                    {product.condition}
                  </span>
                )}
                {product.specs?.health && (
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <FaBolt /> {product.specs.health}% Health
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              {discount > 0 && !isOutOfStock && (
                <div className="absolute top-6 right-6 z-10 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
                  {discount}% OFF
                </div>
              )}

              {/* Main Image */}
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ${
                    isOutOfStock
                      ? "grayscale opacity-50"
                      : "group-hover:scale-110"
                  }`}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-slate-300">
                  {getIcon(product.category)}
                  <span className="font-bold text-2xl uppercase tracking-widest text-slate-400">
                    No Image
                  </span>
                </div>
              )}

              {/* Sold Out Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                  <span className="bg-red-600 text-white px-8 py-4 rounded-xl text-2xl font-bold uppercase tracking-widest shadow-2xl transform -rotate-12 border-4 border-white">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail / Extra Info (Optional) */}
            <div className="mt-4 flex gap-4 justify-center text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500" /> Quality Checked
              </span>
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-emerald-500" /> 7-Day Warranty
              </span>
              <span className="flex items-center gap-1">
                <FaShippingFast className="text-emerald-500" /> Fast Delivery
              </span>
            </div>
          </div>

          {/* --- RIGHT: DETAILS SECTION --- */}
          <div className="flex flex-col justify-center">
            {/* Title Block */}
            <div className="mb-6">
              <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-emerald-500"></span>
                {product.brand} / {product.category}
              </h2>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                {product.title}
              </h1>

              {/* Pricing Block */}
              <div className="flex items-end gap-4 border-b border-slate-800 pb-6">
                <div className="text-5xl font-mono text-white font-bold tracking-tighter">
                  ₹{product.price.toLocaleString()}
                </div>
                {product.mrp > product.price && (
                  <div className="flex flex-col mb-1">
                    <span className="text-slate-500 text-lg line-through decoration-red-500/50 decoration-2">
                      ₹{product.mrp.toLocaleString()}
                    </span>
                    <span className="text-emerald-400 text-xs font-bold uppercase">
                      Save ₹{(product.mrp - product.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Specs Grid */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-8 shadow-inner">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaMicrochip /> Technical Specifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
                {/* Standard Specs */}
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Capacity
                  </span>
                  <span className="text-white font-bold">
                    {product.specs?.capacity || "--"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Type
                  </span>
                  <span className="text-white font-bold">
                    {product.specs?.type || "--"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Speed
                  </span>
                  <span className="text-white font-bold">
                    {product.specs?.speed || "--"}
                  </span>
                </div>

                {/* 🟢 NEW SPECS */}
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Interface
                  </span>
                  <span className="text-white font-bold">
                    {product.specs?.interface || "--"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Form Factor
                  </span>
                  <span className="text-white font-bold">
                    {product.specs?.formFactor || "--"}
                  </span>
                </div>

                {/* Health Highlight */}
                <div className="relative">
                  <span className="text-slate-500 text-xs uppercase block mb-1">
                    Health Status
                  </span>
                  <span
                    className={`font-bold ${
                      product.specs?.health && product.specs.health > 90
                        ? "text-emerald-400"
                        : "text-white"
                    }`}
                  >
                    {product.specs?.health
                      ? `${product.specs.health}%`
                      : "Standard"}
                  </span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <button
                onClick={handleBuy}
                disabled={isOutOfStock}
                className={`w-full font-bold py-5 rounded-2xl flex justify-center items-center gap-3 transition-all text-xl shadow-2xl hover:-translate-y-1 ${
                  isOutOfStock
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
                }`}
              >
                {isOutOfStock ? (
                  <>
                    <FaBan /> Item Sold Out
                  </>
                ) : (
                  <>
                    <FaWhatsapp size={28} /> Buy on WhatsApp
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs bg-slate-900/50 py-2 rounded-lg">
                <FaTag className="text-slate-600" />
                Lowest Price Guaranteed • Verified Corporate Pull
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <div className="border-t border-slate-800 pt-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-emerald-500 rounded-full"></span>
              Similar Items
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <Link
                  to={`/product/${rec._id}`}
                  key={rec._id}
                  className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Rec Image - White BG */}
                  <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden p-4">
                    {rec.images && rec.images.length > 0 ? (
                      <img
                        src={rec.images[0]}
                        alt={rec.title}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <FaMicrochip className="text-4xl text-slate-300" />
                    )}
                  </div>
                  {/* Rec Info */}
                  <div className="p-4">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">
                      {rec.brand}
                    </div>
                    <h4 className="font-bold text-white truncate text-sm mb-2">
                      {rec.title}
                    </h4>
                    <div className="flex justify-between items-center">
                      <p className="text-white font-bold">₹{rec.price}</p>
                      {rec.mrp > rec.price && (
                        <span className="text-[10px] text-red-400 bg-red-900/20 px-1 rounded">
                          -{Math.round(((rec.mrp - rec.price) / rec.mrp) * 100)}
                          %
                        </span>
                      )}
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
