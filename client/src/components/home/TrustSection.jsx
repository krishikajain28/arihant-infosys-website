import { FaVideo, FaUndo, FaShieldAlt } from "react-icons/fa";

const TrustSection = () => {
  const features = [
    {
      icon: <FaUndo />,
      title: "7 Days Replacement",
      desc: "If it doesn't work, we replace it. No questions asked. Your money is safe.",
    },
    {
      icon: <FaVideo />,
      title: "Live Video Proof",
      desc: "We send you a video of the product working on WhatsApp BEFORE you pay.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Original Pulls Only",
      desc: "We do not sell repaired or 'serviced' junk. Only clean corporate pulls.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase">
            Why Choose Arihant
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            We Don't Sell{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Junk.
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The refurbished market is full of repaired electronic waste. We are
            different. We source, we test, and we prove it to you.
          </p>
        </div>

        {/* 3 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl text-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-black/50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
