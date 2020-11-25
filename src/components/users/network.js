const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("onlide inside it")
})

module.exports = router