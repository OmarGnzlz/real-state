const remote = require('./remote')
const config = require('../config/index')

module.exports = new remote(config.mysql_api.host, config.mysql_api.port)