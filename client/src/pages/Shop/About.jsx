import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaCheckCircle,
  FaHandshake,
  FaRecycle,
  FaAward,
  FaTools,
  FaShippingFast,
  FaBuilding,
  FaUsers,
  FaMicrochip,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Products Sold", value: "5000+" },
    { label: "Verified Clients", value: "4500+" },
    { label: "Testing Standard", value: "100%" },
  ];

  const timeline = [
    {
      step: "01",
      title: "Sourcing",
      desc: "We acquire bulk lots directly from corporate IT liquidations and MNC data centers.",
    },
    {
      step: "02",
      title: "Testing",
      desc: "Each component undergoes a 24-hour stress test (MemTest86 for RAM, Sentinel for HDD).",
    },
    {
      step: "03",
      title: "Grading",
      desc: "We strictly categorize items. Only 'Grade A' pulled parts make it to our inventory.",
    },
    {
      step: "04",
      title: "Delivery",
      desc: "Securely packed in anti-static bags and shipped with a testing warranty.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* 1. HERO SECTION (Parallax) */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg/about.png"
            alt="Arihant Infosys Warehouse"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <FaBuilding /> Est. Mumbai, 2018
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            We Bridge the Gap Between <br />
            <span className="text-emerald-500">Performance</span> &{" "}
            <span className="text-white">Price.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Arihant Infosys was founded with a simple mission: To make
            enterprise-grade hardware accessible to students, gamers, and
            professionals in Mumbai without the retail markup.
          </p>
        </div>
      </div>

      {/* 2. STATS STRIP */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm relative z-20 -mt-10 mx-6 rounded-2xl shadow-2xl max-w-6xl lg:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-8 text-center divide-x divide-slate-800/50">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-emerald-500 uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OUR STORY & IMAGE SPLIT */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Not Just A Shop. <br />
              We Are{" "}
              <span className="text-emerald-500">Technical Experts.</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Located in the heart of Mumbai's tech hub,{" "}
                <strong className="text-white">Grant Road</strong>, Arihant
                Infosys is a trusted name in the refurbished market. Unlike
                typical traders who just move boxes, we understand the
                architecture.
              </p>
              <p>
                Our inventory comes directly from{" "}
                <strong className="text-white">Corporate Data Centers</strong>{" "}
                and IT liquidations. These are components built to run 24/7—far
                superior to standard consumer-grade parts found in retail
                stores.
              </p>
              <p>
                When you buy from us, you aren't buying "Used junk". You are
                buying <strong>Enterprise Surplus</strong> that has 90% of its
                life remaining, at 30% of the cost.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/products"
                className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-all"
              >
                View Inventory <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Image 1: The Lab/Tech */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-emerald-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src="/images/bg/about1.png"
                alt="Hardware Testing Lab"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 to-transparent p-6">
                <span className="text-white font-bold flex items-center gap-2">
                  <FaTools className="text-emerald-400" /> 100% Tested Logic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE PROCESS (How we verify) */}
      <div className="bg-slate-900 border-y border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Arihant Standard.
            </h2>
            <p className="text-slate-400">
              We don't sell blind. Every item follows a strict 4-step quality
              control process before it lists on this website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-6xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors absolute -top-8 -left-2 select-none z-0">
                  {item.step}
                </div>
                <div className="relative z-10 bg-slate-950 border border-slate-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors h-full">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. SECONDARY STORY & STOCKPILE */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image 2: The Stock */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="/images/bg/about2.png"
                alt="Warehouse Inventory"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-white">Who We Serve?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800 text-emerald-400">
                  <FaBuilding size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Offices & Startups
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Setting up a new office? We provide bulk laptops and servers
                    at a fraction of the cost of new equipment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800 text-purple-400">
                  <FaUsers size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Students & Freelancers
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Need power on a budget? Upgrade your old laptop with SSDs
                    and RAM to make it fly again.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800 text-blue-400">
                  <FaMicrochip size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Dealers & Repair Shops
                  </h4>
                  <p className="text-slate-400 text-sm">
                    We are the backend supplier for many repair shops in Mumbai.
                    Wholesale rates available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. CTA */}
      <div className="pb-16 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Upgrade?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Whether you need one stick of RAM or 50 Laptops, we treat every
              order with the same priority.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/products"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
              >
                Browse Stock
              </Link>
              <Link
                to="/contact"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg border border-slate-600 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
