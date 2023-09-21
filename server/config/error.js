export const customError = (status, message) => {
    const error = new Error()
    err.status = status
    err.message = message
    return error
}