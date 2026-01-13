import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSpinner,
  FaSave,
} from "react-icons/fa";

const EditProductForm = ({ product, onClose, onProductUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(product.images[0] || "");

  // Initialize state with existing product data
  const [formData, setFormData] = useState({
    title: product.title || "",
    brand: product.brand || "",
    category: product.category || "RAM",
    price: product.price || "",
    mrp: product.mrp || "",
    stock: product.stock || "1",
    condition: product.condition || "Pulled",
    // Specs
    capacity: product.specs?.capacity || "",
    type: product.specs?.type || "",
    speed: product.specs?.speed || "",
    health: product.specs?.health || "",
    formFactor: product.specs?.formFactor || "",
    interface: product.specs?.interface || "",
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
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    // Only append image if a new one was selected
    if (file) {
      data.append("image", file);
    }

    try {
      // PUT request to update
      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onProductUpdated();
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Edit Inventory{" "}
            <span className="text-slate-500 text-sm">
              #{product._id.slice(-4)}
            </span>
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {success ? (
          <div className="p-20 flex flex-col items-center justify-center text-emerald-400">
            <FaCheckCircle size={60} className="mb-4" />
            <h3 className="text-2xl font-bold">Changes Saved!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* IMAGE PREVIEW */}
            <div className="flex gap-4 items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700">
              <div className="h-20 w-20 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={preview}
                  alt="Current"
                  className="h-full object-contain"
                />
              </div>
              <div className="flex-grow">
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                  Change Image (Optional)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600"
                />
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1"
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
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
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
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white mt-1"
                />
              </div>
            </div>

            {/* PRICING */}
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
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
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded-lg p-3 text-white font-bold mt-1"
                />
              </div>
            </div>

            {/* SPECS */}
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700">
              <h4 className="text-emerald-400 text-sm font-bold mb-3 uppercase">
                Technical Specs
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <input
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Capacity"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Type"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                  placeholder="Speed"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="health"
                  value={formData.health}
                  onChange={handleChange}
                  placeholder="Health %"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="formFactor"
                  value={formData.formFactor}
                  onChange={handleChange}
                  placeholder="Form Factor"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
                <input
                  name="interface"
                  value={formData.interface}
                  onChange={handleChange}
                  placeholder="Interface"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
                />
              </div>
            </div>

            {/* SAVE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <FaSave /> Save Changes
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProductForm;
