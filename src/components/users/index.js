const store = require('../../store/mysql')
const controller = require('../users/controller')

module.exports = controller(store)