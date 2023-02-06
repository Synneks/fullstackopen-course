import { useState } from "react";
import Persons from "./components/Persons";
import { PhonebookForm } from "./components/PhonebookForm";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredList, setFilteredList] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookForm
        persons={persons}
        setPersons={setPersons}
        setFilteredList={setFilteredList}
      />
      <h2>Numbers</h2>
      <Search persons={persons} setFilteredList={setFilteredList} />
      <Persons filteredList={filteredList} />
    </div>
  );
};

export default App;
