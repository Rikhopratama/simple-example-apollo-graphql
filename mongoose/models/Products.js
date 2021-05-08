const mongoose = require('mongoose');
const ProductsSchema = require('../schema/Products');

const ProductModel = mongoose.model('Products', ProductsSchema, 'products');

module.exports = ProductModel;
