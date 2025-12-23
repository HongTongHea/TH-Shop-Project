const db = require("../config/database");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { name, price };
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
