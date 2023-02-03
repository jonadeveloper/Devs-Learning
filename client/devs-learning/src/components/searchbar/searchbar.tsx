import React, { useState, ChangeEvent } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearch("");
  };

  return (
    <div className="searchBar">
      searchbar
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) => handleChange(event)}
        />

        <input type="submit" />
      </form>
    </div>
  );
}
