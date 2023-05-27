const mongoose = require('mongoose');

const MONGO_DB_URL = String(process.env.MONGO_DB_URI);

console.log('connecting to', MONGO_DB_URL);

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  number: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle
    delete returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema);
