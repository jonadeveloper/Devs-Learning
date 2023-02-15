import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button } from "@mui/material";

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
        <Grid container display="flex" justifyContent={"flex-end"}>
        <Grid item xs={4} border={1} m={4} height="35vh">

        </Grid>

        <Grid item xs={4} border={1} m={4} height="35vh">

        </Grid>

        <Grid item xs={2} sx= {{backgroundColor : 'text.disabled'}} mt={4} p={2} height="100vh" >

        </Grid>
      </Grid>

      </Grid>
    </Grid>
  );
};

export default DashboardAdmin;
