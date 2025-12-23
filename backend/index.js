const express = require("express");
const cors = require("cors");

const productsRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
