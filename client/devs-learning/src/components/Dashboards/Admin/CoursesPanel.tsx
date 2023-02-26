import React from "react";
import { useEffect , useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { Modal , TextField , Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { getCourses } from "../../../redux/courses/actions";

const CoursesPanel: React.FC = () => {

  const { courses } = useAppSelector((state) => state.courses);
  console.log(courses)

  interface RowData{
    name: string,
    description: string,
    duration: string,
    level: string,
    price: string,
    instructor: string
  }
  const dispatch = useAppDispatch();

 const initialData : RowData[] = courses
//[{
//     name: "javascript",
//     description: "curso de javascript desde cero",
//     duration: "15",
//     level: "advanced",
//     price: "2500",
//     instructor: "Jonatan Villalva"
// }];


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
            <Button variant="contained" color={"inherit"} size={"small"} onClick={() => handleEdit(rowIndex)}>
              <EditIcon /> 
            </Button>
            <Button variant="contained" color={"error"} size={"small"} onClick={() => handleDelete(rowIndex)}>
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
  
  

  useEffect(() => {
    dispatch(getCourses())
  },[dispatch]);
  return (
    <Grid container xs={12}>
      <Box width="100%">
      <Typography textAlign={"center"} variant="h3">Courses</Typography>
      <Typography textAlign={"center"} variant="h6" m={3}>
        In this section we manage all the courses on the platform
      </Typography>
      </Box>
      <Button>crear nuevo curso</Button>
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