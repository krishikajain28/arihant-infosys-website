import {
  FaBolt,
  FaCheckCircle,
  FaShippingFast,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

const Marquee = () => {
  const items = [
    { icon: <FaTag />, text: "WHOLESALE RATES" },
    { icon: <FaMapMarkerAlt />, text: "MUMBAI BASED" },
    { icon: <FaShieldAlt />, text: "7 DAYS WARRANTY" },
    { icon: <FaCheckCircle />, text: "100% TESTED OK" },
    { icon: <FaShippingFast />, text: "PAN INDIA SHIPPING" },
    { icon: <FaBolt />, text: "CORPORATE PULLS" },
  ];

  return (
    <div className="relative w-full bg-emerald-500/5 border-y border-emerald-500/20 py-4 overflow-hidden group">
      {/* GRADIENT FADE MASKS (The "Premium" Touch) */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

      {/* THE MOVING TRACK */}
      <div className="flex w-max animate-marquee">
        {/* RENDER TWICE FOR SEAMLESS LOOP */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 px-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-emerald-400/90 font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap"
              >
                <span className="text-emerald-500 text-lg drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                  {item.icon}
                </span>
                <span className="drop-shadow-sm">{item.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
