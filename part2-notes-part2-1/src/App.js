import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const addToPhonebook = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} has already been added`);
    }
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addToPhonebook}>
        <div>
          name:{" "}
          <input name="nameInput" value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
      {newName !== "" && <p>Name is {newName}.</p>}
    </div>
  );
};

export default App;
