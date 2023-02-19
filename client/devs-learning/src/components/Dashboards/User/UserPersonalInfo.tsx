import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  userEmail,
  userFullname,
  userLastLogin,
  userPhoneNumber,
} from "../../../router/index";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";

const UserPersonalInfo: React.FC = () => {
  return (
    <Grid
      sx={{
        width: "100%",
        display: "grid",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Typography textAlign="center" color="silver" variant="h5">
          Profile
        </Typography>
        <Button variant="text" color="success">
          Edit Profile
        </Button>
      </Container>
      <Divider></Divider>
      <List>
        <ListItem>
          <ListItemText primary="Fullname" secondary={userFullname} />
        </ListItem>
        <Divider></Divider>
        <ListItem>
          <ListItemText primary="Email" secondary={userEmail} />
        </ListItem>
        <Divider></Divider>
        <ListItem>
          <ListItemText
            primary="Phone number"
            secondary={userPhoneNumber || "Nothing for here"}
          />
        </ListItem>
        <Divider></Divider>
        <ListItem>
          <ListItemText primary="Account Type" secondary="Student" />
        </ListItem>
        <Divider></Divider>
        <ListItem>
          <ListItemText primary="Last Login" secondary={userLastLogin} />
        </ListItem>
      </List>
    </Grid>
  );
};

export default UserPersonalInfo;
