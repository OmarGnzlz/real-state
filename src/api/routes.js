const users = require('./components/users/network')
const auth = require('./components/auth/network')

const routes = app => {
    app.use('/users', users)
    app.use('/auth', auth)
}

module.exports = routes