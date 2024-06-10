const mongoose = require('mongoose')

if (
  process.argv.length < 3 ||
  (process.argv.length > 3 && process.argv.length < 5)
) {
  console.log('give password as argument')
  process.exit(1)
}

const { 2: password, 3: name, 4: number } = process.argv

const url = `mongodb+srv://admin:${password}@cluster0.dbnywux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((p) => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}
