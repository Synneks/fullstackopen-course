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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(customRequestLogger));

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

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.post('/api/contacts', (request, response, next) => {
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

      newContact
        .save()
        .then((result) => response.status(201).json(result))
        .catch((err) => next(err));
    }
  });
});

app.put('/api/contacts/:id', (request, response, next) => {
  const id = request.params.id;

  const newNumber = request.body.number;

  Contact.findByIdAndUpdate(
    id,
    { $set: { number: newNumber } },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedContact) => {
      if (!updatedContact) {
        response.status(404).json({ error: 'Contact not found' });
      } else {
        response.json(updatedContact);
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.deleteOne({ _id: request.params.id })
    .then((res) => {
      if (res.deletedCount) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Phonebook app server running on ${PORT}`));
