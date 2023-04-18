const Product = require('../model/Product');
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
    const { body } = req
    const product = await Product.create(body)
    res.status(StatusCodes.CREATED).json({
        code: '00',
        msg: 'Product created successfully',
        product
    })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({
        code: '00',
        msg: 'All products retrieved successfully',
        products
    })
}

module.exports = {
    createProduct,
    getAllProducts
}