import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaCheckCircle,
  FaWhatsapp,
  FaTrash,
  FaShieldAlt,
  FaTag,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. THE SHOPPING CART STATE
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data.reverse());
      setLoading(false);
    });
  }, []);

  // 2. ADD TO CART FUNCTION
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      alert("Item already in cart!");
      return;
    }
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  // 3. REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // 4. WHATSAPP CHECKOUT
  const handleCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    let message = `*Hello Arihant Infosys, I want to place an order:*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ₹${item.price}\n`;
    });
    message += `\n*Total Amount: ₹${total}*`;
    message += `\n\nPlease confirm availability.`;
    const phoneNumber = "919702730050";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative py-32 px-6 overflow-hidden">
        {/* BACKGROUND IMAGE LAYER (LOCAL FILE) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/home.png"
            alt="Arihant Infosys Store"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay to fade image into the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950"></div>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold mb-4 backdrop-blur-md">
            <FaTag /> Best Prices in Mumbai
          </div>

          {/* SIMPLE, DIRECT HEADLINE */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
            Premium Hardware. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Wholesale Rates.
            </span>
          </h1>

          {/* SIMPLE SUBHEADING */}
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Get Original Pulled RAM, SSD, and Laptops directly from corporate
            offices. <strong>100% Tested. 7 Days Warranty.</strong>
          </p>

          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-slate-300 text-base font-semibold bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700">
              <FaShieldAlt className="text-emerald-500" /> Original Parts
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-base font-semibold bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700">
              <FaCheckCircle className="text-emerald-500" /> Fully Tested
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20 pb-40">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
          Latest Stock
        </h2>

        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading Store...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* DYNAMIC IMAGE SECTION */}
                <div className="h-56 bg-slate-800/50 flex flex-col items-center justify-center text-slate-600 group-hover:bg-slate-800 transition-colors relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-slate-800 z-10">
                    {product.category}
                  </div>

                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-4xl opacity-20 font-bold">IMG</span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                        product.condition === "Brand New"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {product.condition}
                    </span>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>

                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold text-lg text-white mb-1 truncate group-hover:text-emerald-400 transition-colors cursor-pointer hover:underline">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-slate-500 text-sm mb-6">
                    {product.brand} • {product.specs?.capacity || "Standard"}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <div>
                      <span className="text-xs text-slate-500 line-through">
                        ₹{Math.round(product.price * 1.2)}
                      </span>
                      <div className="text-2xl font-bold text-white">
                        ₹{product.price}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3 rounded-xl transition-all transform active:scale-95"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FLOATING CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          {!isCartOpen && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-6 rounded-full shadow-2xl flex items-center gap-3 animate-bounce"
            >
              <FaShoppingCart />
              <span>{cart.length} Item(s)</span>
            </button>
          )}

          {isCartOpen && (
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-80 overflow-hidden relative animation-fade-in-up">
              <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FaShoppingCart className="text-emerald-400" /> Your Cart
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 max-h-60 overflow-y-auto space-y-3">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg"
                  >
                    <div className="truncate w-32">
                      <p className="text-sm text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-emerald-400">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800 p-4 border-t border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">Total:</span>
                  <span className="text-xl font-bold text-white">
                    ₹{cart.reduce((a, b) => a + b.price, 0)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-all"
                >
                  <FaWhatsapp size={20} /> Order on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
