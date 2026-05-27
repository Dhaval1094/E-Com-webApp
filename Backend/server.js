const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");
console.log("Auth routes loaded");

const productRoutes =
  require("./routes/productRoutes");
console.log("Product routes loaded");

const orderRoutes =
  require("./routes/orderRoutes");
console.log("Order routes loaded");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "../Frontend")
  )
);

app.get("/", (req, res) => {

  console.log("GET / route hit");

  res.send("Backend running 🚀");
});

app.use(authRoutes);

app.use(productRoutes);

app.use(orderRoutes);

app.listen(3000, () => {
console.log("Loading routes...");
  console.log(
    "Server running on port 3000 🚀"
  );
});