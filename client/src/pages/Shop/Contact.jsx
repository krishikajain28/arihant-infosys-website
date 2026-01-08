import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    alert("Thank you! We will contact you shortly via Email/WhatsApp.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* HEADER */}
      <div className="bg-slate-900 pt-20 pb-10 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Let's Talk <span className="text-emerald-400">Hardware.</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Whether you need a bulk order for your office or a single stick of RAM
          for your laptop, we are here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: INFO & MAP */}
          <div className="space-y-8">
            {/* CONTACT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-bold text-white">Call Us</h3>
                  <p className="text-slate-400 text-sm">+91 97027 30058</p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold text-white">Email</h3>
                  <p className="text-slate-400 text-sm">
                    support@arihantinfosys.com
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3 md:col-span-2">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold text-white">Visit Store</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Shop No. 12, Ground Floor, Lamington Road, <br />
                    Grant Road (East), Mumbai - 400007
                  </p>
                </div>
              </div>
            </div>

            {/* MAP EMBED (Grant Road) */}
            <div className="w-full h-64 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.123456789!2d72.815!3d18.960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce74faaaaaaaaaaa%3A0xaaaaaaaaaaaaaa!2sLamington%20Rd%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
              {/* Note: Map style filter makes it dark mode-ish */}
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none"></div>

            <h2 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors h-32 resize-none"
                  placeholder="I am looking for..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>

            <div className="mt-8 text-center border-t border-slate-800 pt-6">
              <p className="text-slate-500 text-sm mb-4">
                Or chat instantly on WhatsApp
              </p>
              <a
                href="https://wa.me/919702730050"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
              >
                <FaWhatsapp size={20} /> Launch WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
