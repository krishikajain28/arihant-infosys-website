import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaCheckCircle,
  FaHandshake,
  FaRecycle,
  FaAward,
  FaTools,
  FaShippingFast,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Products Sold", value: "5000+" },
    { label: "Happy Clients", value: "4500+" },
    { label: "Quality Checks", value: "100%" },
  ];

  const features = [
    {
      icon: <FaRecycle />,
      title: "Sustainable Tech",
      desc: "We source high-end electronics from corporate liquidations, preventing e-waste and giving hardware a second life.",
    },
    {
      icon: <FaTools />,
      title: "Rigorously Tested",
      desc: "Every RAM stick, SSD, and Laptop undergoes a 24-hour stress test. If it doesn't pass our benchmark, we don't sell it.",
    },
    {
      icon: <FaHandshake />,
      title: "Honest Pricing",
      desc: "No hidden middlemen. We sell directly to you at 50-70% off the original MRP. Enterprise performance at consumer prices.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-slate-900 py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            We Bridge the Gap Between <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Performance & Price.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Arihant Infosys was founded with a simple mission: To make
            enterprise-grade hardware accessible to students, gamers, and
            professionals in Mumbai.
          </p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="bg-slate-950 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-emerald-500 uppercase tracking-widest font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold">
              ESTABLISHED IN MUMBAI
            </div>
            <h2 className="text-3xl font-bold text-white">
              Not Just A Shop. <br />
              We Are Technical Experts.
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Located in the heart of Mumbai's tech hub,{" "}
              <strong>Grant Road</strong>, Arihant Infosys is a trusted name in
              the refurbished market. We don't just sell parts; we understand
              the architecture.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our inventory comes directly from{" "}
              <strong>Corporate Data Centers</strong> and IT liquidations. These
              are components built to run 24/7—far superior to standard
              consumer-grade parts found in retail stores.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4">
              <div className="flex items-center gap-3 text-slate-300">
                <FaCheckCircle className="text-emerald-500" />{" "}
                <span>7-Days Testing Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <FaCheckCircle className="text-emerald-500" />{" "}
                <span>Pan-India Shipping Available</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <FaCheckCircle className="text-emerald-500" />{" "}
                <span>Bulk Orders for Offices/Labs</span>
              </div>
            </div>
          </div>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors flex gap-4"
              >
                <div className="text-3xl text-emerald-500 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-emerald-600 to-cyan-700 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Upgrade?</h2>
            <p className="text-emerald-100 max-w-xl mx-auto">
              Visit our store in Grant Road or order online via WhatsApp.
              Quality hardware is waiting for you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-slate-100 transition-all transform hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
