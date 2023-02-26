import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../redux/users/actions";
import { clearCart } from "../../redux/courses/actions";
import { useParams } from "react-router-dom";

export const SuccessPage = () => {
  const [paymentId, setPaymentId] = useState("")
  const { email } = useAppSelector((state) => state.users);
  const { cart } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  const clearCartDB = async () => {
    await axios.put(`${REACT_APP_BASE_URL}/updateCart`, {
      email: email,
      cart: cart,
      buy: true,
    });
    dispatch(clearCart());
  };

  useEffect(() => {
    clearCartDB();
  }, [email]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    let id = params.get('payment_id') // 123 
    if (id)
      setPaymentId(id)
  }, [])
  return (
    <Box
      sx={{
        height: "100vh",
        pt: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%", lg: "80%", xl: "70%" },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "auto",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <CheckCircleIcon
                sx={{
                  color: "#54d350",
                  fontSize: 90,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#54d350",
                  textAlign: "center",
                }}
              >
                Payment Successful!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 550,
                  color: "#747474",
                }}
              >
                Transaction Number: {paymentId}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: 400,
                }}
              >
                <img
                  src={require("../../img/paymentSuccess.png")}
                  alt=""
                  style={{ height: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};
