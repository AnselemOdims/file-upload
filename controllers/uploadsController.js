const Product = require('../model/Product')
const { StatusCodes} = require('express-async-errors')

const uploadProductImage = (req, res) => {
    res.send("Upload Product Image")
}

module.exports = {
    uploadProductImage
}