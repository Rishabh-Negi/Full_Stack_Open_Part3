const notesRouter = require('express').Router()
const note = require('../models/notes')

notesRouter.get('/', async (req, resp, next) => {
    const notes = await note.find({})
    // console.log(notes)
    resp.json(notes)
})

notesRouter.get('/:id', async (req, resp, next) => {
    const notes = await note.findById(req.params.id)
    if (!notes) resp.status(404).end()
    resp.json(notes)
})

notesRouter.delete('/:id', async (req, resp, next) => {
})

notesRouter.post('/', async (req, resp, next) => {
    const body = req.body
    const newNote = new note(body)
    await newNote.save()
    resp.status(201).send()
})

module.exports = notesRouter
