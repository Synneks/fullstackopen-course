import React from "react";

const Search = ({ persons, setFilteredList }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const personsCopy = [
      ...persons.filter(
        (person) => person.name.toLowerCase().indexOf(searchTerm) !== -1
      ),
    ];
    console.log(
      "🚀 ~ file: App.js:49 ~ handleSearch ~ personsCopy",
      personsCopy
    );
    setFilteredList(personsCopy);
  };
  return (
    <div>
      search: <input name="searchNumbers" onChange={handleSearch} />
    </div>
  );
};

export default Search;
