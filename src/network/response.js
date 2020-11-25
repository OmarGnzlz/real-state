exports.success = (req, res, message, status ) => {
    let statusRes = status || 200
    let messageRes = message || ""

    res.status(statusRes).send({
        status,
        body: messageRes
    })
}
exports.error = (req, res, message, status ) => {
    let statusRes = status || 500
    let messageRes = message || "Internal Error"

    res.status(statusRes).send({
        status,
        body: messageRes
    })
}

