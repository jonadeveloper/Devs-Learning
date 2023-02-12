import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { getCourses, setFiltered } from "../../redux/courses/actions";
import SearchBar from "../searchbar/searchbar";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300,
    },
  },
};

export default function () {
  const [order, setOrder] = useState("");
  const [filterCategories, setFilterCategories] = useState("");
  const { name } = useParams();
  const [disabledFilter, setDisabledFilter] = useState(name ? true : false);

  const dispatch = useAppDispatch();
  const { courses, coursesFiltered, searched, categories } = useAppSelector(
    (state) => state.courses
  );

  const orderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };
  const categoryChange = (event: SelectChangeEvent) => {
    setFilterCategories(event.target.value);
  };

  const handleClick = () => {
    dispatch(getCourses());
    setOrder("");
    setFilterCategories("");
  };

  useEffect(() => {
    dispatch(
      setFiltered(order, courses, coursesFiltered, searched, filterCategories)
    );
  }, [order, searched, filterCategories]);

  return (
    <div className="filter">
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <FormControl>
            <InputLabel id="order-label">Order</InputLabel>
            <Select
              sx={{ minWidth: 120, marginRight: 10 }}
              labelId="order-label"
              label="Order"
              value={order}
              onChange={orderChange}
            >
              <MenuItem value={"A-Z"}>A-Z</MenuItem>
              <MenuItem value={"Z-A"}>Z-A</MenuItem>
              <MenuItem value={"- Price"}>- Price</MenuItem>
              <MenuItem value={"+ Price"}>+ Price</MenuItem>
              <MenuItem value={"- Duration"}>- Duration</MenuItem>
              <MenuItem value={"+ Duration"}>+ Duration</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <InputLabel id="category">Category</InputLabel>

            <Select
              sx={{ minWidth: 120 }}
              labelId="category"
              label="Category"
              value={filterCategories.toString()}
              onChange={categoryChange}
              MenuProps={MenuProps}
              disabled={disabledFilter}
            >
              {categories.map((category: any, index) => {
                return (
                  <MenuItem key={index} value={category.name}>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ marginLeft: { sm: 10 }, display: "flex" }}>
          <SearchBar />
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{ marginLeft: { xs: 2, sm: 10 }, minWidth: 120 }}
          >
            Refresh
          </Button>
        </Box>
      </Box>
    </div>
  );
}
