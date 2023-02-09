import React from "react";

const ContactList = ({ filteredList }) => {
  return (
    <div>
      <ul>
        {filteredList.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
