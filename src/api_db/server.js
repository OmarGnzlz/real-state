const express = require('express')

const config = require('../config/index')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

app.listen(config.mysql_api.port, console.log(`http://localhost${config.mysql_api.port}`))

