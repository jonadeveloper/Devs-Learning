import React, { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          type="text"
          value={search}
          onChange={(event) => handleChange(event)}
        />

        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
}
