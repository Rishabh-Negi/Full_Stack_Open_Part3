const notesRouter = require('express').Router()
const note = require('../models/notes')

notesRouter.get('/', async (req, resp) => {
    const notes = note.find({})
    console.log(notes)
    resp.json("")
})

notesRouter.get('/:id', async (req, resp) => {

})

notesRouter.delete('/:id', async (req, resp) => {
})

notesRouter.post('/', async (req, resp) => {
})

module.exports = notesRouter
