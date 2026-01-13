import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import { API_URL } from "../../config";

const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        // Get newest 8 items
        setProducts(res.data.reverse().slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Just <span className="text-emerald-500">Arrived.</span>
          </h2>
          <p className="text-slate-400">
            Fresh stock from corporate liquidation.
          </p>
        </div>
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
            // USE THE SMART CARD COMPONENT
            <ProductCard key={product._id} product={product} isAdmin={false} />
          ))}
        </div>
      )}

      {/* MOBILE BUTTON */}
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
