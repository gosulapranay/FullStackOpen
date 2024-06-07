require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const Person = require("./models/person");
const morgan = require("morgan");
morgan.token("body", (req) =>
  Object.values(req.body)[0] ? JSON.stringify(req.body) : null
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  let time = new Date();
  time = time.toString();
  response.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>    
    </div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((persons) => response.json(persons));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  const person = new Person({ name, number });
  person.save().then((savedPerson) => response.json(savedPerson));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
