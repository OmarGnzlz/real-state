const express = require('express')
const router = express.Router()
const controller = require('./index')
const response = require('../../../network/response')
const passport = require('passport')

require('../../strategies/jwt')

router.get('/list', async(req, res) => {
    try {
        const user = await controller.lisUsers()
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.get('/user/:id', async(req, res) => {
    try {
        const user = await controller.getUser(req.params.id)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.post('/create', async(req, res) => {
    try {
        const newUser = await controller.createUser(req.body)
        response.success(req, res, newUser, 201)
    } catch (error) {
        response.error(req, res, error.message, 505)
    }
})


router.delete('/delete/:id', async(req, res) => {
    try {
        const user = await controller.deleteUser(req.params.id)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 505)
    }
})


/* router.put('/update/:id',passport.authenticate('jwt', { session: false }) ,async(req, res) => {
    try {
        const { id } = req.params
        
        const user = await controller.userUpdate(id, req.body)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 505)
    }
}) */

router.put('/update/:id', (req, res, next) => {
    passport.authenticate('jwt', async(error, user) => {
        try {
            const { id } = req.params
            
            if(!(user[0].id === id)){
                throw new Error("Not Allow")
            }
            
            const result = await controller.userUpdate(id, req.body)
            response.success(req, res, result, 201)
        } catch (error) {
            response.error(req, res, error.message, 505)
        }
    })(req, res , next)
})


module.exports = router