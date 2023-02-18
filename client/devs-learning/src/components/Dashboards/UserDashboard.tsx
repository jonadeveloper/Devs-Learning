import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UserPersonalInfo from "./User/UserPersonalInfo";
import UserCourses from "./User/UserCourses";
import UserAccountSettings from "./User/UserAccountSettings";
import { profileImg, userFullname } from "../Landing/LandingPage";

const UserDashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [content, setContent] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setContent(index);
  };

  const handlePageContent = (content: number) => {
    if (content === 0) {
      return <UserPersonalInfo />;
    } else if (content === 1) {
      return <UserCourses />;
    } else if (content === 2) {
      return <UserAccountSettings />;
    } else if (content === 3) {
      return <div>LogOut</div>;
    }
  };

  return (
    <Grid container bgcolor="#C5DCE4" spacing={2}>
      <Grid item xs={12} mt={10}></Grid>
      <Grid item xs={12} md={6} lg={4} xl={3} display="flex">
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="whitesmoke"
          borderRadius={5}
          p={2}
          m={2}
          mr={0.5}
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
          >
            <Avatar
              alt="Full name"
              sx={{ width: "96px", height: "96px" }}
              src={profileImg}
            />

            <Typography
              fontFamily="sans-serif"
              color="inherit"
              bgcolor="whitesmoke"
              variant="h4"
            >
              {userFullname}
            </Typography>

            <Box
              sx={{
                width: "100%",
                bgcolor: "whitesmoke",
              }}
            >
              <List component="nav" aria-label="main mailbox folders">
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Personal Info" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Courses" />
                </ListItemButton>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={8}
        xl={9}
        display="flex"
        flexDirection="column"
      >
        <Box
          height="100%"
          p={2}
          m={2}
          ml={0.5}
          bgcolor="whitesmoke"
          borderRadius={5}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="top"
        >
          {handlePageContent(content)}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
