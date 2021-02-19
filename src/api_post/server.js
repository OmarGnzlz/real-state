const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const config = require('../config/index')
const router = require('./routes')
const errors = require('../network/errors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(session({ 
    secret: "superkey",
    resave: false,
    saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())

router(app)

app.use(errors)



app.listen(config.post_api.port, console.log(`http://localhost:${config.post_api.port}`))