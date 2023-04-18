const express = require('express')

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({
        msg: "Welcome to File Upload"
    })
})

module.exports = router