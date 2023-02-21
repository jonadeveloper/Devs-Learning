import React, { useState } from "react";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";

const UserAccountSettings: React.FC = () => {
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography textAlign="center" variant="h4">
          Manage your Account
        </Typography>
        <Typography textAlign="center" variant="subtitle2">
          Modify or add information about you
        </Typography>
      </Container>
      <Divider></Divider>
      <Grid sx={{ display: "grid" }}>
        <Button variant="contained" color="error">
          Change Password
        </Button>
        <Divider></Divider>
        <Button variant="contained" color="warning">
          Become a Teacher
        </Button>
        <Divider></Divider>
        <Button
          variant="outlined"
          color="error"
          sx={{ width: "fit-content", fontWeight: "bold" }}
        >
          Delete Account
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserAccountSettings;
