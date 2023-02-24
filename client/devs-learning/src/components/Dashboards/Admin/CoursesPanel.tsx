import React from "react";
import { useEffect , useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { getCourses } from "../../../redux/courses/actions";

const CoursesPanel: React.FC = () => {

  const { courses } = useAppSelector((state) => state.courses);

  interface RowData{
    name: string,
    description: string,
    duration: string,
    level: string,
    price: string,
    instructor: string
  }
  //const dispatch = useAppDispatch();

const initialData : RowData []= 

[{
    "name":"Analysis and design with SQL server 2019",
    "level": "intermediate",
    "description":"Master complex SQL queries and boost your DBA profile. Develop programs from scratch applying the most advanced Transact-SQL features.",
    "duration":"20",
    "instructor":"Simon Navarrete",
    "price":"2900"
}]
;


const columns: MUIDataTableColumn[] = [
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
    name: "action",
    label: "Action",
    options: {
      customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
        const rowIndex = tableMeta.rowIndex;
        return (
          <>
            <Button variant="outlined" onClick={() => handleEdit(rowIndex)}>
              <EditIcon />
            </Button>
            <Button variant="outlined" onClick={() => handleDelete(rowIndex)}>
              <DeleteIcon />
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

  const [data, setData] = useState(initialData);

  const handleDelete = (rowIndex: number) => {
    // Create a new array without the selected row
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const handleEdit = (rowIndex: number) => {
    // TODO: Implement edit functionality
  };
  
  

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
      data={data}
      columns={columns}
      options={options}      
       />
    </Grid>
  );
};

export default CoursesPanel;