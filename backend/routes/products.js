const express = require('express');
const router = express.Router();
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productsController');

router.get('/', getProducts);


module.exports = router;