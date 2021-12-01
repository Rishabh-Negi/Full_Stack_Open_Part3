const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
require('express-async-errors')

const app = express()

const cors = require('cors')
const notesRouter = require('./controller/notes')
const mongoose = require('mongoose')


logger.info(`connecting to`, config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to mongoDB')
    })
    .catch((error) => {
        logger.info('failed to connect to mongoDB', error.message)
    })

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(middleware.requresLogger)

app.use('/api/notes', notesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app