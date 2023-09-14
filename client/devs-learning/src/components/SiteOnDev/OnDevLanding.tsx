import React from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material/";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import DevGif from './Maintenance.gif'

const SiteOnDevelopment: React.FC = () => {
  return (
    <Grid container direction="row" mt={3} >"
    <Grid item display="flex" alignItems="center" justifyContent="space-around" width="100%">
    <Box sx={{display:{xs: "none", md: "flex"}}}>
    <Typography variant="h4"  sx={{
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>SITE ON MAINTENANCE</Typography>

    </Box>
    <Box sx={{width:{xs:"85%", md:"50%"}}}>
    <img
            src={DevGif}
            alt="gif"
            width="100%"
          />

    </Box>
    
    
    </Grid>
        
       
    </Grid>
  );
};

export default SiteOnDevelopment;
