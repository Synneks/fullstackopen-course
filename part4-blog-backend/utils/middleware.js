const jwt = require('jsonwebtoken');
const config = require('./config');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  request.token = token;
  next();
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  request.user = decodedToken ? decodedToken : null;
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
