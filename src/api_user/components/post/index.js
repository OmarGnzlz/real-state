const store = require('../../../store/remote-sql')
const controller = require('./controller')

module.exports = controller(store)