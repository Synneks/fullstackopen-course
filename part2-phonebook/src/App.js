import { useState, useEffect } from "react";
import axios from "redaxios";
import Persons from "./components/Persons";
import { PhonebookForm } from "./components/PhonebookForm";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredList, setFilteredList] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
      setFilteredList(res.data);
    });
  }, []);

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
