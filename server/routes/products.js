const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const { storage } = require("../config/cloudinary");

// Initialize Multer with Cloudinary Storage
const upload = multer({ storage });

// POST: Add a new item with Image Upload
// Note: 'image' matches the name attribute we will use in the frontend form
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // 1. Prepare Data
    // req.body contains the text fields
    // req.file contains the Cloudinary image data

    const productData = {
      ...req.body,
      // If an image was uploaded, save its URL. Else, leave it empty.
      images: req.file ? [req.file.path] : [],
    };

    // 2. Create Product
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Upload Error:", err);
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
