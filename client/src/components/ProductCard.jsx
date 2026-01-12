import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaStar, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product, isAdmin, onDelete }) => {
  // DELETE FUNCTION (Admin Only)
  const handleDelete = async (e) => {
    e.preventDefault(); // Stop clicking the card
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${product._id}`);
        onDelete(); // Refresh the list
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-2xl flex flex-col relative"
    >
      {/* ADMIN CONTROLS (Only visible if isAdmin is true) */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow-lg"
            title="Delete Product"
          >
            <FaTrash size={12} />
          </button>
        </div>
      )}

      {/* IMAGE */}
      <div className="h-48 bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-bold text-white border border-slate-700 z-10">
          {product.category}
        </div>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="text-4xl opacity-20 font-bold text-slate-600">
            IMG
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white truncate group-hover:text-emerald-400 transition-colors mb-1">
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {product.brand} • {product.specs?.capacity || "Standard"}
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
          <span className="text-lg font-bold text-emerald-400">
            ₹{product.price}
          </span>
          {!isAdmin && (
            <div className="text-slate-400 hover:text-white bg-slate-800 hover:bg-emerald-500 p-2 rounded-lg transition-colors">
              <FaShoppingCart size={14} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
