const logger = require('./logger')

const requresLogger = (req, resp, next) => {
    logger.info('Method: ', req.method)
    logger.info('path: ', req.path)
    logger.info('body: ', req.body)
    logger.info('-----------------')
    next()
}

const unknownEndpoint = (req, resp) => {
    resp.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, req, resp, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        resp.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        resp.status(404).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requresLogger,
    unknownEndpoint,
    errorHandler,
}