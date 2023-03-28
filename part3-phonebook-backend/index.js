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
  console.log('facem findul');
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
    response.status(400).json({ error: 'Name and number are mandatory' });
    return;
  }

  Contact.findOne({ name: body.name }).then((contact) => {
    if (contact) {
      response
        .status(409)
        .json({ error: `Contact named ${contact.name} already exists` });
    } else {
      const newContact = new Contact({
        name: body.name,
        number: body.number,
      });

      newContact.save().then((result) => response.status(201).json(result));
    }
  });
});

app.put('/api/contacts/:id', (request, response) => {
  const id = request.params.id;

  if (!request.body || !request.body.number) {
    response.status(400).json({ error: 'Invalid request body' });
    return;
  }

  const newNumber = request.body.number;

  Contact.findByIdAndUpdate(
    id,
    { $set: { number: newNumber } },
    { new: true }
  ).then((updatedContact) => {
    if (!updatedContact) {
      response.status(404).json({ error: 'Contact not found' });
    } else {
      response.json(updatedContact);
    }
  });
});

app.delete('/api/contacts/:id', (request, response) => {
  Contact.deleteOne({ _id: request.params.id }).then(() =>
    response.status(204).end()
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Phonebook app server running on ${PORT}`));
