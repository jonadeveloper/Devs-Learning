import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";

import { Box , Grid , Typography , Button  } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DashboardAdmin: React.FC = () => {
  return (
    <Grid container mt={9} xs={12}>
      <Grid item xs={ 2 } sx= {{backgroundColor : 'primary.main'}} p={2} height="100vh">
        <Box display="flex" justifyContent="center">
        <AdminPanelSettingsIcon />
        <Typography variant="body1" textAlign={"center"}>Admin</Typography>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Grid item xs={12} border={1} height="10vh">

        </Grid>
        <Grid container display="flex" justifyContent={"space-around"}>

          <Grid item xs={3.3} border={1} m={3} height="35vh">

          </Grid>

          <Grid item xs={3.3} border={1} m={3} height="35vh">

          </Grid>

          <Grid item xs={3.3} border={1} m={3} height="35vh">

          </Grid>

        
        </Grid>
      </Grid>

    </Grid>
  );
};

export default DashboardAdmin;
