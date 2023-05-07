const mongoose = require('mongoose');

const MONGO_DB_URL = String(process.env.MONGO_DB_URI);

console.log('connecting to', MONGO_DB_URL);

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_DB_URL)
  .then((reulst) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
