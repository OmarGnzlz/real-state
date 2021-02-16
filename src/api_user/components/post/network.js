const express = require('express')
const router = express.Router()
const controller = require('./index')
const response = require('../../../network/response')
const passport = require('passport')

require('../../../strategies/jwt')

router.get('/list', async(req, res) => {
    try {
        const posts = await controller.listPost()

        response.success(req, res, posts, 201)
    } catch (error) {
        response.success(req, res, error.message, 404)
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const post = await controller.getPost(req.params.id)
        
        response.success(req, res, post, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.post('/create/:id',(req, res, next) => {
    passport.authenticate('jwt', async(error, user) => {
        try {

            const { id } = req.params

            if(!(user.body[0].id === id)){
                throw new Error('Not Allow' || error)
            }

            const result = await controller.createPost(id, req.body)
    
            response.success(req, res, result, 201)
        } catch (error) {
            response.error(req, res, error.message, 500)
        }
    })(req, res, next)
})

module.exports = router