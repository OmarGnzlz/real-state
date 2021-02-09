const express = require('express')
const router = express.Router()
const response = require('../network/response')
const store = require('../store/mysql')

router.get('/:table', async (req, res) => {
    try {
        const data = await store.list(req.params.table)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.get('/:table/:id', async (req, res) => {
    try {

        const { table, id } = req.params

        const data = await store.get(table, id)

        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.get('/:table/:email', async (req, res) => {
    try {

        const { table, email } = req.params

        const data = await store.get(table, email)

        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.delete('/:table/:id', async (req, res) => {
    try {

        const { table, id } = req.params

        const data = await store.remove(table, id)

        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 404)
    }
})

router.post('/:table/', async (req, res) => {
    try {

        const data = await store.create(req.params.table, req.body)

        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
})

router.put('/:table/:id', async (req, res) => {
    try {

        const { table, id } = req.params

        const data = await store.update(table,id, req.body)

        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
})


module.exports = router