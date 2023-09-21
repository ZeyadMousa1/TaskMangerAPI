class ApiCustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new ApiCustomError(message, statusCode)
}

module.exports = {
    ApiCustomError,
    createCustomError
}