import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaBan, FaImage } from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product, isAdmin, onDelete }) => {
  // 1. CHECK STOCK
  const isOutOfStock = product.stock <= 0;

  // 2. DELETE LOGIC (Admin)
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
      className={`group bg-slate-900 rounded-xl border overflow-hidden transition-all hover:shadow-2xl flex flex-col relative ${
        isOutOfStock
          ? "border-red-900/30 opacity-75"
          : "border-slate-800 hover:border-emerald-500/50"
      }`}
    >
      {/* ADMIN TRASH BUTTON */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-20 bg-red-600 text-white p-2 rounded-lg shadow-lg hover:scale-110 transition-transform"
        >
          <FaTrash size={12} />
        </button>
      )}

      {/* IMAGE CONTAINER */}
      <div className="h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
        {/* BADGE: CATEGORY OR OUT OF STOCK */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold border z-10 uppercase tracking-wider ${
            isOutOfStock
              ? "bg-red-500 text-white border-red-600"
              : "bg-slate-950/80 text-white border-slate-700"
          }`}
        >
          {isOutOfStock ? "Sold Out" : product.category}
        </div>

        {/* THE IMAGE WITH ERROR HANDLING */}
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isOutOfStock ? "grayscale" : "group-hover:scale-110"
            }`}
            // ADDED: Error Handler to hide broken images and show placeholder
            onError={(e) => {
              console.error("Image Failed to Load:", product.images[0]);
              e.target.style.display = "none"; // Hide the broken <img>
              e.target.nextSibling.style.display = "flex"; // Show fallback if we had one next to it
            }}
          />
        ) : (
          // PLACEHOLDER (Will show if images array is empty)
          <div className="flex flex-col items-center text-slate-600">
            <FaImage size={32} />
            <span className="text-xs font-bold mt-1">No Image</span>
          </div>
        )}

        {/* RED OVERLAY IF NO STOCK */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/50"></div>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3
            className={`font-bold truncate transition-colors mb-1 ${
              isOutOfStock
                ? "text-slate-400"
                : "text-white group-hover:text-emerald-400"
            }`}
          >
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {product.brand} • {product.specs?.capacity || "Standard"}
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
          <span
            className={`text-lg font-bold ${
              isOutOfStock
                ? "text-slate-500 line-through decoration-red-500"
                : "text-emerald-400"
            }`}
          >
            ₹{product.price}
          </span>

          {/* CART BUTTON LOGIC */}
          {!isAdmin && (
            <div
              className={`p-2 rounded-lg transition-colors ${
                isOutOfStock
                  ? "bg-slate-800 text-red-500 cursor-not-allowed"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-emerald-500"
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
