import { useState } from "react";
import contactsService from "../services/contacts";

export const PhonebookForm = ({ contacts, setContacts, setFilteredList }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const updateProps = (updatedContacts) => {
    setContacts(updatedContacts);
    setFilteredList(updatedContacts);
    setNewName("");
    setNewNumber("");
  };

  const addToPhonebook = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      !newName && setNewName("");
      !newNumber && setNewNumber("");
      return alert("Both fields are mandatory.");
    }

    const foundUser = contacts.find((contact) => contact.name === newName);

    if (foundUser) {
      if (
        !window.confirm(
          `${newName} already exists in contact list. Do you want to update the number?`
        )
      ) {
        return;
      }
      const modifiedContact = { ...foundUser, number: newNumber };
      contactsService.updateContact(modifiedContact).then((updatedContact) => {
        const updatedContacts = contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
        updateProps(updatedContacts);
      });
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };

      contactsService.saveContact(newContact).then((savedContact) => {
        const updatedContacts = contacts.concat(savedContact);
        updateProps(updatedContacts);
      });
    }
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
