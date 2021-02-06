const errorHandler = (message, code) => {
    let error = new Error (message)

    if (code){
        error.statusCode = code
    }

    return error
}

module.exports = errorHandler