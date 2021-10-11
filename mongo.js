const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Insufficient arguments')
    process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'
const cluster = 'cluster0.9xkhx'

const url = `mongodb+srv://fullstack:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(e => {
            console.log(e)
        })
        mongoose.connection.close()
    })
} else {
    const _name = process.argv[3]
    const _number = process.argv[4]

    const person = new Person({
        name: _name,
        number: _number,
    })

    person.save().then(result => {
        console.log(`added ${_name} number ${_number} to phonebook`)
        mongoose.connection.close()
    })
}
