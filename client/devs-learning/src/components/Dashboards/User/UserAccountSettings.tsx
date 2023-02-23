import React from "react";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import PasswordChange from "../../../views/ChangePassword";
import { deleteUser, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/hooksRedux";
import { signOutAction } from "../../../redux/users/actions";

const UserAccountSettings: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it :(!",
        cancelButtonText: "Cancel",
      });

      if (user && confirmResult.isConfirmed) {
        Swal.showLoading();
        await deleteUser(user);
        Swal.hideLoading();
        Swal.fire("User succesfully deleted", "We go miss you :(", "success");
        dispatch(signOutAction());
      }
    } catch (error) {
      Swal.fire(`${error}`, "User dont exist", "error");
    }
  };

  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
        flexDirection: "column",
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

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="500" textAlign="center" variant="subtitle1">
          Change your Password
        </Typography>
        <PasswordChange />
        <Divider sx={{ margin: "10px", width: "100%" }}></Divider>
        <Typography textAlign="center" variant="subtitle1">
          Do you want Become a Teacher? Complete the form below
        </Typography>
        <Button sx={{ width: "80%" }} variant="contained" color="warning">
          Become a Teacher
        </Button>
        <Divider sx={{ margin: "10px", width: "100%" }}></Divider>
        <Typography fontWeight="500" textAlign="center" variant="subtitle1">
          If you dont want continue here, you can delete your account. Remember
          this action is irreversible and you lost all your courses.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          sx={{ fontWeight: "bold", width: "80%" }}
          onClick={handleDelete}
        >
          Delete Account
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserAccountSettings;
