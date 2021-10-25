const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})


persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.random() * 5000
}

app.get('/api/persons', (req, resp) => {
    resp.json(persons)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        resp.json(person)
    } else {
        resp.status(404).end()
    }

})

app.delete('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    resp.status(204).end()
})

app.post('/api/persons', (req, resp) => {
    const body = req.body
    if (!body.name || !body.number) {
        return resp.status(400).json({
            error: "Name or Number missing"
        })
    }

    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
        return resp.status(422).json({
            error: "Name already exists"
        })
    }

    const person = {
        id: generateId(),
        ...body
    }
    persons = persons.concat(person)
    // console.log(persons)
    resp.json(person)
})

app.get('/info', (req, resp) => {
    resp.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p> 
    <p>${Date()}</p>
    </div>`)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})