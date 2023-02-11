import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { getCourses, setFiltered } from "../../redux/courses/actions";

export default function () {
  const [order, setOrder] = useState("");

  const dispatch = useAppDispatch();
  const { courses, coursesFiltered, searched } = useAppSelector(
    (state) => state.courses
  );

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  const handleClick = () => {
    dispatch(getCourses());
    setOrder("");
  };

  useEffect(() => {
    dispatch(setFiltered(order, courses, coursesFiltered, searched));
  }, [order, searched]);

  return (
    <div className="filter">
      <Box>
        <FormControl>
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            sx={{ minWidth: 120 }}
            labelId="order-label"
            label="Order"
            value={order}
            onChange={handleChange}
          >
            <MenuItem value={"A-Z"}>A-Z</MenuItem>
            <MenuItem value={"Z-A"}>Z-A</MenuItem>
            <MenuItem value={"- Price"}>- Price</MenuItem>
            <MenuItem value={"+ Price"}>+ Price</MenuItem>
            <MenuItem value={"- Duration"}>- Duration</MenuItem>
            <MenuItem value={"+ Duration"}>+ Duration</MenuItem>
          </Select>

          <Button variant="outlined" onClick={handleClick}>
            Refresh
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
