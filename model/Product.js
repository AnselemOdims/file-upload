const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
    },
    image: {
        type: String,
        required: [true, 'Please upload product image'],
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product