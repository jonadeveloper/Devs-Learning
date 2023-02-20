import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
//import { Link as ReactLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
//import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable from "mui-datatables";
//import Avatar from "@mui/material/Avatar";
//import Stack from "@mui/material/Stack";

const CoursesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const columns : string[] = ["curso","precio","descipcion"];
  const data = [
    ["javascript","250","tatatata"],
    ["typescript","450","tatraraatata"],
    ["html y css","150","tataghjktata"],
    ["react","650","tatatatgjbhba"]
  ];

  //const { courses } = useAppSelector((state) => state.courses);
  //console.log(courses)
  const options = {filterTypes: "checkbox"};
  useEffect(() => {});
  return (
    <Grid container xs={12}>
      <Box width="100%">
      <Typography textAlign={"center"} variant="h3">Courses</Typography>
      <Typography textAlign={"center"} variant="h6" mt={3}>
        In this section we manage all the courses on the platform
      </Typography>
      </Box>
      <MUIDataTable
      title={"nombre"}
      data={data}
      columns={columns}
      options={options}
       />
    </Grid>
  );
};

export default CoursesPanel;
