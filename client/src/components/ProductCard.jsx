import React from "react";
import { FaMemory, FaHdd, FaMicrochip, FaLaptop } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // 1. Icon Logic (Fallback if no image)
  const getIcon = () => {
    switch (product.category) {
      case "RAM":
        return <FaMemory className="text-4xl text-purple-500" />;
      case "SSD":
        return <FaHdd className="text-4xl text-blue-500" />;
      case "HDD":
        return <FaHdd className="text-4xl text-gray-500" />;
      case "CPU":
        return <FaMicrochip className="text-4xl text-red-500" />;
      case "Laptop":
        return <FaLaptop className="text-4xl text-white" />;
      default:
        return <FaMicrochip className="text-4xl text-green-500" />;
    }
  };

  const getStatusColor = () => {
    if (product.condition === "Brand New")
      return "bg-green-500/20 text-green-400 border-green-500/50";
    if (product.condition === "Pulled")
      return "bg-orange-500/20 text-orange-400 border-orange-500/50";
    return "bg-blue-500/20 text-blue-400 border-blue-500/50";
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
      {/* HEADER: Image or Icon */}
      <div className="h-48 w-full bg-slate-900 border-b border-slate-700 flex items-center justify-center relative overflow-hidden">
        {/* IF IMAGE EXISTS, SHOW IT. ELSE SHOW ICON */}
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="opacity-50 grayscale group-hover:grayscale-0 transition-all transform scale-150">
            {getIcon()}
          </div>
        )}

        {/* STATUS BADGE */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full border backdrop-blur-md ${getStatusColor()}`}
        >
          {product.condition}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-bold text-white truncate"
            title={product.title}
          >
            {product.title}
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-mono uppercase tracking-wide">
            {product.brand} • {product.specs?.capacity || "STD"}
          </p>
        </div>

        {/* FOOTER: Price & Stock */}
        <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-700">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">
              Price
            </p>
            <p className="text-xl font-bold text-emerald-400">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold">
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
      </div>
    </div>
  );
};

export default ProductCard;
