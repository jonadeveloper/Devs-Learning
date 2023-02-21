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

export default function NameChange() {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [validName, setValidName] = useState(true);
  const regexWhite = new RegExp(/^\s+$/);
  const auth = getAuth();
  function validateProfile() {
    if (regexWhite.test(displayName) || displayName.length < 6) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleChangeEmail = () => {
    changeProfile();
    setOpen(false);
    setDisplayName("");
  };

  const changeProfile = async () => {
    try {
      await updateProfile(auth.currentUser!, { displayName: displayName });
      Swal.fire("Fullname succesfully updated", "", "success");
      window.location.reload();
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
            onBlur={validateProfile}
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
          <Button disabled={!validName} onClick={handleChangeEmail}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
