import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable from "mui-datatables";

const CoursesPanel: React.FC = () => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      name: "name",
      label: "Name"
    },
    {
      name: "description",
      label: "Description"
    },
    {
      name: "duration",
      label: "Duration"
    },
    {
      name: "level",
      label: "Level"
    },
    {
      name: "price",
      label: "Price"
    },
    {
      name: "instructor",
      label: "Instructor"
    }
  ];

  const options:any = {
    filterType: "dropdown",
    selectableRows: false,
    responsive: "scroll",
    resizableColumns: true
  }
  

  const { courses } = useAppSelector((state) => state.courses);
  console.log(courses)
  useEffect(() => {});
  return (
    <Grid container xs={12}>
      <Box width="100%">
      <Typography textAlign={"center"} variant="h3">Courses</Typography>
      <Typography textAlign={"center"} variant="h6" m={3}>
        In this section we manage all the courses on the platform
      </Typography>
      </Box>
      <MUIDataTable
      title={"list of platform courses"}
      data={courses}
      columns={columns}
      options={options}      
       />
    </Grid>
  );
};

export default CoursesPanel;
