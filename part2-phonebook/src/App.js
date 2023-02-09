import { useState, useEffect } from "react";
import axios from "redaxios";
import ContactList from "./components/ContactList";
import { PhonebookForm } from "./components/PhonebookForm";
import Search from "./components/Search";

export const BASE_URL = "http://localhost:3001/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredList, setFilteredList] = useState(contacts);

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setContacts(res.data);
      setFilteredList(res.data);
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
      <ContactList filteredList={filteredList} />
    </div>
  );
};

export default App;
