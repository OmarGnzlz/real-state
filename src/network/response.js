exports.success = (req, res, message, status ) => {
    let statusCode = status || 200
    let messageRes = message || ""

    res.status(statusCode).send({
        status,
        body: messageRes
    })
}
exports.error = (req, res, message, status ) => {
    let statusCode = status || 500
    let messageRes = message || "Internal Error"

    res.status(statusCode).send({
        status,
        body: messageRes
    })
}

