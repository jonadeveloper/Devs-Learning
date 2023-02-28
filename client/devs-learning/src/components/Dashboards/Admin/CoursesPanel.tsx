import React from "react";
import { useEffect , useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
//import { makeStyles } from "@mui/material/";
import { Modal , TextField , Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { getCourses , editCourseAction } from "../../../redux/courses/actions";


const CoursesPanel: React.FC = () => {
  const [modalInsertar,setModalInsertar] = useState(false);
  const { courses } = useAppSelector((state) => state.courses);
  console.log(courses)
  const abrirCerrarModalInsertar =()=>{
    setModalInsertar(modalInsertar);
  }


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
            <Button variant="contained" 
            color={"inherit"} 
            size={"small"} 
            onClick={() => handleEdit(rowIndex)}>
              <EditIcon /> 
            </Button>
            <Button variant="contained" 
            color={"error"} 
            size={"small"} 
            onClick={() => handleDelete(rowIndex)}>
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
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const handleEdit = (rowIndex: number) => {

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