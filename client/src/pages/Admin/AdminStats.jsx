import {
  FaSearch,
  FaBoxOpen,
  FaCoins,
  FaExclamationTriangle,
} from "react-icons/fa";

const AdminStats = ({ products, onSearch }) => {
  // Calculate Stats
  const totalValue = products.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );
  const totalItems = products.length;
  const lowStockItems = products.filter((item) => item.stock < 3).length;

  return (
    <div className="mb-8 space-y-6">
      {/* SEARCH BAR */}
      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-2xl p-2 shadow-2xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <FaSearch className="text-slate-500 ml-4 text-xl" />
          <input
            type="text"
            placeholder="Search inventory (Hidden from customers)..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-transparent border-none text-white text-lg px-4 py-3 focus:outline-none placeholder-slate-500 font-medium"
          />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VALUATION */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FaCoins size={60} />
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
            Total Valuation
          </p>
          <h2 className="text-3xl font-bold text-white font-mono">
            ₹{totalValue.toLocaleString()}
          </h2>
        </div>

        {/* COUNT */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
            Total Assets
          </p>
          <h2 className="text-3xl font-bold text-white">{totalItems}</h2>
        </div>

        {/* ALERTS */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
            Low Stock Alerts
          </p>
          <h2
            className={`text-3xl font-bold ${
              lowStockItems > 0 ? "text-orange-500" : "text-slate-600"
            }`}
          >
            {lowStockItems}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
