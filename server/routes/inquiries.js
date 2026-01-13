const router = require("express").Router();
const Inquiry = require("../models/Inquiry");

// 1. POST: Create a new Inquiry (This receives data from your Contact Form)
router.post("/", async (req, res) => {
  try {
    const newInquiry = new Inquiry({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to save inquiry", details: err });
  }
});

// 2. GET: View all Inquiries (For you to see later in Admin Panel)
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
