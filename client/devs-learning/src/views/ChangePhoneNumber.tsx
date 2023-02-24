import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  getAuth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
} from "firebase/auth";

export default function PhoneChange() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [validPhone, setValidPhone] = useState(true);

  const auth = getAuth();

  function validatePhoneNumber() {
    if (phone === "") {
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

  const handleSendCode = async () => {
    try {
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phone,
        recaptchaVerifier
      );
      setVerificationId(verificationId);
      Swal.fire("Phone number succesfully updated", "", "success");
      window.location.reload();
    } catch (error) {
      Swal.fire(`${error} Insert a valid phone number`, "", "error");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await updatePhoneNumber(auth.currentUser!, credential);
      Swal.fire(`Update Phone Number succesfully`, "", "success");
      setOpen(false);
    } catch (error) {
      Swal.fire(`${error} Cannot update, try again`, "", "error");
      setOpen(false);
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
            sx={{ textAlign: "center" }}
            onBlur={validatePhoneNumber}
            name="phone"
            value={phone}
            onChange={handleChange}
            autoFocus
            margin="dense"
            label="Insert your Phone number"
            type="tel"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!validPhone}
            onClick={handleSendCode}
          >
            Send Code
          </Button>
          <div id="recaptcha-container"></div>
          <TextField
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification code"
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleVerifyCode}
          >
            Verify Code
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
