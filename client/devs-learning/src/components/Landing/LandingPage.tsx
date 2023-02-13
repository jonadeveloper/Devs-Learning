import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";

import { Typography, Link, Button } from "@mui/material/";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const LandingPage: React.FC = () => {
  /*     const AllCategories = useAppSelector((state)=> state.courses.categories);
    
    useEffect(()=> {
        console.log(AllCategories)
    }, []) */

  return (
    <Grid container direction="row" mt={3} bgcolor="#6DBAC6">
      <Grid
        item
        xs={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={20}
        >
          <Box display="flex">
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Devs Learning
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="overline">
              "Impulsa tu carrera en programación con nosotros."
            </Typography>
          </Box>
          <Box mt={3}>
            <Link href="/courses">
              <Fab size="medium" variant="extended" color="inherit">
                <Typography variant="button" p={2}>
                  Ver cursos
                </Typography>
                <KeyboardArrowRightRoundedIcon />
              </Fab>
            </Link>
          </Box>
        </Box>
      </Grid>

      {/* <Box> intenté que se rendericen las categorias pero me tira un error.
            {AllCategories.map((categorie) => {return <Typography key={categorie} variant="caption"> {categorie} | </Typography>})}
  </Box> */}

      <Grid
        item
        xs={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={2}
        >
          <img
            src="https://cdn.dribbble.com/users/638428/screenshots/3641004/code2.gif"
            alt="gif"
            width="100%"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
