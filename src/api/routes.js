const users = require('../components/users/network')

const routes = app => {
    app.use('/users', users)
}

module.exports = routes