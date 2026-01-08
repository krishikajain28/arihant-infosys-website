import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* COLUMN 1: BRAND */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              ARIHANT <span className="text-emerald-500">INFOSYS</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Mumbai's trusted source for pulled, refurbished, and open-box
              computer hardware. Enterprise performance at consumer prices.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK CONTACT */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-emerald-500" />
                <span>
                  Grant Road, Mumbai,
                  <br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-emerald-500" />
                <span>+91 97027 30058</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-emerald-500" />
                <span>support@arihantinfosys.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: TRUST BADGES */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">
              Why Choose Us
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <FaShieldAlt className="text-emerald-500 text-xl" />
                <div>
                  <p className="text-white font-bold text-xs">
                    7 Days Warranty
                  </p>
                  <p className="text-slate-500 text-[10px]">
                    On all pulled parts
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <FaShieldAlt className="text-blue-500 text-xl" />
                <div>
                  <p className="text-white font-bold text-xs">
                    Tested & Verified
                  </p>
                  <p className="text-slate-500 text-[10px]">
                    100% Health Check
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} Arihant Infosys. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
