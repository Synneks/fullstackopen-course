import { useState, useEffect } from "react";

import ContactList from "./components/ContactList";
import { PhonebookForm } from "./components/PhonebookForm";
import Search from "./components/Search";
import contactsService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredList, setFilteredList] = useState(contacts);

  useEffect(() => {
    contactsService.getAllContacts().then((contactsInDb) => {
      setContacts(contactsInDb);
      setFilteredList(contactsInDb);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookForm
        contacts={contacts}
        setContacts={setContacts}
        setFilteredList={setFilteredList}
      />
      <h2>Contacts</h2>
      <Search contacts={contacts} setFilteredList={setFilteredList} />
      <ContactList
        filteredList={filteredList}
        setFilteredList={setFilteredList}
      />
    </div>
  );
};

export default App;
