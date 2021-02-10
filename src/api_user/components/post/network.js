const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../../network/response')

router.post('/create', async(req, res) => {
    try {
        const result = await controller.createPost(req.body)

        response.success(req, res, result, 201)
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
})

module.exports = router