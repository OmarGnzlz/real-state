const response = require('./response')

const errors = (error, req, res, next) => {
    
    const message = error.message || 'Internal error'
    const status =  error.statusCode || 505

    response.error(req, res, message, status)

}

module.exports = errors