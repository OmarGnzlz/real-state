const express = require('express')
const router = express.Router()
const controller = require('./index')
const response = require('../../../network/response')
const passport = require('passport')

require('../../../strategies/basic')

router.post('/login',  (req, res, next) => {
    
    passport.authenticate('basic', async(error, user) => {
        try {
            if(error || !user) {
                throw new Error("Password or User incorrect")
            }
    
            req.login(user, { session: false }, (error) => {
                if(error){
                    next (error)
                }
            })
    
            const token = await controller.createToken(user)

            res.cookie('token', token,{
                httpOnly: true,
                secure: false
            })

            response.success(req, res, {token, 'System': 'User loged in'}, 201)
       
        } catch (error) {
            response.error(req, res, error.message, 404)
        }
    })(req, res, next)
})

module.exports = router