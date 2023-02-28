import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import { getUsersInfo, BanUser, EditUser } from "../../../redux/AllUsers/actions";
// import Select from "@material-ui/core/Select";
// import { MenuItem } from "@material-ui/core";

const UsersPanel: React.FC = () => {
  const { users } = useAppSelector((state) => state.allUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsersInfo());
  }, []);
  // console.log(users);

  const [editedUserId, setEditedUserId] = useState<number | null>(null);
  const [editedRank, setEditedRank] = useState<string>("");

  const handleSave = (user: any) => {
    const data = {
      id: user,
      rank: editedRank,
    };
    if (editedUserId !== null) {
      // Send request to update user's rank
      console.log(`Saving rank "${editedRank}" for user with ID ${editedUserId}`);
      // TODO: Call server API to update the user's rank here
      console.log(data);

      dispatch(EditUser(data));
      setEditedUserId(null);
    }
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "fullname",
      label: "Full Name",
    },
    {
      name: "rank",
      label: "Rank",
      options: {
        customBodyRender: (value: string, tableMeta: any) => {
          const rowIndex = tableMeta.rowIndex;
          const user = tableMeta.currentTableData[rowIndex];

          if (rowIndex === editedUserId) {
            // Render text field for editing the rank
            return (
              <TextField
                value={editedRank}
                onChange={(e) => setEditedRank(e.target.value)}
                size="small"
                fullWidth
              />
            );
          } else {
            // Render plain text for the rank
            return value;
          }
        },
      },
    },
    {
      name: "email",
      label: "Email",
    },

    {
      name: "id",
      label: "ID",
    },
    {
      name: "banned",
      label: "BANNED",
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
          const userId = tableMeta.currentTableData[rowIndex].data[3];

          if (rowIndex === editedUserId) {
            // Render "Save" button when editing
            return (
              <Button variant="outlined" onClick={() => handleSave(userId)}>
                Save
              </Button>
            );
          } else {
            // Render "Edit" and "Delete" buttons when not editing
            return (
              <>
                <Button variant="outlined" onClick={() => setEditedUserId(rowIndex)}>
                  Edit
                </Button>
                <Button variant="outlined" onClick={() => handleDelete(rowIndex)}>
                  BAN
                </Button>
                <Button variant="outlined" onClick={() => handleDesBan(rowIndex)}>
                  DESBAN
                </Button>
              </>
            );
          }
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
    dispatch(BanUser(data, true));
  };

  const handleDesBan = (rowIndex: number) => {
    // Create a new array without the selected row
    const newData = [...users];
    const data = newData.splice(rowIndex, 1);
    console.log("🚀 ~ file: UsersPanel.tsx:92 ~ handleDelete ~ data:", data[0].id);
    dispatch(BanUser(data, false));
  };

  const handleEdit = (value: any) => {
    console.log(value);
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
