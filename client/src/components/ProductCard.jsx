import React from "react";
import {
  FaMemory,
  FaHdd,
  FaMicrochip,
  FaLaptop,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const ProductCard = ({ product }) => {
  // 1. Icon Logic: Choose icon based on category
  const getIcon = () => {
    switch (product.category) {
      case "RAM":
        return <FaMemory className="text-4xl text-purple-500 mb-2" />;
      case "SSD":
        return <FaHdd className="text-4xl text-blue-500 mb-2" />;
      case "HDD":
        return <FaHdd className="text-4xl text-gray-500 mb-2" />;
      case "CPU":
        return <FaMicrochip className="text-4xl text-red-500 mb-2" />;
      case "Laptop":
        return <FaLaptop className="text-4xl text-white mb-2" />;
      default:
        return <FaMicrochip className="text-4xl text-green-500 mb-2" />;
    }
  };

  // 2. Status Color Logic
  const getStatusColor = () => {
    if (product.condition === "Brand New")
      return "bg-green-500/20 text-green-400 border-green-500/50";
    if (product.condition === "Pulled")
      return "bg-orange-500/20 text-orange-400 border-orange-500/50";
    return "bg-blue-500/20 text-blue-400 border-blue-500/50";
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg hover:shadow-green-500/10 hover:border-green-500/50 transition-all duration-300 group relative overflow-hidden">
      {/* GLOW EFFECT */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-green-500/20"></div>

      {/* HEADER: Icon & Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 shadow-inner">
          {getIcon()}
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor()}`}
        >
          {product.condition}
        </span>
      </div>

      {/* CONTENT */}
      <div>
        <h3
          className="text-lg font-bold text-white truncate"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1 mb-4 font-mono">
          {product.brand} • {product.specs?.capacity || "N/A"} •{" "}
          {product.specs?.type || "Standard"}
        </p>
      </div>

      {/* FOOTER: Price & Stock */}
      <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-2">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Price
          </p>
          <p className="text-xl font-bold text-emerald-400">
            ₹{product.price.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Stock
          </p>
          <p
            className={`text-lg font-bold ${
              product.stock > 0 ? "text-white" : "text-red-500"
            }`}
          >
            {product.stock}
          </p>
        </div>
      </div>

      {/* HOVER ACTIONS (Hidden by default, appear on hover) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
    </div>
  );
};

export default ProductCard;
