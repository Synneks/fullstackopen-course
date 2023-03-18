import React from 'react';
import contactsService from '../services/contacts';

const ContactList = ({
  filteredList,
  setFilteredList,
  contacts,
  setContacts,
  setNotificationMessage,
}) => {
  const triggerNotification = (message, type) => {
    setNotificationMessage({
      message,
      type,
    });
    setTimeout(() => {
      setNotificationMessage({ message: '', type: '' });
    }, 5000);
  };

  const deleteContact = (e, contactId, contactName) => {
    e.preventDefault();
    if (!window.confirm(`You sure you wanna delete contact ${contactName}`)) {
      return;
    }
    contactsService
      .deleteContact(contactId)
      .then(() => {
        setContacts(contacts.filter((el) => el.id !== contactId));
        setFilteredList(filteredList.filter((el) => el.id !== contactId));
      })
      .catch(() => {
        triggerNotification(
          `Something went wrong when deleting ${contactName}!`,
          'error'
        );
      });
  };

  return (
    <div>
      <ul>
        {filteredList.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
            <button onClick={(e) => deleteContact(e, contact.id, contact.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
