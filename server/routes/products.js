const router = require("express").Router();
const Product = require("../models/Product");

// POST: Add a new item to inventory
router.post("/", async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body); // LOG 1: What did we receive?
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log("✅ Saved Successfully!");
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ SAVE FAILED:", err.message); // LOG 2: Why did it fail?
    res.status(500).json(err);
  }
});

// GET: Fetch all inventory
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
