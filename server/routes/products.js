const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const { storage } = require("../config/cloudinary");

// Initialize Multer
const upload = multer({ storage });

// 1. GET PRODUCTS (OPTIMIZED & SANITIZED)
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;

    if (qCategory) {
      // If category is provided, fetch ONLY that category (Faster)
      products = await Product.find({
        category: { $in: [qCategory] },
      }).sort({ createdAt: -1 });
    } else {
      // Fetch all (Reverse order to show newest first)
      products = await Product.find().sort({ createdAt: -1 });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch Error:", err); // Log error in terminal
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 2. GET SINGLE PRODUCT (BY ID)
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. POST PRODUCT (WITH IMAGE)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.file ? [req.file.path] : [], // Handle image safely
    };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Product creation failed" });
  }
});

// 4. DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
