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
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import EmailChange from "../../../views/ChangeEmail";
import NameChange from "../../../views/ChangeName";
import PhoneChange from "../../../views/ChangePhoneNumber";

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
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Typography color="silver" variant="h5">
          Profile
        </Typography>
        <Typography color="silver" variant="h5">
          Edit Profile
        </Typography>
      </Container>
      <Divider></Divider>
      <List>
        <ListItem>
          <ListItemText primary="Fullname" secondary={userFullname} />
          <NameChange />
        </ListItem>
        <Divider></Divider>
        <ListItem>
          <ListItemText primary="Email" secondary={userEmail} />
          <EmailChange />
        </ListItem>
        <Divider></Divider>
        <ListItem>
          <ListItemText
            primary="Phone number"
            secondary={userPhoneNumber || "Nothing for here"}
          />
          <PhoneChange />
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
