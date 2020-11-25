const express = require('express')
const app = express()

const config = require('./config/index')
const router = require('./api/routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)


app.listen(config.port, console.log(`http://localhost:${config.port}`))