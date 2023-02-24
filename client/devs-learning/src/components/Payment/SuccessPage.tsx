import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import axios from "axios";

export const SuccessPage = () => {
  const { email } = useAppSelector((state) => state.users);
  const { cart } = useAppSelector((state) => state.courses);

  useEffect(() => {
    axios.put("/updateCart", {
      email: email,
      cart: cart,
      buy: true,
    });
  }, []);

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
                Transaction Number: 12345031
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
