import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "../../components/home/Hero";
import Marquee from "../../components/home/Marquee";
import CategoryBento from "../../components/home/CategoryBento";
import LatestArrivals from "../../components/home/LatestArrivals";
import TrustSection from "../../components/home/TrustSection";
import SEO from "../../components/SEO";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <SEO title="Home" />
      <Navbar />

      {/* 1. HERO SECTION */}
      <Hero />

      <div>
        <br />
      </div>

      {/* 2. SCROLLING MARQUEE */}
      <Marquee />

      {/* 3. LATEST ARRIVALS (Grid of 8) */}
      <LatestArrivals />

      {/* 4. PRODUCTS WE SELL (Bento Grid) */}
      <CategoryBento />

      {/* 5. TRUST & REVIEWS */}
      <TrustSection />

      <Footer />
    </div>
  );
};

export default Home;
