import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar, FaArrowRight } from "react-icons/fa";

const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        // Reverse to get newest first, and take only top 8
        setProducts(res.data.reverse().slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Simple Add to Cart logic (We will pass this via Context later,
  // for now we just alert or redirect to product page)
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent clicking the Link
    alert("Please visit the product page to buy via WhatsApp!");
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Just <span className="text-emerald-500">Arrived.</span>
          </h2>
          <p className="text-slate-400">
            Fresh stock from corporate liquidation.
          </p>
        </div>
        {/* DESKTOP VIEW ALL LINK */}
        <Link
          to="/products"
          className="hidden md:flex items-center gap-2 text-emerald-400 font-bold hover:text-white transition-colors"
        >
          View All Inventory <FaArrowRight />
        </Link>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">
          Loading New Arrivals...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-56 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white border border-slate-700 z-10 uppercase tracking-wide">
                  {product.category}
                </div>

                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-4xl opacity-20 font-bold text-slate-600">
                    IMG
                  </span>
                )}

                {/* QUICK ADD OVERLAY (Optional Polish) */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-emerald-400 font-bold border border-emerald-500 px-4 py-2 rounded-full bg-emerald-500/10 backdrop-blur-md">
                    View Details
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                        product.condition === "Brand New"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {product.condition}
                    </span>
                    <div className="flex text-amber-500 text-[10px] gap-0.5">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>

                  <h3 className="font-bold text-white mb-1 truncate group-hover:text-emerald-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-500 text-xs mb-4">
                    {product.brand} • {product.specs?.capacity || "Standard"}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-500 line-through mr-2">
                      ₹{Math.round(product.price * 1.2)}
                    </span>
                    <span className="text-xl font-bold text-white">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="bg-emerald-500 text-slate-950 p-2.5 rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                    <FaShoppingCart size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* MOBILE VIEW ALL BUTTON */}
      <div className="mt-10 md:hidden text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold w-full justify-center"
        >
          View Full Catalog <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default LatestArrivals;
