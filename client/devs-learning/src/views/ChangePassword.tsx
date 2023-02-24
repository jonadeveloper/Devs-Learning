import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Box } from "@mui/material";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Swal from "sweetalert2";

export default function PasswordChange() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const regexWhite = new RegExp(/^\s+$/);
  const auth = getAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActualPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (
      e.target.value.length < 8 ||
      regexWhite.test(e.target.value) ||
      e.target.value === ""
    ) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    try {
      if (user) {
        setOpen(false);
        Swal.showLoading();
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword).then(() => {
          Swal.hideLoading();
          setPassword("");
          setNewPassword("");
          Swal.fire("Password updated", "", "success");
        });
      }
    } catch (error) {
      setOpen(false);
      Swal.hideLoading();
      Swal.fire(`${error}`, "Check the password", "error");
    }
  };

  return (
    <Box width="80%">
      <Button
        fullWidth
        variant="contained"
        sx={{
          textTransform: "none",
          fontSize: "16px",
        }}
        onClick={handleClickOpen}
      >
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert the current Password</DialogContentText>
          <TextField
            name="actualpassword"
            value={password}
            onChange={handleActualPass}
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Insert the New Password</DialogContentText>
          <TextField
            name="password"
            value={newPassword}
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!validPassword} onClick={handleChangePassword}>
            Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
