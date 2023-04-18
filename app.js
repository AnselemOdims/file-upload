const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const path = require('path')

require('dotenv').config();
require('express-async-errors')

const productRouter = require('./routes/productRoute')
const app = express()

app.use(cors())
app.use(helmet())
app.use(xss())

app.use(express.json());

app.use('/api/v1/products', productRouter)

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