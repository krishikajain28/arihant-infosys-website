import { FaTag, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

const Hero = () => {
  return (
    // ADJUSTMENT 1: Increased height to 'min-h-[70vh]' so the image has room to breathe.
    <div className="relative py-20 px-6 overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg/home.png"
          alt="Hardware Warehouse"
          // ADJUSTMENT 2: Added 'object-center'. Kept 'object-cover' to ensure no empty bars.
          // If you strictly want the FULL image with no cropping, change 'object-cover' to 'object-contain'
          className="w-full h-full object-cover object-center opacity-30 animate-pulse-slow"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold backdrop-blur-md animate-fade-in-up">
          <FaTag /> Wholesale Prices for Everyone
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-[1.1]">
          Premium Hardware. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Wholesale Rates.
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Don't pay retail. Get <strong>Original Corporate Pulled</strong> RAM,
          SSD, and Laptops directly from the source. Tested. Verified.
          Guaranteed.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-bold bg-slate-900/50 border border-slate-700 px-5 py-2.5 rounded-xl backdrop-blur-sm">
            <FaShieldAlt className="text-emerald-500" /> 7 Days Warranty
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-sm font-bold bg-slate-900/50 border border-slate-700 px-5 py-2.5 rounded-xl backdrop-blur-sm">
            <FaCheckCircle className="text-emerald-500" /> 100% Original
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
