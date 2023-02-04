import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredList, setFilteredList] = new useState(persons);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };
  const addToPhonebook = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) {
      !newName && setNewName("");
      !newNumber && setNewNumber("");
      return alert("Both fields are mandatory.");
    }
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} has already been added`);
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const personsCopy = [
      ...persons.filter(
        (person) => person.name.toLowerCase().indexOf(searchTerm) !== -1
      ),
    ];
    console.log(
      "🚀 ~ file: App.js:49 ~ handleSearch ~ personsCopy",
      personsCopy
    );
    setFilteredList(personsCopy);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addToPhonebook}>
        <div>
          name:{" "}
          <input name="nameInput" value={newName} onChange={handleNameInput} />
          <br />
          number:{" "}
          <input
            name="numberInput"
            value={newNumber}
            onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      search: <input name="searchNumbers" onChange={handleSearch} />
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
      {newName && <p>Name is {newName}.</p>}
      {newNumber && <p>Number is {newNumber}.</p>}
    </div>
  );
};

export default App;
