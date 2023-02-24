import {
  Button,
  Chip,
  Collapse,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import {
  clearSearch,
  getCourses,
  setFiltered,
} from "../../redux/courses/actions";
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
  const [checked, setChecked] = useState(false);

  const { name } = useParams();
  const [disabledFilter, setDisabledFilter] = useState(name ? true : false);

  const dispatch = useAppDispatch();
  const { courses, coursesFiltered, searched, categories } = useAppSelector(
    (state) => state.courses
  );

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const orderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };
  const categoryChange = (event: SelectChangeEvent) => {
    setFilterCategories(event.target.value);
  };

  const handleClick = () => {
    dispatch(getCourses());
    dispatch(clearSearch());
    setOrder("");
    setFilterCategories("");
  };

  useEffect(() => {
    if (courses.length > 1) {
      dispatch(
        setFiltered(order, courses, coursesFiltered, searched, filterCategories)
      );
    }
    if (searched === "not Found" && filterCategories !== "")
      setFilterCategories("");

    if (searched === "not Found") dispatch(clearSearch());
  }, [order, searched, filterCategories]);

  return (
    <Box>
      <Collapse in={checked}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: 2,
          }}
        >
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
              sx={{
                marginLeft: { xs: 2, sm: 10 },
                minWidth: 120,
                color: "gray",
              }}
            >
              <NavLink to="/courses">Refresh</NavLink>
            </Button>
          </Box>
        </Box>
      </Collapse>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
        <Button
          sx={{ color: "gray", marginTop: 2 }}
          variant="outlined"
          onClick={handleChange}
        >
          Filter
        </Button>
      </Box>

      {searched !== "" ? (
        <Chip
          sx={{ fontSize: { xs: 20, sm: 30 }, display: "flex", marginTop: 3 }}
          color="primary"
          label={`Results of ${searched}`}
        />
      ) : null}
    </Box>
  );
}
