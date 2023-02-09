import { useState } from "react";

export const PhonebookForm = ({ contacts, setContacts, setFilteredList }) => {
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

    if (contacts.find((contact) => contact.name === newName)) {
      return alert(`${newName} has already been added`);
    }

    const newContact = {
      name: newName,
      number: newNumber,
      id: contacts.length + 1,
    };

    const newContacts = contacts.concat(newContact);
    setContacts(newContacts);
    setFilteredList(newContacts);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
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
      {newName && <p>Name is {newName}.</p>}
      {newNumber && <p>Number is {newNumber}.</p>}
    </div>
  );
};
