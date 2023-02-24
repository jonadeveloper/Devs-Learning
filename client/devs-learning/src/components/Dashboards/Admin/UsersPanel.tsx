import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
const UsersPanel: React.FC = () => {
  interface RowData {
    fullname: string;
    rank: string;
    email: string;
    phoneNumber: string;
    courses: string[];
  }

  const initialData: RowData[] = [
    {
      fullname: "Jonatan Villalva",
      rank: "student",
      email: "jvillalva.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Francisco Rivero",
      rank: "student",
      email: "fran.rivero99@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonathan Mir Kim",
      rank: "student",
      email: "jonathan.kim75.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Federico Almada ",
      rank: "student",
      email: "fede.55almada.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonatan Villalva",
      rank: "student",
      email: "jvillalva.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Francisco Rivero",
      rank: "student",
      email: "fran.rivero99@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonathan Mir Kim",
      rank: "student",
      email: "jonathan.kim75.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Federico Almada ",
      rank: "student",
      email: "fede.55almada.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonatan Villalva",
      rank: "student",
      email: "jvillalva.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Francisco Rivero",
      rank: "student",
      email: "fran.rivero99@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Jonathan Mir Kim",
      rank: "student",
      email: "jonathan.kim75.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
    {
      fullname: "Federico Almada ",
      rank: "student",
      email: "fede.55almada.sistemas@gmail.com",
      phoneNumber: "1112223334",
      courses: ["javascript ", "html ", "react "],
    },
  ];

  const columns: MUIDataTableColumn[] = [
    {
      name: "fullname",
      label: "Full Name",
    },
    {
      name: "rank",
      label: "Rank",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
    },
    {
      name: "courses",
      label: "Courses",
      options: {
        customBodyRender: (value: string[]) => {
          return value.join(", ");
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
    rowsPerPage: 5,
  };

  const [data, setData] = useState(initialData);
  // const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // const handleRowSelectionChange = (currentRowsSelected: number[]) => {
  //   setSelectedRows(currentRowsSelected);
  // };

  const handleDelete = (rowIndex: number) => {
    // Create a new array without the selected row
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const handleEdit = (rowIndex: number) => {
    // TODO: Implement edit functionality
  };

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
      <MUIDataTable title="Student List" data={data} columns={columns} options={options} />
    </Grid>
  );
};

export default UsersPanel;
