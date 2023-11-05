require('dotenv').config();

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
const MONGO_DB_URI =
  ENV === 'test' ? process.env.MONGO_DB_URI_TEST : process.env.MONGO_DB_URI;

const SECRET = process.env.SECRET;

module.exports = {
  ENV,
  MONGO_DB_URI,
  PORT,
  SECRET,
};
