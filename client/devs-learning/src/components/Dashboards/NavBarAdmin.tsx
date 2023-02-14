import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";
import { AppBar , Box , Toolbar} from "@mui/material"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button } from "@mui/material";
import '@fontsource/roboto/500.css';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const Admin: React.FC = () => {
  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="body1">Hola mundo</Typography>
            </Toolbar>
        </AppBar>
        <Grid container mt={10} display={"flex"} flexDirection={"column"}>
            <Grid item border={1} xs={2} p={2}>
                <Box display={"flex"} flexDirection={"column"}> 
                        <Typography variant="body1">Dashboard</Typography>
                        <Typography variant="body1">Users</Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
  );
};


export default Admin;