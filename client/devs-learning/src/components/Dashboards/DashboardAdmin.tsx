import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const DashboardAdmin: React.FC = () => {
  return (
    <Grid container mt={40}>
      <Grid item border={1} xs={6} p={2}>
        <Typography variant="body1">TITULO</Typography>
      </Grid>
      <Grid item border={1} xs={6} p={2} display="flex" flexDirection="column" alignItems="center">
        <img
          width="50%"
          src="https://m.media-amazon.com/images/M/MV5BYmRhNzk2YWUtNWIxNC00YWM3LWI5ODEtN2IwOGQzYWEwMWJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg"
          alt="img"
        />
        <Button variant="contained" size="small">
          Cambiar foto de perfil
        </Button>
      </Grid>
      <Grid item border={1} xs={4} md={6} p={2}>
        <Box display="flex" flexDirection="column">
          <Box>
            <Typography variant="body1">Datos personales</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Datos personales</Typography>
            <Typography variant="body1">Datos personales</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item border={1} xs={4} md={6} lg={12} p={2}>
        <Typography variant="body1">TEXTO</Typography>
      </Grid>
      <Grid item border={1} xs={4} md={6} lg={12} p={2}>
        <Typography variant="body1">TEXTO</Typography>
      </Grid>
      <Grid item border={1} xs={4} md={6} lg={12} p={2}>
        <Typography variant="body1">TEXTO</Typography>
      </Grid>
      <Grid item border={1} xs={4} md={6} lg={12} p={2}>
        <Typography variant="body1">TEXTO</Typography>
      </Grid>
      <Grid item border={1} xs={4} md={6} lg={12} p={2}>
        <Typography variant="body1">TEXTO</Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardAdmin;
