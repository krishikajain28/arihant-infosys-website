import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaLaptopCode } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-emerald-400 font-bold"
      : "text-slate-300 hover:text-white";
  };

  return (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950">
              <FaLaptopCode />
            </div>
            ARIHANT <span className="text-emerald-500">INFOSYS</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${isActive("/")} transition-colors`}>
              Home
            </Link>
            <Link
              to="/products"
              className={`${isActive("/products")} transition-colors`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`${isActive("/about")} transition-colors`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${isActive("/contact")} transition-colors`}
            >
              Contact
            </Link>

            <a
              href="https://wa.me/919702730050"
              target="_blank"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2 rounded-full font-bold transition-all transform hover:scale-105"
            >
              Inquire Now
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <div
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full p-6 flex flex-col gap-4 shadow-2xl">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-800"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-800"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-800"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-800"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
