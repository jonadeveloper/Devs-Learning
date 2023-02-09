import React, { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Zoom from "@mui/material/Zoom";

import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { searchCourses } from "../../redux/courses/actions";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);

  const checkClick = () => {
    if (search == "") {
      setChecked((prev) => !prev);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchCourses(courses, search));

    setSearch("");
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Zoom in={checked}>
            <TextField
              id="outlined-basic"
              label="Search..."
              variant="outlined"
              type="text"
              value={search}
              onChange={(event) => handleChange(event)}
            />
          </Zoom>

          <IconButton type="submit" onClick={checkClick}>
            <SearchIcon sx={{ display: "flex" }} />
          </IconButton>
        </Box>
      </form>
    </div>
  );
}
