const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["RAM", "SSD", "HOD", "CPU", "GPU", "Laptop"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  condition: {
    type: String,
    enum: ["Brand New", "Open Box", "Pulled", "Refurbished"],
    default: "Pulled",
  },
  // Only for Pulled/Refurb items (e.g., "90% Health")
  health: {
    type: Number,
    min: 0,
    max: 100,
  },
  specs: {
    capacity: String, // e.g., "16GB", "512GB"
    type: String, // e.g., "DDR4", "NVMe"
    speed: String, // e.g., "3200MHz", "2400T"
    formFactor: String, // e.g., "2280", "SODIMM"
    serialNumber: String, // To track specific units
  },

  // images (we will store urls here)
  images: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
