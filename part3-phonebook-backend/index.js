require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Contact = require('./models/contact');

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

app.get('/', (request, response) => {
  response.send('<h1>Phone book app server</h1>');
});

app.get('/api/contacts', (request, response) => {
  Contact.find({}).then((contacts) => response.json(contacts));
});

app.get('/info', (request, response) => {
  Contact.countDocuments().then((amountOfContacts) => {
    response.send(
      `<p>Phonebook has info for ${amountOfContacts} people</p><p>${new Date()}</p>`
    );
  });
});

app.get('/api/contacts/:id', (request, response) => {
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact);
  });
});

app.post('/api/contacts', (request, response) => {
  const body = request.body;
  if (!body.number || !body.name) {
    response.status(406).json({ error: 'Name and number are mandatory' });
  }

  Contact.findOne({ name: body.name }).then(
    (contact) =>
      contact &&
      response
        .status(409)
        .json({ error: `Contact named ${contact.name} already exists` })
  );

  const newContact = new Contact({
    name: body.name,
    number: body.number,
  });
  newContact.save().then((contact) => {
    response.status(201).send(contact);
  });
});

app.delete('/api/contacts/:id', (request, response) => {
  Contact.deleteOne({ _id: request.params.id }).then(() =>
    response.status(204).end()
  );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Phonebook app server running on ${PORT}`));
