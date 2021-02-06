const mysql = require('./network_sql')

const routes = app => {
    app.use('/mysql', mysql)

}
module.exports = routes