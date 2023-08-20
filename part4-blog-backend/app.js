const express = require('express');
const cors = require('cors');
require('express-async-errors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs_api');
const usersRouter = require('./controllers/users_api');
const loginRouter = require('./controllers/login_api');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const app = express();

console.log(config.MONGO_DB_URI);

mongoose
  .connect(config.MONGO_DB_URI || '')
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
