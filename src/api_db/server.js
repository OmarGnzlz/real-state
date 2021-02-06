const express = require('express')

const config = require('../config/index')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

app.listen(3001, console.log(`http://localhost:3001`))

