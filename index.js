require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})


const generateId = () => {
    return Math.random() * 5000
}

app.get('/api/persons', (req, resp) => {
    Person.find({}).then(persons => {
        resp.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, resp, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person)
                resp.json(person.toJSON())
            else
                resp.status(404).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, resp, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            resp.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, resp, next) => {
    const body = req.body
    if (!body.name || !body.number) {
        return resp.status(400).json({
            error: "Name or Number missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(result => result.toJSON())
        .then(savedPerson => {
            resp.json(savedPerson)
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (req, resp, next) => {
    const body = req.body
    if (!body.name || !body.number) {
        return resp.status(400).json({
            error: "Name or Number missing"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            if (updatedPerson)
                resp.json(updatedPerson.toJSON())
            else
                res.status(404).end()
        }).catch(error => next(error))
})


app.get('/info', (req, resp) => {
    Person.find({}).then(result => {
        resp.send(`<div>
        <p>Phonebook has info for ${result.length} people</p> 
        <p>${Date()}</p>
        </div>`)
    })
})

const unknownEndPoint = (req, resp) => {
    resp.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, req, resp, next) => {
    console.error(error)
    if (error.name === 'CastError') {
        return resp.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return resp.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})