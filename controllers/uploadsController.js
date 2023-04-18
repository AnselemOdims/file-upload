const Product = require('../model/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { badRequestError } = require('../utils/CustomError')

const uploadProductImage = async (req, res) => {
    if(!req.files) {
        throw badRequestError('No file uploaded')
    }

    const { image } = req.files;
    if(!image.mimetype.startsWith('image')) {
        throw badRequestError('Please upload an image file')
    }
    const maxSize = 1024 * 1024 * 2;
    if(image.size > maxSize) {
        throw badRequestError('File size should not be larger than 2MB')
    }
    const filePath = path.join(__dirname, `../public/uploads/${image.name}`)
    await image.mv(filePath)
    res.status(StatusCodes.OK).json({
        code: '00',
        msg: 'Image uploaded successfully',
        image: {
            src: `/uploads/${image.name}`
        }
    })
}

module.exports = {
    uploadProductImage
}