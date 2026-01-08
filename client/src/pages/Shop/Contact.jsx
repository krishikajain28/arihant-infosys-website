import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-16">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
            <FaWhatsapp className="text-5xl text-emerald-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-slate-400 mb-4">+91 97027 30058</p>
            <a
              href="https://wa.me/919702730058"
              className="text-emerald-400 font-bold hover:underline"
            >
              Chat Now
            </a>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
            <FaMapMarkerAlt className="text-5xl text-blue-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">Visit Store</h3>
            <p className="text-slate-400">
              Grant Road, Mumbai
              <br />
              Maharashtra, India
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center">
            <FaEnvelope className="text-5xl text-purple-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-slate-400">support@arihantinfosys.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
