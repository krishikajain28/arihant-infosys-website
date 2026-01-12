import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold text-white mb-8">
          Privacy Policy & Terms
        </h1>

        <div className="space-y-8">
          <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              1. General Terms
            </h2>
            <p>
              By purchasing from Arihant Infosys, you agree that you are buying
              <strong> Pulled / Refurbished / Open Box</strong> hardware. These
              are not factory-sealed brand new items unless explicitly stated.
            </p>
          </section>

          <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              2. Warranty Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                All items come with a <strong>7-Day Testing Warranty</strong>{" "}
                from the date of delivery.
              </li>
              <li>
                Warranty covers functional defects (e.g., RAM not detected, SSD
                health low).
              </li>
              <li>
                Warranty <strong>does NOT cover</strong> physical damage, burns,
                or liquid damage caused by the user.
              </li>
              <li>
                Return shipping costs for warranty claims are borne by the
                buyer.
              </li>
            </ul>
          </section>

          <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              3. Shipping & Delivery
            </h2>
            <p>
              We ship via Delhivery / DTDC. Orders are typically dispatched
              within 24 hours. Tracking ID will be shared on WhatsApp. We are
              not responsible for courier delays due to weather or local
              strikes.
            </p>
          </section>

          <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              4. Refunds
            </h2>
            <p>
              Refunds are only processed if a replacement unit is unavailable.
              Refunds will be initiated within 48 hours of receiving the faulty
              return.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
