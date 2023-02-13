import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch } from "../../hooks/hooksRedux";
import { removeToCart } from "../../redux/courses/actions";

interface CardHorizntalComponentProps {
  id: string | number;
  image: string;
  name: string;
  info: string;
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

interface Props {
  card: CoursoBack;
  index: number;
}

export const CartCard = ({ card, index }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemoveToCart = () => {
    dispatch(removeToCart(card));
  };
  return (
    <Card sx={{ display: "flex", my: 2 }}>
      <CardMedia component="img" sx={{ width: 151 }} image={card.img} alt="Rick and Morty" />
      <Grid container sx={{ mx: 1 }}>
        <Grid item xs={9}>
          <CardContent>
            <Typography variant="h4">{card.name}</Typography>
            <Divider />
            <Typography variant="h6">{card.description}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={2}>
          <CardActions>
            <IconButton onClick={handleRemoveToCart}>
              <CloseRoundedIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
