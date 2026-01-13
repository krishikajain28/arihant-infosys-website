import { useState } from "react";
import axios from "axios";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { API_URL } from "../../config";

const AddProductForm = ({ onClose, onProductAdded }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "RAM", // Default
    price: "",
    mrp: "", // 🟢 NEW: MRP for discounts
    stock: "1",
    condition: "Pulled",
    // Specs
    capacity: "",
    type: "",
    speed: "",
    health: "", // 🟢 NEW: Health %
    formFactor: "", // 🟢 NEW: e.g. M.2 2280
    interface: "", // 🟢 NEW: e.g. NVMe Gen3
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Append all text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    // Append image
    if (file) {
      data.append("image", file);
    }

    try {
      await axios.post(`${API_URL}/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onProductAdded();
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to upload product. Check console.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Add Inventory</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {success ? (
          <div className="p-20 flex flex-col items-center justify-center text-emerald-400">
            <FaCheckCircle size={60} className="mb-4" />
            <h3 className="text-2xl font-bold">Product Added!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 1. IMAGE UPLOAD */}
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:bg-slate-800/50 transition-all cursor-pointer relative group">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                required
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 object-contain"
                />
              ) : (
                <>
                  <FaCloudUploadAlt
                    size={40}
                    className="mb-2 group-hover:text-emerald-400"
                  />
                  <span className="text-sm font-semibold">
                    Click to Upload Image
                  </span>
                </>
              )}
            </div>

            {/* 2. MAIN DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Product Title
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1 focus:border-emerald-500 outline-none"
                  placeholder="e.g. WD Black SN750 1TB NVMe"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1 focus:border-emerald-500 outline-none"
                >
                  <option value="RAM">RAM Memory</option>
                  <option value="SSD">SSD (SATA)</option>
                  <option value="NVMe">NVMe (M.2)</option>
                  <option value="HDD">Hard Drive</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Server">Server Parts</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Brand
                </label>
                <input
                  name="brand"
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1"
                  placeholder="e.g. Samsung"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Condition
                </label>
                <select
                  name="condition"
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1"
                >
                  <option value="Pulled">Pulled (Used)</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Brand New">Brand New</option>
                  <option value="Open Box">Open Box</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Stock Qty
                </label>
                <input
                  type="number"
                  name="stock"
                  onChange={handleChange}
                  defaultValue="1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1"
                />
              </div>
            </div>

            {/* 3. PRICING (MRP & SELLING) */}
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  name="mrp"
                  onChange={handleChange}
                  placeholder="10000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-400 mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-emerald-400 uppercase">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  required
                  placeholder="4500"
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded-lg p-3 text-white font-bold mt-1"
                />
              </div>
            </div>

            {/* 4. TECH SPECS */}
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700">
              <h4 className="text-emerald-400 text-sm font-bold mb-3 uppercase flex items-center gap-2">
                <FaCheckCircle /> Technical Specs
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <input
                  name="capacity"
                  onChange={handleChange}
                  placeholder="Capacity (e.g. 1TB)"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="type"
                  onChange={handleChange}
                  placeholder="Type (e.g. DDR4)"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="speed"
                  onChange={handleChange}
                  placeholder="Speed (e.g. 3200MHz)"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="health"
                  onChange={handleChange}
                  placeholder="Health % (e.g. 95)"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="formFactor"
                  onChange={handleChange}
                  placeholder="Form Factor (e.g. M.2)"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="interface"
                  onChange={handleChange}
                  placeholder="Interface (e.g. Gen3)"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Save to Inventory"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
