import React from "react";
import { Box, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CardComponent } from "../Cards/Card";
import { useAppSelector } from "../../hooks/hooksRedux";
import { CartCard } from "./CartCard";
interface CartComponentProps {
  open: boolean;
  handleStateViewDrawer: () => void;
}

export const CartComponent: React.FC<CartComponentProps> = ({ open, handleStateViewDrawer }) => {
  const { cart } = useAppSelector((state) => state.courses);

  return (
    <Drawer anchor={"right"} open={open}>
      <Box sx={{ width: "25em", p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Cart</Typography>
          <IconButton color="secondary" onClick={() => handleStateViewDrawer()}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {cart.length > 0
          ? cart.map((card, index) => <CartCard key={index} card={card} index={index} />)
          : "Nada por aqui"}
      </Box>
    </Drawer>
  );
};
