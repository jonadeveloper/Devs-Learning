import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  getAuth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
} from "firebase/auth";
import Swal from "sweetalert2";

export default function PhoneChange() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [validPhone, setValidPhone] = useState(true);
  const auth = getAuth();

  function validatePhoneNumber() {
    if (phone === "" || phone.length < 10) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleChangePhone = () => {
    changePhoneNumber();
    setPhone("");
    setVerificationCode("");
  };

  const changePhoneNumber = async () => {
    try {
      const applicationVerifier = new RecaptchaVerifier(
        "update-phone",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log(phone);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
      console.log(phone);
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        `${phone}`,
        applicationVerifier
      );
      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      await updatePhoneNumber(auth.currentUser!, phoneCredential);
      Swal.fire("Phone Number succesfully updated", "", "success");
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
        Update Phone
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Phone</DialogTitle>

        <DialogContent>
          <DialogContentText>Update your phone number</DialogContentText>
          <TextField
            onBlur={validatePhoneNumber}
            name="phone"
            value={phone}
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="Update Phone"
            type="tel"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!validPhone}
            id="update-phone"
            onClick={changePhoneNumber}
          >
            Send Verification Message
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
