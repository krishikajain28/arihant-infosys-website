import {
  FaSearch,
  FaBoxOpen,
  FaCoins,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

const AdminStats = ({ products, onSearch }) => {
  // 1. Calculate Total Valuation (Inventory Value)
  const totalValue = products.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );

  // 2. Count Total Unique Items
  const totalItems = products.length;

  // 3. Count Low Stock Items (Less than 3)
  const lowStockItems = products.filter((item) => item.stock < 3).length;

  return (
    <div className="mb-8 space-y-8">
      {/* --- SEARCH COMMAND BAR --- */}
      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-2xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <FaSearch className="text-slate-500 ml-2 text-xl group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search inventory database..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-transparent border-none text-white text-lg px-4 focus:outline-none placeholder-slate-600 font-medium tracking-wide"
          />
          <div className="hidden md:block text-xs font-mono text-slate-600 border border-slate-700 rounded px-2 py-1">
            CTRL + K
          </div>
        </div>
      </div>

      {/* --- ANALYTICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: VALUATION */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-500">
            <FaCoins size={60} />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-900/30 rounded-lg text-emerald-400">
              <FaChartLine />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Total Valuation
            </p>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
            ₹{totalValue.toLocaleString()}
          </h2>
        </div>

        {/* CARD 2: TOTAL ASSETS */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-blue-500">
            <FaBoxOpen size={60} />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
              <FaBoxOpen />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Total Assets
            </p>
          </div>
          <h2 className="text-3xl font-bold text-white">
            {totalItems}{" "}
            <span className="text-lg text-slate-600 font-normal">SKUs</span>
          </h2>
        </div>

        {/* CARD 3: ALERTS */}
        <div
          className={`p-6 rounded-2xl border shadow-lg relative overflow-hidden transition-colors ${
            lowStockItems > 0
              ? "bg-slate-900 border-orange-900/50 hover:border-orange-500/50"
              : "bg-slate-900 border-slate-800"
          }`}
        >
          <div
            className={`absolute top-0 right-0 p-4 opacity-10 transition-opacity ${
              lowStockItems > 0
                ? "text-orange-500 opacity-20"
                : "text-slate-600"
            }`}
          >
            <FaExclamationTriangle size={60} />
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded-lg ${
                lowStockItems > 0
                  ? "bg-orange-900/30 text-orange-400"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              <FaExclamationTriangle />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Low Stock Alerts
            </p>
          </div>

          <h2
            className={`text-3xl font-bold ${
              lowStockItems > 0 ? "text-orange-400" : "text-slate-600"
            }`}
          >
            {lowStockItems}{" "}
            <span className="text-lg text-slate-600 font-normal">Items</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
