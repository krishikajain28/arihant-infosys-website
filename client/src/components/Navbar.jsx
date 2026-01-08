import { FaLaptopCode, FaWhatsapp, FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

// ACCEPT THE PROP HERE
const Navbar = ({ onAddClick }) => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  // ADMIN NAVBAR
  if (isAdmin) {
    return (
      <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Admin Control Center
            </span>

            <div className="flex items-center gap-4">
              {/* THE MISSING BUTTON */}
              <button
                onClick={onAddClick}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-4 rounded-lg text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                <FaPlus /> Add Inventory
              </button>

              <Link to="/" className="text-slate-400 hover:text-white text-sm">
                Exit to Website
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // PUBLIC NAVBAR
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* BRAND */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FaLaptopCode className="text-white text-xl" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                ARIHANT <span className="text-emerald-400">INFOSYS</span>
              </h1>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Contact
            </Link>

            {/* CTA BUTTON */}
            <a
              href="https://wa.me/919702730050"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <FaWhatsapp size={18} />
              <span>Inquire Now</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
