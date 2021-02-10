const users = require('./components/users/network')
const auth = require('./components/auth/network')
const post = require('./components/post/network')

const routes = app => {
    app.use('/users', users)
    app.use('/auth', auth)
    app.use('/post', post)
}

module.exports = routes