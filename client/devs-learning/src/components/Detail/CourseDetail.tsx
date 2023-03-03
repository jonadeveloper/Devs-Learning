import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";
import axios from "axios";
import "./CourseDetail.css";

//MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button, css, ListItemAvatar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import WifiIcon from "@mui/icons-material/Wifi";
import ComputerIcon from "@mui/icons-material/Computer";

import { useParams } from "react-router-dom";
import {
  getCourses,
  setCurrentCourse,
  addToCart,
} from "../../redux/courses/actions";
import { setItem } from "../../utils/localStorage";
import { CoursoBack } from "../Cards/Card";
const { REACT_APP_PROD_URL, REACT_APP_BASE_URL } = process.env;
const BACK = REACT_APP_BASE_URL || REACT_APP_PROD_URL;

interface UserParams {
  id: string;
  [key: string]: string;
}

const ListStyle = {
  width: "100%",
  bgcolor: "whitesmoke",
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<Record<string, string>>();

  //Mantener info al recargar página
  const InfoKeeper = async () => {
    const MyCourseInfo = await axios
      .get(`${BACK}/courses?id=${id}`)
      .then((response) => response.data[0]);

    const NewName =
      MyCourseInfo.name[0].toUpperCase() + MyCourseInfo.name.substring(1);

    const InfoToKeep: CoursoBack = {
      categories: MyCourseInfo.categories,
      description: MyCourseInfo.description,
      descriptionComplete: MyCourseInfo.descriptionComplete,
      duration: MyCourseInfo.duration,
      id: MyCourseInfo.id,
      img: MyCourseInfo.img,
      instructor: MyCourseInfo.instructor,
      level: MyCourseInfo.level,
      name: NewName.replaceAll("-", " "),
      price: MyCourseInfo.price,
      rating: MyCourseInfo.rating,
      deleted: MyCourseInfo.deleted,
    };

    dispatch(setCurrentCourse(InfoToKeep));
    return InfoToKeep;
  };

  const dispatch = useAppDispatch();

  const TheCourse = useAppSelector((state) => state.courses.currentCourse);
  const { coursesFiltered } = useAppSelector((state) => state.courses);
  const [disabledBtn, setDisabledBtn] = React.useState<boolean>(false);

  const handleAddToCart = () => {
    dispatch(addToCart(TheCourse));
  };

  const { email } = useAppSelector((state) => state.users);
  const { courses } = useAppSelector((state) => state.users);
  const { status } = useAppSelector((state) => state.users);
  const { cart, currentCourse } = useAppSelector((state) => state.courses);

  React.useEffect(() => {
    let disabled = false;

    if (courses) {
      if (
        cart.some((item) => item.id === currentCourse.id) ||
        courses.some((item) => item.name === currentCourse.name)
      )
        disabled = true;
    } else {
      if (cart.some((item) => item.id === currentCourse.id)) disabled = true;
    }

    setDisabledBtn(disabled);

    setItem("cart", cart);

    axios.put(`${BACK}/updateCart`, {
      email: email,
      cart: cart,
      buy: false,
    });
  }, [cart, id, status]);

  useEffect(() => {
    InfoKeeper();
  }, [coursesFiltered]);

  const handleCategorieClick = () => {};

  const getRatingAVG = () => {
    function calcularPromedio(numeros: number[]): number {
      const suma = numeros.reduce((a, b) => a + b, 0);
      const promedio = suma / numeros.length;
      return Number(promedio.toFixed(1));
    }
    const ratings = TheCourse.rating.map((rat: any) => {
      return rat.rating;
    });
    if (ratings.length > 0) {
      const average = calcularPromedio(ratings);

      return average;
    } else {
      return 0;
    }
  };

  const AverageRating = getRatingAVG();

  return (
    <div>
      <Grid container bgcolor="whitesmoke" direction="row" mt={10} spacing="10">
        <Grid item xs={12} ml={1}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/courses">
              Courses
            </Link>
            <Typography color="text.primary">{TheCourse.name}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          lg={9}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box ml={1}>
            <Stack direction="row" spacing={1}>
              {TheCourse.categories.map((cat: any) => {
                return (
                  <ReactLink to={`/categories/${cat.name}`}>
                    <Chip
                      label={cat.name}
                      sx={{ backgroundColor: "greenyellow" }}
                      onClick={handleCategorieClick}
                    />
                  </ReactLink>
                );
              })}
            </Stack>
          </Box>
          <Typography ml={1} gutterBottom variant="h2">
            {" "}
            {TheCourse.name}{" "}
          </Typography>
          <Typography ml={1} variant="subtitle1">
            Teached by {TheCourse.instructor}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          lg={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box display="flex" justifyContent="space-around" margin={1}>
            <Typography variant="h5">Get it for only</Typography>
          </Box>
          <Box display="flex" justifyContent="space-around" margin={1}>
            <Typography variant="h4" p={2}>
              {" "}
              $ {TheCourse.price} ARS{" "}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-around">
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
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={9} p={1}>
          <Box
            boxShadow={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            ml={1}
          >
            <img src={TheCourse.img} alt="CourseIMG" width="48%" />
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={3} display="flex" flexDirection="column">
          <List sx={ListStyle} component="nav" aria-label="mailbox folders">
            <Divider />
            <ListItem button>
              <ListItemText secondary={`Duration: ${TheCourse.duration} hs.`} />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText secondary={`Level: ${TheCourse.level}`} />
            </ListItem>{" "}
            <Divider />
            <ListItem button divider>
              <Rating name="read-only" value={AverageRating} readOnly />
              <Box ml={1}>
                <ListItemText
                  secondary={
                    AverageRating !== 0 ? AverageRating : "No rating yet"
                  }
                />
              </Box>
            </ListItem>
            <List>
              <ListItemText>Requirements</ListItemText>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WifiIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Internet Conection"
                  secondary="You should have access to a PC with internet conection to use the material of the course"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ComputerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Tech Requirements"
                  secondary="Windows 7 or superior, GNU/Linux (Ubuntu, Debian...) or Mac OS X"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Minimum knowledge"
                  secondary="You should understand the basics concepts of Algebra in order to work with algorithms."
                />
              </ListItem>
            </List>
            <Divider light />
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9} p={1} mb={4}>
          <Box boxShadow={2} ml={1} p={3}>
            <Typography variant="body1">
              {" "}
              {TheCourse.descriptionComplete}{" "}
            </Typography>
          </Box>

          <Box
            display="flex"
            p={1}
            m={1}
            mt={2}
            borderTop={0.5}
            borderColor="lightgray"
          >
            {" "}
            <Box borderRight={1} borderColor="lightgray" px={2} mr={1}>
              <Typography variant="overline">Comments...</Typography>
            </Box>
            {TheCourse.rating.map((rat: any) => {
              return (
                <Box
                  key={rat.user}
                  p={1}
                  m={1}
                  border={1}
                  borderColor="lightgray"
                  borderRadius={4}
                  bgcolor="white"
                >
                  <ListItemText secondary={rat.comment} />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor="whitesmoke"
        py={1}
      >
        <Button startIcon={<ArrowBackIcon />} variant="outlined">
          <Typography variant="h6" noWrap component="a" href="/courses">
            Go Back
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default CourseDetail;
