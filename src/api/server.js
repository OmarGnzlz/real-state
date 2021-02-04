const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()

const config = require('../config/index')
const router = require('./routes')

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


app.listen(config.port, console.log(`http://localhost:${config.port}`))