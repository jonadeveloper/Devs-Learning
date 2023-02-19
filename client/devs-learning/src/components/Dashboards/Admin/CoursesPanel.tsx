import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";
import { Table } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const CoursesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const column = [
    { 
      title:"Course",
      id: "id"
    },
    {
      title:"Category",
      id:"id"
    },
  ]
  useEffect(() => {});
  return (
    <Grid container xs={12}>
      <Box width="100%">
      <Typography textAlign={"center"} variant="h3">Courses</Typography>
      <Typography textAlign={"center"} variant="h6" mt={3}>
        In this section we manage all the courses on the platform
      </Typography>
      </Box>
    </Grid>
  );
};

export default CoursesPanel;
