const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
    default: "Pulled",
  },
  health: {
    type: Number,
    required: false,
  },

  images: {
    type: [String],
    default: [],
  },

  specs: {
    capacity: { type: String, default: "" },
    type: { type: String, default: "" },
    speed: { type: String, default: "" },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
