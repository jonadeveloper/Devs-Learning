import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material/";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { userData } from "../../redux/users/actions";
import { getAuth } from "firebase/auth";
import { setItem } from "../../utils/localStorage";
export var profileImg: string;
export var userFullname: string;
export var userEmail: string;
export var userPhoneNumber: string;
export var userLastLogin: any;

const LandingPage: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userByEmailInfo = userData?.user;
  const getUser = () => {
    localStorage.getItem("loggedUserInfo");
  };
  useEffect(() => {
    getUser();
  }, []);

  if (user?.providerId === "firebase") {
    profileImg = user.photoURL!;
    userFullname = user.displayName!;
    userEmail = user.email!;
    userPhoneNumber = user.phoneNumber!;
    userLastLogin = user.metadata.lastSignInTime!;
    setItem("loggedUserInfo", user);
  } else {
    let time = Number(userByEmailInfo?.lastLoginAt);
    profileImg = userByEmailInfo?.photoURL;
    userFullname = userByEmailInfo?.displayName;
    userEmail = userByEmailInfo?.email;
    userPhoneNumber = userByEmailInfo?.phoneNumber;
    userLastLogin = new Date(time).toDateString();
    setItem("loggedUserInfo", userByEmailInfo);
  }
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
            <NavLink to="/courses">
              <Fab size="medium" variant="extended" color="inherit">
                <Typography variant="button" p={2}>
                  Ver cursos
                </Typography>
                <KeyboardArrowRightRoundedIcon />
              </Fab>
            </NavLink>
          </Box>
        </Box>
      </Grid>

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
