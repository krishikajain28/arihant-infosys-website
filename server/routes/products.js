const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const { storage } = require("../config/cloudinary");

// Initialize Multer
const upload = multer({ storage });

// 1. GET PRODUCTS
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory) {
      products = await Product.find({
        category: { $in: [qCategory] },
      }).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 2. GET SINGLE PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. POST PRODUCT (WITH SAFETY NET LOGGING)
router.post("/", (req, res) => {
  // We call the uploader manually to catch its errors
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, async (err) => {
    if (err) {
      // IF UPLOAD FAILS, THIS WILL PRINT THE EXACT REASON
      console.log("-----------------------------------------");
      console.error("🔴 UPLOAD ERROR DETECTED:", err);
      console.log("Check your Cloudinary Keys in .env!");
      console.log("-----------------------------------------");
      return res
        .status(500)
        .json({ error: "Image Upload Failed", details: err.message });
    }

    // IF SUCCESS, SAVE TO DB
    try {
      console.log(
        "🟢 Image Uploaded Successfully:",
        req.file ? req.file.path : "No File"
      );

      const productData = {
        ...req.body,
        images: req.file ? [req.file.path] : [],
      };

      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (dbErr) {
      console.error("Database Error:", dbErr);
      res.status(500).json(dbErr);
    }
  });
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
