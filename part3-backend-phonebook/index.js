const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

function generateId() {
    const maxId =
        phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
    return maxId + 1;
}

app.get("/", (request, response) => {
    response.send("<h1>Phone book app server</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(phonebook);
});

app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${
            phonebook.length
        } people</p><p>${new Date()}</p>`
    );
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const searchedPerson = phonebook.find((person) => person.id === id);
    if (!searchedPerson) {
        response.status(404);
    }
    response.json(searchedPerson);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    phonebook = phonebook.filter((person) => person.id !== id);
    response.json(phonebook);
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    if (!body.number || !body.name) {
        response.status(406).json({ warning: "Name and number are mandatory" });
    }
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };
    phonebook.push(newPerson);
    response.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Phonebook app server running on ${PORT}`));
