require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const Person = require('./models/person')

const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

const morgan = require('morgan')
morgan.token('body', (req) =>
  Object.values(req.body)[0] ? JSON.stringify(req.body) : null
)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.estimatedDocumentCount({})
    .then((count) => {
      const msg = `<div><p>Phonebook has info for ${count} people</p><p>${new Date().toString()}</p></div>`
      response.send(msg)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) =>
      person ? response.json(person) : response.status(404).end()
    )
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (!(name && number)) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }
  const person = new Person({ name, number })
  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  if (!(name && number))
    return response.status(400).json({
      error: 'Name or Number missing',
    })
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
