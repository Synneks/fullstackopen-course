import { useState } from 'react';
import contactsService from '../services/contacts';

const PhonebookForm = ({
  contacts,
  setContacts,
  setFilteredList,
  setNotificationMessage,
}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const triggerNotification = (message, type) => {
    setNotificationMessage({
      message,
      type,
    });
    setTimeout(() => {
      setNotificationMessage({ message: '', type: '' });
    }, 5000);
  };

  const updateProps = (updatedContacts) => {
    setContacts(updatedContacts);
    setFilteredList(updatedContacts);
    setNewName('');
    setNewNumber('');
  };

  const updateContact = (foundUser) => {
    const modifiedContact = { ...foundUser, number: newNumber };
    contactsService
      .updateContact(modifiedContact)
      .then((updatedContact) => {
        const updatedContacts = contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
        updateProps(updatedContacts);
        triggerNotification('Contact updated!', 'success');
      })
      .catch((err) => triggerNotification('Could not update contact', 'error'));
  };

  const saveContact = () => {
    const newContact = {
      name: newName,
      number: newNumber,
    };
    contactsService
      .saveContact(newContact)
      .then((savedContact) => {
        const updatedContacts = contacts.concat(savedContact);
        updateProps(updatedContacts);
        triggerNotification('Contact updated!', 'success');
      })
      .catch((err) => triggerNotification('Could not save contact', 'error'));
  };

  const addToPhonebook = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      !newName && setNewName('');
      !newNumber && setNewNumber('');
      triggerNotification('Both fields are mandatory!', 'error');
      return;
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
      updateContact(foundUser);
    } else {
      saveContact();
    }
  };

  return (
    <div>
      <form onSubmit={addToPhonebook}>
        <div>
          name:{' '}
          <input name="nameInput" value={newName} onChange={handleNameInput} />
          <br />
          number:{' '}
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

export default PhonebookForm;
