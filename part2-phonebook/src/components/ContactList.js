import React from "react";
import contactsService from "../services/contacts";

const ContactList = ({
  filteredList,
  setFilteredList,
  contacts,
  setContacts,
}) => {
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
      .catch(() => alert(`Something went wrong when deleting ${contactName}`));
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
