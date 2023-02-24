import React, { useState } from "react";
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
import { profileImg, userFullname } from "../../router/index";
import LogOut from "./User/Logout";
import CourseComment from "./User/UserComment";
import { Badge, Button, Input } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { CameraAltOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import UserAccountSettings from "./User/UserAccountSettings";

const UserDashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [content, setContent] = React.useState(0);
  const storage = getStorage();
  const auth = getAuth();
  const [photoURL, setPhotoURL] = useState(profileImg);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setContent(index);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files![0];
      Swal.showLoading();
      const imageRef = ref(storage, `profilePhotos/${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setPhotoURL(downloadURL);
      const user = auth.currentUser;
      if (user) {
        updateProfile(user, { photoURL: downloadURL }).then(() => {
          Swal.hideLoading();
          Swal.fire("Update photo successfully", "", "success");
        });
      }
    } catch (error) {
      Swal.fire(`${error}`, "Can't upload photo, try again", "error");
    }
  };

  const handlePageContent = (content: number) => {
    if (content === 0) {
      return <UserPersonalInfo />;
    } else if (content === 1) {
      return <UserCourses />;
    } else if (content === 2) {
      return <UserAccountSettings />;
    } else if (content === 3) {
      return <LogOut />;
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
            <Badge
              sx={{
                textAlign: "center",
                padding: "3%",
              }}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Button variant="text" component="label">
                  <Input
                    type="file"
                    hidden
                    sx={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <CameraAltOutlined />
                </Button>
              }
            >
              <Avatar
                alt="Full name"
                sx={{ width: "96px", height: "96px" }}
                src={photoURL}
              />
            </Badge>

            <Typography
              marginTop="15px"
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
