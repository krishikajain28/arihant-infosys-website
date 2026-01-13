const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Auto-removes extra spaces
      index: true, // Makes searching this field faster
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // Selling Price (Your Deal Price)
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Original MRP (To show "50% OFF")
    mrp: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },
    condition: {
      type: String,
      default: "Pulled",
      enum: ["Brand New", "Refurbished", "Pulled", "Open Box"], // Strict validation
    },

    images: {
      type: [String],
      default: [],
    },

    // 🟢 ENHANCED SPECS OBJECT
    specs: {
      capacity: { type: String, default: "", trim: true }, // e.g. "1TB"
      type: { type: String, default: "", trim: true }, // e.g. "DDR4"
      speed: { type: String, default: "", trim: true }, // e.g. "3200MHz"
      health: { type: String, default: "" }, // e.g. "95%"
      formFactor: { type: String, default: "" }, // e.g. "M.2 2280"
      interface: { type: String, default: "" }, // e.g. "NVMe Gen3"
    },

    // Flag to highlight item on Home Page (e.g. "Hot Deal")
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// VIRTUAL: Calculate Discount Percentage automatically
productSchema.virtual("discount").get(function () {
  if (this.mrp > this.price) {
    return Math.round(((this.mrp - this.price) / this.mrp) * 100);
  }
  return 0;
});

module.exports = mongoose.model("Product", productSchema);
