import { FaPlus } from "react-icons/fa";

const Navbar = ({ onAddClick }) => {
  return (
    <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg shadow-green-500/20"></div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              ARIHANT{" "}
              <span className="text-slate-400 font-normal">INFOSYS</span>
            </h1>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={onAddClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-2 px-5 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20"
          >
            <FaPlus /> Add Inventory
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
