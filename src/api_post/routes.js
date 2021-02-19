const post = require('./componets/post/network')

const routes = app => {
    app.use('/post', post)
}

module.exports = routes