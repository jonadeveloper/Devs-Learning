import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UserPersonalInfo from "./UserPersonalInfo";

const UserDashboard: React.FC = () => {
  const img: string =
    "https://www.eluniverso.com/resizer/uEs8MTOMrNBA_E259XK6PXgb74o=/773x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/RHCBXZMR3RB7JBZXNGE6YDB7PY.jpg";

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [content, setContent] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setContent(index);
    console.log(content);
  };

  return (
    <Grid container bgcolor="lightgrey" spacing={2}>
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
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
          >
            <Box mb={1} width="80%">
              <Stack direction="row" spacing={2} justifyContent="center">
                <Avatar
                  alt="ALF"
                  sx={{ width: "50%", height: "50%" }}
                  src={img}
                />
              </Stack>
            </Box>
            <Box justifyContent="center" mb={8}>
              <Typography
                gutterBottom
                color="inherit"
                bgcolor="whitesmoke"
                variant="h4"
              >
                Alf
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
          bgcolor="whitesmoke"
          borderRadius={5}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="top"
        >
          {content === 0 ? (
            <UserPersonalInfo />
          ) : (
            <div>El estado es {content}</div>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
