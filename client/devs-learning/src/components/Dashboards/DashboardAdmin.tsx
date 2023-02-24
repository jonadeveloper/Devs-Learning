import React from "react";
import { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { borderRadius } from "@mui/system";
import InfoPersonal from "./Admin/InfoPersonal";
import CoursesPanel from "./Admin/CoursesPanel";
import SalesPanel from "./Admin/SalesPanel";
import UsersPanel from "./Admin/UsersPanel";
import AccountSettings from "./Admin/AccountSettings";

const DashboardAdmin: React.FC = () => {
  const img: string =
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

  const [selectedIndex, setSelectedIndex] = React.useState(1);
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
      return <InfoPersonal />;
    } else if (content === 1) {
      return <CoursesPanel />;
    } else if (content === 2) {
      return <SalesPanel />;
    } else if (content === 3) {
      return <UsersPanel />;
    } else if (content === 4) {
      return <AccountSettings />;
    } else if (content === 5) {
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
            <Box
              mb={1}
              width="40%"
              sx={{ boxShadow: "5", borderRadius: "50%" }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton size="large">
                    <CameraAltIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <Avatar
                  alt="USER"
                  sx={{ width: "100%", height: "100%" }}
                  src={img}
                />{" "}
              </Badge>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              mb={6}
              mt={1}
              p={1}
              sx={{
                width: "80%",
                borderRadius: 2,
                borderRight: 0.5,
                borderLeft: 0.5,
                borderColor: "lightgrey",
              }}
            >
              <Typography color="inherit" bgcolor="whitesmoke" variant="h5">
                Admin
              </Typography>
            </Box>

            <Box sx={{ width: "100%", bgcolor: "whitesmoke" }}>
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
                  <ListItemText primary="Courses" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales" />
                </ListItemButton>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleListItemClick(event, 5)}
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

export default DashboardAdmin;
