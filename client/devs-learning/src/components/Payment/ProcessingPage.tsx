import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../redux/users/actions";
import { clearCart } from "../../redux/courses/actions";
import { useNavigate } from "react-router-dom";

const BACK = process.env.REACT_APP_BASE_URL;

export const ProcessingPage = () => {
  const { email } = useAppSelector((state) => state.users);
  const { cart } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  const clearCartDB = async () => {
    await axios.post(`${BACK}/pay/email`, {
      cart: cart,
      email: email,
    });

    await axios.put(`${REACT_APP_BASE_URL}/updateCart`, {
      email: email,
      cart: cart,
      buy: true,
    });
    dispatch(clearCart());
  };

  const navigate = useNavigate();

  useEffect(() => {
    clearCartDB();

    setTimeout(() => {
      navigate("/payment/success", { replace: true });
    }, 5000);
  }, [email]);

  return (
    <Box
      sx={{
        height: "100vh",
        pt: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress color="success" size={100} />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#54d350",
          textAlign: "center",
          marginTop: 2,
        }}
      >
        Processing your payment
      </Typography>
    </Box>
  );
};
