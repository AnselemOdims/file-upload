const Product = require('../model/Product');
const { StatusCodes } = require('express-async-errors')

const createProduct = async (req, res) => {
    const { body } = req
    const product = await Product.create(body)
    res.status(StatusCodes.CREATED).json({
        code: '00',
        msg: 'Product created successfully',
        product
    })
}

const getAllProducts =(req, res) => {
    res.send("Get All Products")
}

module.exports = {
    createProduct,
    getAllProducts
}