exports.sucess = (req, res, data, message = null, statusCode = 200) => {
    res.status(statusCode).send({ errorCode: null, message, data });
}


exports.error = (req, res, message, statusCode = 500) => {
    res.status(500).send({ errorCode: statusCode, message, data: null })
}