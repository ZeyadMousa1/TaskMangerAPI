const { ApiCustomError } = require('../errors/custom-error')

const errorHandlerMiddelware = (err, req, res, next) => {
    if (err instanceof ApiCustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddelware