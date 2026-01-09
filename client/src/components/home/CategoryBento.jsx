import { Link } from "react-router-dom";
import {
  FaLaptop,
  FaMemory,
  FaHdd,
  FaServer,
  FaArrowRight,
} from "react-icons/fa";

const CategoryBento = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Products We <span className="text-emerald-500">Stock.</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg">
            We don't sell everything. We only sell what we can verify. Premium
            corporate hardware for professionals.
          </p>
        </div>
        <Link
          to="/products"
          className="group flex items-center gap-2 text-emerald-400 font-bold border-b border-emerald-500/30 pb-1 hover:text-emerald-300 hover:border-emerald-400 transition-all"
        >
          View Full Catalog{" "}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* THE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* CARD 1: LAPTOPS (Large, Spans 2 Columns) */}
        <Link
          to="/products"
          className="group relative md:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="bg-slate-950/50 w-fit p-4 rounded-2xl backdrop-blur-md border border-slate-800 text-emerald-400">
              <FaLaptop size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Corporate Laptops
              </h3>
              <p className="text-slate-400 group-hover:text-emerald-200 transition-colors">
                ThinkPads, Latitudes, and EliteBooks. Sourced directly from
                MNCs.
              </p>
            </div>
          </div>
          {/* Decorative Icon Background */}
          <FaLaptop className="absolute -bottom-12 -right-12 text-[200px] text-slate-800/20 group-hover:text-emerald-500/5 group-hover:scale-110 transition-all duration-700 rotate-12" />
        </Link>

        {/* CARD 2: RAM (Tall or Square) */}
        <Link
          to="/products"
          className="group relative bg-slate-900 rounded-3xl p-8 border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-500/20 transition-all duration-500"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="bg-slate-950/50 w-fit p-4 rounded-2xl backdrop-blur-md border border-slate-800 text-purple-400">
              <FaMemory size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                High Speed RAM
              </h3>
              <p className="text-slate-400">
                DDR3 & DDR4 Desktop/Laptop Memory.
              </p>
            </div>
          </div>
        </Link>

        {/* CARD 3: STORAGE (Square) */}
        <Link
          to="/products"
          className="group relative bg-slate-900 rounded-3xl p-8 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/20 transition-all duration-500"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="bg-slate-950/50 w-fit p-4 rounded-2xl backdrop-blur-md border border-slate-800 text-blue-400">
              <FaHdd size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">SSD & HDD</h3>
              <p className="text-slate-400">100% Health. Zero Bad Sectors.</p>
            </div>
          </div>
        </Link>

        {/* CARD 4: SERVERS/BULK (Wide, Spans 2 Cols) */}
        <Link
          to="/contact"
          className="group relative md:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-500"
        >
          {/* Different styling for the last card */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex items-center justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaServer className="text-emerald-500 text-3xl" />
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  For Offices
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Setting up a Lab or Office?
              </h3>
              <p className="text-slate-400 max-w-md">
                Get Bulk Pricing for quantities 10+. We provide GST Invoices for
                businesses.
              </p>
            </div>
            <div className="hidden md:flex h-16 w-16 bg-emerald-500 rounded-full items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
              <FaArrowRight size={24} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategoryBento;
