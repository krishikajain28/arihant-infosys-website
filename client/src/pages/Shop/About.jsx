import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-emerald-400 mb-6">
          About Arihant Infosys
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Established in Mumbai, Arihant Infosys is a premier provider of
          enterprise-grade refurbished hardware. We specialize in sourcing
          high-performance components from corporate liquidations and data
          centers, rigorously testing them, and offering them to consumers at a
          fraction of the market price.
        </p>
        {/* We will expand this later with images of the shop/office */}
      </div>
      <Footer />
    </div>
  );
};

export default About;
