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

// 3. POST PRODUCT (UPDATED FOR NEW SCHEMA)
router.post("/", (req, res) => {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, async (err) => {
    if (err) {
      console.log("-----------------------------------------");
      console.error("🔴 UPLOAD ERROR DETECTED:", err);
      console.log("-----------------------------------------");
      return res
        .status(500)
        .json({ error: "Image Upload Failed", details: err.message });
    }

    try {
      console.log(
        "🟢 Image Uploaded Successfully:",
        req.file ? req.file.path : "No File"
      );

      const productData = {
        // BASIC INFO
        title: req.body.title,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        mrp: req.body.mrp, // 🟢 Added MRP
        stock: req.body.stock,
        condition: req.body.condition,
        isFeatured: req.body.isFeatured === "true", // Convert string "true" to Boolean

        // ENHANCED SPECS
        specs: {
          capacity: req.body.capacity,
          type: req.body.type,
          speed: req.body.speed,
          health: req.body.health,
          formFactor: req.body.formFactor, // 🟢 Added Form Factor (M.2/SATA)
          interface: req.body.interface, // 🟢 Added Interface (NVMe/Gen3)
        },

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

// 5. UPDATE PRODUCT
router.put("/:id", (req, res) => {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, async (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Upload Failed", details: err.message });

    try {
      // 1. Find the existing product to keep old image if needed
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) return res.status(404).json("Product not found");

      // 2. Prepare the update data
      const updateData = {
        title: req.body.title,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        mrp: req.body.mrp,
        stock: req.body.stock,
        condition: req.body.condition,
        isFeatured: req.body.isFeatured === "true",

        specs: {
          capacity: req.body.capacity,
          type: req.body.type,
          speed: req.body.speed,
          health: req.body.health,
          formFactor: req.body.formFactor,
          interface: req.body.interface,
        },

        // If new file exists, use it. Otherwise, keep existing images.
        images: req.file ? [req.file.path] : existingProduct.images,
      };

      // 3. Update in Database
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );

      res.status(200).json(updatedProduct);
    } catch (dbErr) {
      res.status(500).json(dbErr);
    }
  });
});

module.exports = router;
