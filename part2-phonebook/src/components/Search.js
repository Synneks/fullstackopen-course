import React from "react";

const Search = ({ contacts, setFilteredList }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const contactsCopy = [
      ...contacts.filter(
        (contact) => contact.name.toLowerCase().indexOf(searchTerm) !== -1
      ),
    ];
    setFilteredList(contactsCopy);
  };
  return (
    <div>
      search: <input name="searchNumbers" onChange={handleSearch} />
    </div>
  );
};

export default Search;
