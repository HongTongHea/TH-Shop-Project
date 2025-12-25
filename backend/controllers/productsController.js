const db = require("../config/database");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  const { name, brand, description, price, stock_quantity, category, image, barcode, discount } = req.body;
  const newProduct = { name, brand, description, price, stock_quantity, category, image , barcode, discount};
  db.query("INSERT INTO products SET ?", newProduct, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({
        message: "Product added successfully",
        productId: result.insertId,
      });
  });
};
