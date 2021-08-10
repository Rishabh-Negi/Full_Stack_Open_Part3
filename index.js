const express = require('express')

const app = express()

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

app.get('/api/persons', (req, resp) => {
    resp.json(persons)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        resp.json(person)
    } else {
        resp.status(404).send()
    }

})

app.get('/info', (req, resp) => {
    resp.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p> 
    <p>${Date()}</p>
    </div>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})