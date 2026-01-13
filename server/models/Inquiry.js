const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      default: "General Inquiry",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "Contacted", "Closed"], // Helps you track leads
    },
  },
  {
    timestamps: true, // Auto-adds createdAt time
  }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
