import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "../../hooks/hooksRedux";
import { recoverPassword } from "../../redux/users/actions";
import { useState } from "react";
export default function FormDialog() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleReset = () => {
    dispatch(recoverPassword(email));
    setOpen(false);
    setEmail("");
  };

  return (
    <div>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
          textDecoration: "underline",
          fontSize: "16px",
        }}
        onClick={handleClickOpen}
      >
        Forgot your password?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Recover</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address here & we send a verification email.
          </DialogContentText>
          <TextField
            name="email"
            value={email}
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReset}>Recovery Password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
