import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { AppBar , Box , Toolbar, Button, Typography} from "@mui/material"

import AirplayIcon from '@mui/icons-material/Airplay';
import PeopleIcon from '@mui/icons-material/People';
import SellIcon from '@mui/icons-material/Sell';
import DvrSharpIcon from '@mui/icons-material/DvrSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';



const Admin: React.FC = () => {
  return (
    <Box mt={15} pl={3}  display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"} >
      <Button
        startIcon={ <AirplayIcon style={{ fontSize: 30 }}/> }>  
        <Typography variant="h6" color="primary">Dashboard</Typography>
      </Button>
      <br></br><br></br>
      <Button
        startIcon={ <PeopleIcon style={{ fontSize: 30 }}/>}>  
        <Typography variant="h6" color="primary">Users</Typography>
      </Button>
      <br></br><br></br>
      <Button
        startIcon={ <SellIcon style={{ fontSize: 30 }}/>}>  
        <Typography variant="h6" color="primary">Sale</Typography>
      </Button>
      <br></br><br></br>
      <Button
        startIcon={ <DvrSharpIcon style={{ fontSize: 30 }}/>}>  
        <Typography variant="h6" color="primary">Courses</Typography>
      </Button>
      <br></br><br></br>
      <Button
        startIcon={ <EmailSharpIcon style={{ fontSize: 30 }}/>}>  
        <Typography variant="h6" color="primary">Messages</Typography>
      </Button>
      <br></br><br></br><br></br><br></br>
      <Button
      
      color="primary" variant="outlined" size="small"
        startIcon={ <LogoutSharpIcon style={{ fontSize: 30 }}/>}>  
        <Typography variant="h6" color="primary">Logout</Typography>
      </Button><br></br>
    </Box>
  );
};




export default Admin;