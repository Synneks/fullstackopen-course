const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as an argument');
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://synneks:${password}@cluster0.3mzik.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 5) {
  const contactName = process.argv[3];
  const contactNumber = process.argv[4];

  const newContact = new Contact({
    name: contactName,
    number: contactNumber,
  });

  newContact.save().then((contact) => {
    console.log(`added ${contact.name} - ${contact.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then((contacts) => {
    contacts.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
}
