const express = require('express')
const router = express.Router()
const controller = require('./index')
const response = require('../../../network/response')
const passport = require('passport')
const multer = require('multer')
const path = require('path')


require('../../../strategies/jwt')


const storage = multer.memoryStorage({
    destination: (req, file, cb ) => cb(null, ''),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage })


router.get('/list', async(req, res) => {
    try {
        const posts = await controller.listPost()

        response.success(req, res, posts, 201)
    } catch (error) {
        response.success(req, res, error.message, 404)
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const post = await controller.getPost(req.params.id)
        
        response.success(req, res, post, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await controller.getAPost(req.params.id)
        
        response.success(req, res, post, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.get('/location/:location', async (req, res) => {
    try {
        const post = await controller.filterLocation(req.params.location)
        
        response.success(req, res, post, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.get('/price/:range1/:range2', async (req, res) => {
    try {
        
        const { range1, range2 } = req.params
        
        const posts = await controller.filterPrice(range1, range2)
        
        response.success(req, res, posts, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.post('/create/:id', upload.fields([
    {name: 'image' , maxCount: 8}, 
    {name: 'video', maxCount: 1}]),
    (req, res, next) => {
    passport.authenticate('jwt', async(error, user) => {
        try {

            
            const { id } = req.params

            if(!(user.body[0].id === id)){
                throw new Error('Not Allow' || error)
            }
            const images = req.files.image
            const video = req.files.video[0]

            const result = await controller.createPost(id, req.body, images, video)
    
            response.success(req, res, result, 201)
        } catch (error) {
            response.error(req, res, error.message, 500)
        }
    })(req, res, next)
})

router.put('/update/:userId/:postId', upload.fields([
    {name: 'image' , maxCount: 8}, 
    {name: 'video', maxCount: 1}]),
    (req, res, next) => {
    passport.authenticate('jwt', async(error, user) => {
        try {

            const { userId, postId } = req.params

            if(!(user.body[0].id === userId)){
                throw new Error('Not Allow' || error)
            }

            const images = req.files.image
            const video = req.files.video[0]

            const result = await controller.updatePost(postId, req.body, images, video)
    
            response.success(req, res, result, 201)
        } catch (error) {
            response.error(req, res, error.message, 500)
        }
    })(req, res, next)
})

router.delete('/delete/:userId/:postId',(req, res, next) => {
    passport.authenticate('jwt', async(error, user) => {
        try {

            const { userId, postId } = req.params

            if(!(user.body[0].id === userId)){
                throw new Error('Not Allow' || error)
            }

            const result = await controller.deletePost(postId)
    
            response.success(req, res, result, 201)
        } catch (error) {
            response.error(req, res, error.message, 500)
        }
    })(req, res, next)
})
module.exports = router