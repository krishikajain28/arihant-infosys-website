import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { API_URL } from "../../config"; // 🟢 1. ADD THIS IMPORT
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaBuilding,
  FaQuestionCircle,
  FaFileInvoiceDollar,
  FaShippingFast,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bulk Order",
    message: "",
  });

  const [status, setStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🟢 2. USE THE VARIABLE HERE
      await axios.post(`${API_URL}/inquiries`, formData);

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Bulk Order",
        message: "",
      });

      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative h-[350px] w-full bg-slate-950 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <img
            src="/images/bg/contact.png"
            alt="Contact Support"
            className="w-full h-full object-cover object-center opacity-30 grayscale"
          />
          {/* Solid Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/80"></div>

          {/* Subtle fade at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-10">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">
            <FaBuilding /> Arihant Infosys HQ
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Get in <span className="text-emerald-500">Touch.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Visit our store at Lamington Road or request a quote for bulk
            orders. <br />
            We reply to all inquiries within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 2. LEFT COLUMN: CONTACT DETAILS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2 border-b border-slate-800 pb-4">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Contact Info
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    Call Us
                  </h4>
                  <p className="text-slate-300 text-sm mt-1">+91 97027 30050</p>
                  <p className="text-slate-500 text-xs">Mon-Sat, 10am - 8pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    Email Us
                  </h4>
                  <p className="text-slate-300 text-sm mt-1">
                    support@arihantinfosys.com
                  </p>
                  <p className="text-slate-500 text-xs">
                    For quotes & invoices
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-red-400 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    Visit Store
                  </h4>
                  <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                    Shop No. 12, Ground Floor,
                    <br />
                    Lamington Road, Grant Road East,
                    <br />
                    Mumbai - 400007
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.123456789!2d72.81!3d18.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDU3JzM2LjAiTiA3MsKwNDknMTIuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) brightness(85%)",
                }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
              <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs px-3 py-1 rounded-full border border-slate-700 backdrop-blur-sm">
                Grant Road East
              </div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: QUOTE FORM */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Request a Quote
                </h2>
                <p className="text-slate-400 mb-8">
                  Fill out the form below for bulk pricing or specific part
                  inquiries.
                </p>

                {/* SUCCESS MESSAGE */}
                {status === "success" && (
                  <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-fadeIn">
                    <FaCheckCircle className="text-xl" />
                    <div>
                      <p className="font-bold">Message Sent!</p>
                      <p className="text-sm text-emerald-400/80">
                        Our team will contact you via WhatsApp/Email shortly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="company@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    {/* Subject Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Inquiry Type
                      </label>
                      <select
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      >
                        <option>Bulk Order (Office/Lab)</option>
                        <option>Individual Purchase</option>
                        <option>Warranty / Support</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Message / Requirements
                    </label>
                    <textarea
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all h-32 resize-none placeholder:text-slate-600"
                      placeholder="I need 10 units of 16GB DDR4 RAM for my office..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1"
                  >
                    <FaPaperPlane /> Send Inquiry
                  </button>
                </form>

                {/* WhatsApp Alternative */}
                <div className="mt-8 text-center pt-6 border-t border-slate-800">
                  <p className="text-slate-500 text-sm mb-3">
                    Need a faster response?
                  </p>
                  <a
                    href="https://wa.me/919702730050"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 font-bold border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 rounded-full hover:bg-emerald-500/20 transition-colors"
                  >
                    <FaWhatsapp size={20} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FAQ / TRUST STRIP */}
        <div className="mt-20 pt-12 border-t border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
              <FaFileInvoiceDollar className="text-emerald-500 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Do you provide GST Invoices?
              </h3>
              <p className="text-slate-400 text-sm">
                Yes. We provide valid GST invoices for all corporate and bulk
                orders. Mention your GSTIN in the form.
              </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
              <FaShippingFast className="text-blue-500 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Do you ship outside Mumbai?
              </h3>
              <p className="text-slate-400 text-sm">
                Yes. We ship Pan-India via reliable courier partners. Shipping
                is usually free for orders above ₹5000.
              </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
              <FaQuestionCircle className="text-purple-500 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                What is the Warranty?
              </h3>
              <p className="text-slate-400 text-sm">
                All pulled parts come with a 7-Day Testing Warranty. If it
                doesn't work, we replace it immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
