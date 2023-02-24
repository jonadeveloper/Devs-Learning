import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentCourse } from "../../redux/courses/actions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { setItem } from "../../utils/localStorage";
import { getCourses, addToCart } from "../../redux/courses/actions";
import { Button } from "@mui/material";
import axios from "axios";

const BACK = process.env.REACT_APP_BASE_URL;

export interface Course {
  categoria: number;
  nombre: string;
  image: string;
  summary: string;
  duration: number;
  precio: number;
  idProfesor: number;
  dificultad: string;
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
  rating: any;
}
interface Props {
  card: CoursoBack;
  index: number;
}

export const CardComponent = ({ card, index }: Props) => {
  const PATH: string = `/courseDetail/${card.id}`;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCurrent = () => {
    dispatch(setCurrentCourse(card));
    navigate(`${PATH}`);
  };

  const { email } = useAppSelector((state) => state.users);
  const { cart } = useAppSelector((state) => state.courses);

  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const handleAddToCart = () => {
    dispatch(addToCart(card));
  };

  useEffect(() => {
    setDisabledBtn(cart.some((item) => item.id === card.id));
    setItem("cart", cart);

    axios.put(`${BACK}/updateCart`, {
      email: email,
      cart: cart,
      buy: false,
    });
  }, [cart, card.id]);

  return (
    <Grid key={index} item xl={3} lg={4} sx={{ display: "flex" }}>
      <Card
        sx={{
          minHeight: 500,
          borderRadius: 2,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <CardActionArea sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
          {/* Course Name */}
          <CardMedia
            onClick={handleCurrent}
            component="img"
            height="200"
            alt="Course Name"
            image={card.img}
          />
          <CardContent sx={{ justifySelf: "flex-start" }}>
            <Box onClick={handleCurrent}>
              {/* Course Title */}
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ fontSize: 30, fontWeight: 700 }}
              >
                {card.name} {index}
              </Typography>
              {/* Course Price */}
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ fontSize: 25, fontWeight: 700 }}
              >
                ${card.price}
              </Typography>
              {/* Category */}
              <Box my={2}>
                <Stack spacing={1}>
                  {card.categories.map((cat: any, catIndex: number) => {
                    return (
                      <Link key={catIndex} to={`/categories/${cat.name}`}>
                        <Chip
                          label={cat.name}
                          sx={{ backgroundColor: "greenyellow" }}
                          onClick={() => {
                            console.log(
                              `Redireccionando a la categoria ${cat.name}`
                            );
                          }}
                        />
                      </Link>
                    );
                  })}
                </Stack>
              </Box>
              {/* Course sumary */}
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ display: "flex", fontWeight: "600", gap: 1 }}>
                Duration:{" "}
                <span style={{ color: "grey" }}> {card.duration} hours</span>
              </Typography>

              <Typography sx={{ display: "flex", fontWeight: "600", gap: 1 }}>
                Difficulty:{" "}
                <span style={{ color: "grey" }}>
                  {" "}
                  {card.level.toUpperCase()}
                </span>
              </Typography>
            </Box>
            <Button
              size="medium"
              color="secondary"
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={disabledBtn}
            >
              <Typography variant="button" p={0.5}>
                Add to Cart
              </Typography>
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
