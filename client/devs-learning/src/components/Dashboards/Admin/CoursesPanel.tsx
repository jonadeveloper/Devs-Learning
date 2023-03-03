import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from "mui-datatables";
import { getCourses, DeletedCourse } from "../../../redux/courses/actions";
import { NavLink, useNavigate } from "react-router-dom";

const CoursesPanel: React.FC = () => {
  const { courses } = useAppSelector((state) => state.courses);
  console.log(courses);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const columns: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "duration",
      label: "Duration",
    },
    {
      name: "level",
      label: "Level",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "instructor",
      label: "Instructor",
    },
    {
      name: "deleted",
      label: "Deleted",
      options: {
        customBodyRender: (value: boolean) => {
          return value ? "Yes" : "No";
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const rowIndex = tableMeta.rowIndex;
          const coursesId = tableMeta.currentTableData[rowIndex].data[0];
          return (
            <>
              <NavLink to={`/dashboard/edit/course/${coursesId}`}>
                <Button variant="outlined">Edit</Button>
              </NavLink>

              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleDelete(rowIndex);
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  handleRestore(rowIndex);
                }}
              >
                restore
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    selectableRows: "none",
    responsive: "standard",
    download: false,
    print: false,
    viewColumns: false,
    pagination: true,
    rowsPerPage: 5,
  };

  const handleDelete = (rowIndex: number) => {
    // Create a new array without the selected row
    const newData = [...courses];
    const data = newData.splice(rowIndex, 1);
    console.log(
      "🚀 ~ file: coursesPanel.tsx:92 ~ handleDelete ~ data:",
      data[0].id
    );
    const confirmed = window.confirm(
      "Are you sure you want to delete the course?"
    );
    if (confirmed) {
      dispatch(DeletedCourse(data, true));
    }
  };

  const handleRestore = (rowIndex: number) => {
    // Create a new array without the selected row
    const newData = [...courses];
    const data = newData.splice(rowIndex, 1);
    console.log(data[0].id);
    const confirmed = window.confirm(
      "Are you sure you want to restore the course?"
    );
    if (confirmed) {
      dispatch(DeletedCourse(data, false));
    }
  };

  return (
    <Grid container xs={12}>
      <Box
        width="100%"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography textAlign={"center"} variant="h3">
          Courses
        </Typography>
        <Typography textAlign={"center"} variant="h6" m={3}>
          In this section we manage all the courses on the platform
        </Typography>

        <NavLink to={`/dashboard/create/course`}>
          <Button variant="contained" sx={{ marginBottom: 2 }}>
            Create Course
          </Button>
        </NavLink>
      </Box>
      <Box sx={{ maxWidth: "100%" }}>
        <MUIDataTable
          title={"list of platform courses"}
          data={courses}
          columns={columns}
          options={options}
        />
      </Box>
    </Grid>
  );
};

export default CoursesPanel;
