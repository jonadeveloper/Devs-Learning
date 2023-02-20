import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIDataTable from "mui-datatables";

const UsersPanel: React.FC = () => {
  const columns = [
    {
      name: "fullname",
      label: "Name"
    },
    {
      name: "rank",
      label: "Rol"
    },
    {
      name: "email",
      label: "Email"
    }
  ];

  // const { users } = useAppSelector((state) => state.users);
  // console.log(users)

  const data = [
    {fullname:"Jonatan Villalva", rank:"student",email:"jvillalva.sistemas@gmail.com"},
    {fullname:"Francisco Rivero", rank:"student",email:"fran.rivero99@gmail.com"},
    {fullname:"Jonathan Mir Kim", rank:"student",email:"jonathan.kim75.sistemas@gmail.com"},
    {fullname:"Federico Almada ", rank:"student",email:"fede.55almada.sistemas@gmail.com"}
  ]

  return (
    <Grid container xs={12}>
      <Box width="100%">
      <Typography textAlign={"center"} variant="h3">Users</Typography>
      <Typography textAlign={"center"} variant="h6" m={3}>
        In this section we manage all the users on the platform
      </Typography>
      </Box>
      <MUIDataTable
      title={"list of platform users"}
      // data={ users }
      data={data}
      columns={columns}      
       />
    </Grid>
  );
};

export default UsersPanel;