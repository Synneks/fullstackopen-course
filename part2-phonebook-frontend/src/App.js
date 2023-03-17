import { useState, useEffect } from "react";

import ContactList from "./components/ContactList";
import PhonebookForm from "./components/PhonebookForm";
import Search from "./components/Search";
import Notification from "./components/Notification";
import contactsService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredList, setFilteredList] = useState(contacts);
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    contactsService
      .getAllContacts()
      .then((contactsInDb) => {
        setContacts(contactsInDb);
        setFilteredList(contactsInDb);
      })
      .catch((err) => {
        setNotificationMessage({
          message: "Could not load contacts",
          type: "error",
        });
        setTimeout(() => {
          setNotificationMessage({ message: "", type: "" });
        }, 5000);
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification error={notificationMessage} />
      <PhonebookForm
        contacts={contacts}
        setContacts={setContacts}
        setFilteredList={setFilteredList}
        setNotificationMessage={setNotificationMessage}
      />
      <h2>Contacts</h2>
      <Search contacts={contacts} setFilteredList={setFilteredList} />
      <ContactList
        contacts={contacts}
        setContacts={setContacts}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default App;
