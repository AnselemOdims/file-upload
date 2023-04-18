const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const path = require('path')
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
require('express-async-errors')

const productRouter = require('./routes/productRoute')
const errorHandler = require('./middleware/errorHandler')
const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use(cors())
app.use(helmet())
app.use(xss())

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true
}))

app.use(express.static(path.resolve('./public')))
app.use('/api/v1/products', productRouter)

app.use(errorHandler)

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
}

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start();