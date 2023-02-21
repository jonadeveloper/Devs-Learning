import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CardComponent } from "../Cards/Card";
import { useAppSelector } from "../../hooks/hooksRedux";
import { CartCard } from "./CartCard";
import { setItem } from "../../utils/localStorage";
import MeliButton from "../meliButton/meliButton";

interface CartComponentProps {
  open: boolean;
  handleStateViewDrawer: () => void;
}

export interface Category {
  name: string;
}

export interface CoursoBack {
  categories: Category[];
  description: string;
  id: string;
  level: string;
  name: string;
  price: string;
  duration: string;
  instructor: string;
  descriptionComplete: string;
  img: string;
}

export const CartComponent: React.FC<CartComponentProps> = ({
  open,
  handleStateViewDrawer,
}) => {
  const { cart } = useAppSelector((state) => state.courses);

  React.useEffect(() => {
    setItem("cart", cart);
  }, [cart]);

  const totalPrecio = cart.reduce(
    (acumulado, curso) => acumulado + parseFloat(curso.price),
    0
  );

  return (
    <Drawer anchor={"right"} open={open}>
      <Box sx={{ width: "25em", p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Cart</Typography>
          <IconButton color="secondary" onClick={() => handleStateViewDrawer()}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {cart.length > 0
          ? cart.map((card, index) => (
              <CartCard key={index} card={card} index={index} />
            ))
          : "Nada por aqui"}
        <Box
          color="secondary"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography color="secondary" variant="h5">
            Total Price: {totalPrecio}
          </Typography>
          {cart.length > 0 ? <MeliButton /> : <div />}
        </Box>
      </Box>
    </Drawer>
  );
};
