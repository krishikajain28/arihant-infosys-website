import { useState } from "react";
import axios from "axios";
import {
  FaTimes,
  FaSave,
  FaMicrochip,
  FaCloudUploadAlt,
  FaCheck,
} from "react-icons/fa";

const AddProductForm = ({ onClose, onProductAdded }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // STATE FOR THE IMAGE

  const [formData, setFormData] = useState({
    title: "",
    category: "RAM",
    brand: "",
    price: "",
    stock: 1,
    condition: "Pulled",
    health: 100,
    // Specs
    capacity: "",
    type: "",
    speed: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HANDLE FILE SELECTION
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. CREATE THE CARGO TRUCK (FormData)
      const data = new FormData();

      // 2. LOAD THE TEXT DATA
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("condition", formData.condition);
      if (formData.category === "SSD") {
        data.append("health", formData.health);
      }

      // Flatten the specs object into individual keys
      data.append("capacity", formData.capacity);
      data.append("type", formData.type);
      data.append("speed", formData.speed);

      // 3. LOAD THE IMAGE (If selected)
      // "image" must match the backend upload.single("image")
      if (file) {
        data.append("image", file);
      }

      // 4. SEND THE TRUCK
      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to upload. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div // OLD: "bg-slate-800 w-full max-w-2xl rounded-2xl..."
      // NEW:
      className="bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-700 overflow-hidden relative animation-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar"
    >
      {/* HEADER */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Add Inventory</h2>
          <p className="text-slate-400 text-sm">
            Upload hardware details & photos.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-full transition-all"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* SECTION 1: IMAGE UPLOAD (THE NEW PART) */}
        <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-900/30 group cursor-pointer relative">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          {file ? (
            <div className="flex flex-col items-center">
              <FaCheck className="text-emerald-500 text-3xl mb-2" />
              <p className="text-emerald-400 font-medium">{file.name}</p>
              <p className="text-slate-500 text-xs">Ready to upload</p>
            </div>
          ) : (
            <div className="flex flex-col items-center group-hover:text-emerald-400 text-slate-400 transition-colors">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="font-medium">Click to Upload Product Image</p>
              <p className="text-slate-500 text-xs">JPG, PNG, WebP (Max 5MB)</p>
            </div>
          )}
        </div>

        {/* SECTION 2: BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Product Title
            </label>
            <input
              name="title"
              placeholder="e.g. Samsung 8GB DDR4 3200MHz Laptop RAM"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-all placeholder-slate-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white appearance-none focus:border-emerald-500 outline-none"
              >
                <option value="RAM">RAM Memory</option>
                <option value="SSD">SSD Storage</option>
                <option value="HDD">Hard Drive (HDD)</option>
                <option value="NVMe">NVMe / M.2</option>
                <option value="CPU">Processor (CPU)</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop PC</option>
                <option value="Server">Server</option>
                <option value="Workstation">Workstation</option>
              </select>
              <div className="absolute right-3 top-3.5 text-slate-500 pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Brand
            </label>
            <input
              name="brand"
              placeholder="Samsung, Hynix, WD..."
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
              required
            />
          </div>
        </div>

        {/* SECTION 3: SPECS */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <FaMicrochip /> Technical Specifications
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              name="capacity"
              placeholder="Size (16GB)"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-emerald-500 outline-none"
            />
            <input
              name="type"
              placeholder="Type (DDR4/NVMe)"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-emerald-500 outline-none"
            />
            <input
              name="speed"
              placeholder="Speed (3200MHz)"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* SECTION 4: CONDITION & PRICING */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Condition
            </label>
            <select
              name="condition"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
            >
              <option value="Pulled">Pulled (Used)</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Brand New">Brand New</option>
              <option value="Open Box">Open Box</option>
            </select>
          </div>

          {formData.category === "SSD" && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Drive Health (%)
              </label>
              <input
                type="number"
                name="health"
                defaultValue="100"
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
              />
            </div>
          )}
        </div>

        {/* PRICING ROW */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-700">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Stock Qty
            </label>
            <input
              type="number"
              name="stock"
              defaultValue="1"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Selling Price (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-500">₹</span>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                onChange={handleChange}
                className="w-full bg-slate-900 border border-emerald-500/50 rounded-lg p-3 pl-8 text-white font-bold text-lg focus:border-emerald-500 outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            "Uploading to Cloud..."
          ) : (
            <>
              <FaSave /> Save to Inventory
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
