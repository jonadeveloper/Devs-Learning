import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { loginUser } from "../../redux/users/actions";
import devsLogo from "../../img/devslearn.jpg";
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userState = useAppSelector((state) => state);
  const [input, setInput] = useState(userState.users);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.email.length < 6) {
      alert("Please complete email");
    } else if (input.password.length < 8) {
      alert("Please complete the password");
    } else {
      dispatch(loginUser({ ...input }));
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const regexWhite = new RegExp(/^\s+$/);

  function validateEmail() {
    if (regexWhite.test(input.email) || input.email.length < 8) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }

  function validatePassword() {
    if (
      input.password.length < 8 ||
      regexWhite.test(input.password) ||
      input.password === ""
    ) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100%",
        minWidth: "100vw",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#14213d",
      }}
      mt={3}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        borderRadius="20px"
        sx={{
          display: "grid",
          backgroundColor: "white",
          minHeight: "70vh",
          height: "100%",
          width: "50%",
        }}
      >
        <Grid
          display="grid"
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            placeItems: "center",
          }}
        >
          <Avatar
            src={devsLogo}
            alt="Devs Logo"
            sx={{ width: 96, height: 96 }}
          />
          <Typography variant="h5">Sign In to DevsLearning</Typography>
          <Box
            sx={{ mt: "10px" }}
            component="form"
            display="flex"
            flexDirection="column"
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ m: "5px 0" }}
              error={!validEmail}
              helperText={!validEmail && "Please enter a valid email"}
              type="email"
              label="Email Adress"
              size="small"
              name="email"
              required
              onChange={handleChange}
              onBlur={validateEmail}
              value={input.email}
              placeholder="Email..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={!validPassword}
              helperText={
                !validPassword && "Password minimum length 8 characters"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              sx={{ m: "10px 0" }}
              label="Password"
              size="small"
              required
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={validatePassword}
              value={input.password}
              placeholder="Password..."
            />
            <Button
              type="submit"
              color="success"
              variant="contained"
              size="medium"
              disabled={!validPassword || !validEmail}
            >
              Login
            </Button>
            <Button
              onClick={handleClick}
              color="secondary"
              variant="outlined"
              sx={{ mt: "8px" }}
            >
              Back
            </Button>
          </Box>

          <Typography sx={{ mt: "5px" }}>
            <Link href="/">Forgot your password?</Link>
          </Typography>
          <Typography sx={{ mt: "5px" }}>
            <Link href="/signup">New user? Create an account</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
