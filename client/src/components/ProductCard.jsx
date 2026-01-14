import { Link } from "react-router-dom";
import {
  FaTrash,
  FaShoppingCart,
  FaBan,
  FaImage,
  FaBolt,
  FaWhatsapp,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../config";

const ProductCard = ({ product, isAdmin, onDelete }) => {
  // SAFETY CHECK: If product is missing, don't crash
  if (!product) return null;

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
        await axios.delete(`${API_URL}/products/${product._id}`);
        onDelete("DELETE");
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
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onDelete) onDelete("EDIT");
            }}
            className="bg-blue-600/90 text-white p-2 rounded-lg shadow-lg hover:scale-110 transition-all backdrop-blur-sm"
          >
            <FaEdit size={12} />
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600/90 text-white p-2 rounded-lg shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
          >
            <FaTrash size={12} />
          </button>
        </div>
      )}

      {/* --- IMAGE AREA --- */}
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden p-4 group-hover:bg-slate-50 transition-colors">
        <div className="absolute top-0 left-0 w-full flex justify-between p-3 z-20">
          <span className="bg-slate-900/90 text-slate-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
          {isOutOfStock && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              SOLD OUT
            </span>
          )}
        </div>

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

        <div className="hidden flex-col items-center text-slate-400 absolute inset-0 justify-center bg-slate-100">
          <FaImage size={32} />
          <span className="text-xs font-bold mt-1">Image Broken</span>
        </div>
      </div>

      {/* --- DETAILS AREA --- */}
      <div className="p-4 flex-grow flex flex-col justify-between border-t border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold mb-1 uppercase tracking-wide">
            {product.brand}
            {product.specs?.capacity && (
              <span className="text-slate-500">• {product.specs.capacity}</span>
            )}
          </div>

          <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {product.title}
          </h3>

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

        <div className="flex items-end justify-between mt-2 pt-2 border-t border-slate-800/50">
          <div className="flex flex-col">
            {isAdmin ? (
              <>
                {product.mrp > product.price && (
                  <span className="text-slate-500 text-[10px] line-through">
                    ₹{product.mrp}
                  </span>
                )}
                <span className="text-lg font-bold text-white">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                <FaWhatsapp size={14} /> Message for Rate
              </span>
            )}
          </div>

          {!isAdmin && (
            <div
              className={`p-2 rounded-lg transition-colors ${
                isOutOfStock
                  ? "bg-slate-800 text-red-500 opacity-50"
                  : "bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-white"
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
