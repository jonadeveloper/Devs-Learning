import React from "react";
import { useEffect , useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { TextField , Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { getCourses , DeletedCourse } from "../../../redux/courses/actions";


const CoursesPanel: React.FC = () => {
  const { courses } = useAppSelector((state) => state.courses);
  console.log(courses)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses())
  },[]);


  // interface RowData{
  //   id: string,
  //   name: string,
  //   description: string,
  //   duration: string,
  //   level: string,
  //   price: string,
  //   instructor: string
  // }
  


const columns: MUIDataTableColumn[] = [
  {
    name: "id",
    label: "ID"
  },
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
  },
  {
    name: "delete",
    label: "Delete",
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
        return (
          <>
            <Button variant="outlined" >
                  Edit
            </Button>
            <Button variant="outlined" onClick={()=>{handleDelete(rowIndex)}}>
                  Delete
            </Button>
            <Button variant="outlined" >
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
    rowsPerPage: 10,
  };

  const handleDelete = (rowIndex: number) => {
    // Create a new array without the selected row
    const newData = [...courses];
    const data = newData.splice(rowIndex, 1);
    console.log("~ handleDelete ~ data:", data[0].id);
    dispatch(DeletedCourse(data));
  };


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