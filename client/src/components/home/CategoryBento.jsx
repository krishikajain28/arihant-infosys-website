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
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Products We <span className="text-emerald-500">Stock.</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
        {/* CARD 1: LAPTOPS (Large, Spans 2 Columns) */}
        <Link
          to="/products?category=laptops"
          className="group relative md:col-span-2 rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-500"
        >
          {/* Background Image Layer with Zoom Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: "url('/images/bg/bento1.png')" }}
          ></div>

          {/* Dark Gradient Overlay (Crucial for Text Readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90"></div>

          {/* Content Layer */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <div className="bg-white/5 w-fit p-4 rounded-2xl backdrop-blur-md border border-white/10 text-emerald-400 shadow-lg">
              <FaLaptop size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Corporate Laptops
              </h3>
              <p className="text-slate-300 group-hover:text-emerald-200 transition-colors">
                ThinkPads, Latitudes, and EliteBooks. Sourced directly from
                MNCs.
              </p>
            </div>
          </div>
        </Link>

        {/* CARD 2: RAM (Tall or Square) */}
        <Link
          to="/products?category=ram"
          className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: "url('/images/bg/bento2.png')" }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <div className="bg-white/5 w-fit p-4 rounded-2xl backdrop-blur-md border border-white/10 text-purple-400 shadow-lg">
              <FaMemory size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                High Speed RAM
              </h3>
              <p className="text-slate-300 text-sm">
                DDR4 & DDR5 Desktop/Laptop Memory.
              </p>
            </div>
          </div>
        </Link>

        {/* CARD 3: STORAGE (Square) */}
        <Link
          to="/products?category=storage"
          className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: "url('/images/bg/bento3.png')" }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <div className="bg-white/5 w-fit p-4 rounded-2xl backdrop-blur-md border border-white/10 text-blue-400 shadow-lg">
              <FaHdd size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                SSD & HDD
              </h3>
              <p className="text-slate-300 text-sm">
                100% Health. Zero Bad Sectors.
              </p>
            </div>
          </div>
        </Link>

        {/* CARD 4: SERVERS/BULK (Wide, Spans 2 Cols) */}
        <Link
          to="/contact"
          className="group relative md:col-span-2 rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-500"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: "url('/images/bg/bento4.png')" }}
          ></div>

          {/* Gradient Overlay - Darker here for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent opacity-95"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full p-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <FaServer className="text-emerald-500 text-2xl" />
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                  For Offices
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 tracking-wide">
                Setting up a Lab or Office?
              </h3>
              <p className="text-slate-300 text-lg">
                Get Bulk Pricing for quantities 10+. We provide GST Invoices for
                businesses.
              </p>
            </div>

            {/* Call to Action Button */}
            <div className="hidden md:flex h-14 w-14 bg-white/10 rounded-full items-center justify-center text-white backdrop-blur-md border border-white/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-900 group-hover:border-emerald-500 transition-all duration-300">
              <FaArrowRight size={20} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategoryBento;
