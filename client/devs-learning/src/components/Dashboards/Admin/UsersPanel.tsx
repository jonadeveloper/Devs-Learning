import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { getUsersInfo, BanUser } from "../../../redux/AllUsers/actions";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

const UsersPanel: React.FC = () => {
  const { users } = useAppSelector((state) => state.allUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsersInfo());
  }, []);

  const [tableData, setTableData] = useState(["Admin"]);
  const columns: MUIDataTableColumn[] = [
    {
      name: "fullname",
      label: "Full Name",
    },
    {
      name: "rank",
      label: "Rank",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const handleChange = (event: { target: { value: any } }) => {
            setTableData(event.target.value);
          };
          return (
            <Select
              value={tableData}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              inputProps={{ style: { textAlign: "center" } }}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",
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
                Edit
              </Button>
              <Button variant="outlined" onClick={() => handleDelete(rowIndex)}>
                Delete
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
    const newData = [...users];
    const data = newData.splice(rowIndex, 1);
    console.log("🚀 ~ file: UsersPanel.tsx:92 ~ handleDelete ~ data:", data[0].id);
    dispatch(BanUser(data));
  };

  const handleEdit = (rowIndex: number) => {};

  return (
    <Grid container xs={12}>
      <Box width="100%">
        <Typography textAlign={"center"} variant="h3">
          Users
        </Typography>
        <Typography textAlign={"center"} variant="h6" m={3}>
          In this section we manage all the users on the platform
        </Typography>
      </Box>
      <MUIDataTable title="Student List" data={users} columns={columns} options={options} />
    </Grid>
  );
};

export default UsersPanel;

// interface RowData {
//   fullname: string;
//   rank: string;
//   email: string;
//   phoneNumber: string;
//   courses: string[];
// }

// const initialData: RowData[] = [
//   {
//     fullname: "Jonatan Villalva",
//     rank: "student",
//     email: "jvillalva.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Francisco Rivero",
//     rank: "student",
//     email: "fran.rivero99@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Jonathan Mir Kim",
//     rank: "student",
//     email: "jonathan.kim75.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Federico Almada ",
//     rank: "student",
//     email: "fede.55almada.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Jonatan Villalva",
//     rank: "student",
//     email: "jvillalva.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Francisco Rivero",
//     rank: "student",
//     email: "fran.rivero99@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Jonathan Mir Kim",
//     rank: "student",
//     email: "jonathan.kim75.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Federico Almada ",
//     rank: "student",
//     email: "fede.55almada.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Jonatan Villalva",
//     rank: "student",
//     email: "jvillalva.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Francisco Rivero",
//     rank: "student",
//     email: "fran.rivero99@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Jonathan Mir Kim",
//     rank: "student",
//     email: "jonathan.kim75.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
//   {
//     fullname: "Federico Almada ",
//     rank: "student",
//     email: "fede.55almada.sistemas@gmail.com",
//     phoneNumber: "1112223334",
//     courses: ["javascript ", "html ", "react "],
//   },
// ];
