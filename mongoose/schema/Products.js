const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.ObjectId },
  product_code: { type: String },
  product_name: { type: String },
  product_description: { type: String },
  product_qty: { type: Number },
  product_uom: { type: String },
  product_category_id: { type: Number },
  product_price: { type: Number },
});

module.exports = ProductsSchema;
