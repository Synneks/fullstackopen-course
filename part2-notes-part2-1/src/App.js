import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
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
