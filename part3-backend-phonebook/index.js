const { request } = require("express");
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

app.get("/", (request, response) => {
    response.send("<h1>Phone book app server</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Phonebook app server running on ${PORT}`));
