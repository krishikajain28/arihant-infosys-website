require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`caught error : `, err);
  });

const productRoute = require("./routes/products");
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("arihant infosys server running");
});

app.listen(PORT, () => {
  console.log(`Backend is liveyy at port: ${PORT}`);
});
