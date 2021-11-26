const notesRouter = require('express').Router()
// const note = require('../models/notes')

notes = [
    {
        content: 'HTML is easy',
        important: false,
        _id: 221212,
        user: 123456,
    },
    {
        content: 'The most important operations of HTTP protocol are GET and POST',
        important: true,
        _id: 221255,
        user: 123456,
    },
    {
        content: 'A proper dinosaur codes with Java',
        important: false,
        _id: 221244,
        user: 141414,
    },
]

const generateId = () => {
    return Math.random() * 5000
}


notesRouter.get('/', (req, resp) => {
    resp.json(notes)
})

notesRouter.get('/:id', (req, resp) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        resp.json(note)
    } else {
        resp.status(404).end()
    }

})

notesRouter.delete('/:id', (req, resp) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    resp.status(204).end()
})

notesRouter.post('/', (req, resp) => {
    const body = req.body
    if (!body.name || !body.number) {
        return resp.status(400).json({
            error: "Name or Number missing"
        })
    }

    const nameExists = notes.some(note => note.name === body.name)
    if (nameExists) {
        return resp.status(422).json({
            error: "Name already exists"
        })
    }

    const note = {
        id: generateId(),
        ...body
    }
    notes = notes.concat(note)
    // console.log(notes)
    resp.json(note)
})

module.exports = notesRouter
