import React from "react";

const Persons = ({ filteredList }) => {
  return (
    <div>
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
