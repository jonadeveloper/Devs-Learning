import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "../hooks/hooksRedux";
import { useState } from "react";

export default function PasswordChange() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const regexWhite = new RegExp(/^\s+$/);

  function validatePassword() {
    if (password.length < 8 || regexWhite.test(password) || password === "") {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangePassword = () => {
    //dispatch(changePassword(password));
    setOpen(false);
    setPassword("");
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          textDecoration: "underline",
          fontSize: "16px",
        }}
        onClick={handleClickOpen}
      >
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert the New Password</DialogContentText>
          <TextField
            onFocus={validatePassword}
            name="password"
            value={password}
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
    </div>
  );
}
