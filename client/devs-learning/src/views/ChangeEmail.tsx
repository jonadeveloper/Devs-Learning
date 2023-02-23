import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { getAuth, updateEmail } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../redux/users/actions";
export default function EmailChange() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const auth = getAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regexWhite = new RegExp(/^\s+$/);
    if (regexWhite.test(email) || email.length < 8) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const handleChangeEmail = () => {
    changeEmail();
    setOpen(false);
    setEmail("");
  };

  const changeEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateEmail(user, email);
        await axios.put(`${REACT_APP_BASE_URL}/updateemail`, {
          id: user.uid,
          email: email,
        });
        Swal.fire("Email update", "", "success");
      }
    } catch (error) {
      Swal.fire(`${error}`, "", "error");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          fontSize: "16px",
        }}
        onClick={handleClickOpen}
      >
        Change Email
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert the New Email</DialogContentText>
          <TextField
            name="email"
            value={email}
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="New Email"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!validEmail} onClick={handleChangeEmail}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
