import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../redux/users/actions";

export default function NameChange() {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [validName, setValidName] = useState(true);
  const regexWhite = new RegExp(/^\s+$/);
  const auth = getAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    if (regexWhite.test(displayName) || displayName.length < 6) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  };

  const handleChangeName = () => {
    changeProfile();
    setOpen(false);
    setDisplayName("");
  };

  const changeProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: displayName });
        await axios.put(`${REACT_APP_BASE_URL}/updateusername`, {
          id: user.uid,
          displayName: displayName,
        });
        Swal.fire("Fullname succesfully updated", "", "success");
        window.location.reload();
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
        Update Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your name</DialogContentText>
          <TextField
            name="fullname"
            value={displayName}
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!validName} onClick={handleChangeName}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
