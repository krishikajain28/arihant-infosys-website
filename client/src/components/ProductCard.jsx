import { Link } from "react-router-dom";
import {
  FaTrash,
  FaShoppingCart,
  FaBan,
  FaImage,
  FaBolt,
} from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product, isAdmin, onDelete }) => {
  // 1. CHECK STOCK
  const isOutOfStock = product.stock <= 0;

  // 2. CALCULATE DISCOUNT
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // 3. DELETE LOGIC (Admin)
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Delete this item permanently?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${product._id}`);
        onDelete();
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className={`group relative flex flex-col bg-slate-900 rounded-xl border transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/20 ${
        isOutOfStock
          ? "border-red-900/30 opacity-75"
          : "border-slate-800 hover:border-emerald-500/50 hover:-translate-y-1"
      }`}
    >
      {/* ADMIN CONTROLS */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-30 flex gap-2">
          {/* 🟢 EDIT BUTTON */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // We need to pass a signal to parent, but for now let's just use the prop
              if (onDelete) onDelete("EDIT"); // Hack to signal edit
            }}
            className="bg-slate-700/90 text-emerald-400 p-2 rounded-lg shadow-lg hover:bg-white hover:scale-110 transition-all backdrop-blur-sm"
          >
            <FaBolt size={12} />
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDelete}
            className="bg-red-600/90 text-white p-2 rounded-lg shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
          >
            <FaTrash size={12} />
          </button>
        </div>
      )}

      {/* --- IMAGE AREA (WHITE BACKGROUND FIX) --- */}
      {/* Changed bg-slate-900 to bg-white so JPEGs blend in */}
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden p-4 group-hover:bg-slate-50 transition-colors">
        {/* BADGES */}
        <div className="absolute top-0 left-0 w-full flex justify-between p-3 z-20">
          {/* Category Badge */}
          <span className="bg-slate-900/90 text-slate-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            {product.category}
          </span>

          {/* Discount / Status Badge */}
          {isOutOfStock ? (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              SOLD OUT
            </span>
          ) : discount > 0 ? (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              {discount}% OFF
            </span>
          ) : null}
        </div>

        {/* THE IMAGE */}
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : (
          <div className="flex flex-col items-center text-slate-400">
            <FaImage size={32} />
            <span className="text-xs font-bold mt-1">No Image</span>
          </div>
        )}

        {/* Fallback for Broken Image */}
        <div className="hidden flex-col items-center text-slate-400 absolute inset-0 justify-center bg-slate-100">
          <FaImage size={32} />
          <span className="text-xs font-bold mt-1">Image Broken</span>
        </div>
      </div>

      {/* --- DETAILS AREA (DARK) --- */}
      <div className="p-4 flex-grow flex flex-col justify-between border-t border-slate-800">
        <div>
          {/* Brand & Capacity */}
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold mb-1 uppercase tracking-wide">
            {product.brand}
            {product.specs?.capacity && (
              <span className="text-slate-500">• {product.specs.capacity}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {product.title}
          </h3>

          {/* Quick Specs (Chips) */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.specs?.health && (
              <span className="text-[10px] bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                <FaBolt size={8} /> {product.specs.health}% Health
              </span>
            )}
            {product.condition && (
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                {product.condition}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between mt-2 pt-2 border-t border-slate-800/50">
          <div className="flex flex-col">
            {product.mrp > product.price && (
              <span className="text-slate-500 text-[10px] line-through">
                ₹{product.mrp}
              </span>
            )}
            <span
              className={`text-lg font-bold ${
                isOutOfStock ? "text-slate-500" : "text-white"
              }`}
            >
              ₹{product.price}
            </span>
          </div>

          {!isAdmin && (
            <div
              className={`p-2 rounded-lg transition-colors ${
                isOutOfStock
                  ? "bg-slate-800 text-red-500 opacity-50"
                  : "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 group-hover:bg-emerald-500"
              }`}
            >
              {isOutOfStock ? (
                <FaBan size={14} />
              ) : (
                <FaShoppingCart size={14} />
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
