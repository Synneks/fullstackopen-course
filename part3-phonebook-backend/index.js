const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const customRequestLogger = function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    JSON.stringify(req.body),
  ].join(' - ');
};

app.use(cors());
app.use(express.json());
app.use(morgan(customRequestLogger));
app.use(express.static('build'));

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

function generateId() {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
  return maxId + 1;
}

app.get('/', (request, response) => {
  response.send('<h1>Phone book app server</h1>');
});

app.get('/api/contacts', (request, response) => {
  response.json(phonebook);
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      phonebook.length
    } people</p><p>${new Date()}</p>`
  );
});

app.get('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  const searchedContact = phonebook.find((contact) => contact.id === id);
  if (!searchedContact) {
    response.status(404);
  }
  response.json(searchedContact);
});

app.delete('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((contact) => contact.id !== id);
  response.json(phonebook);
});

app.post('/api/contacts', (request, response) => {
  const body = request.body;
  if (!body.number || !body.name) {
    response.status(406).json({ error: 'Name and number are mandatory' });
  }

  const existingContact = phonebook.find(
    (contact) => contact.name === body.name
  );
  if (existingContact) {
    response.status(400).json({ error: 'Name already exists' });
  }
  const newContact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  phonebook.push(newContact);
  response.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Phonebook app server running on ${PORT}`));
