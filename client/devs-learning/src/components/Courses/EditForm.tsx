import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import {
  createCourseAction,
  editCourseAction,
  getCoursesByName,
} from "../../redux/courses/actions";
import { CoursoBack } from "../Cards/Card";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const EditForm = () => {
  const { name } = useParams();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [categoriesSelect, setCategoriesSelect] = useState<string[]>([]);
  const [course, setCourse] = useState<CoursoBack>({
    name: "",
    price: "",
    duration: "",
    img: "",
    level: "",
    categories: [],
    description: "",
    descriptionComplete: "",
    instructor: "",
    id: "",
    rating: [],
  });
  const { categories, status, currentCourse } = useAppSelector(
    (state) => state.courses
  );
  useEffect(() => {
    if (name) {
      dispatch(getCoursesByName(name));
    }
  }, []);
  useEffect(() => {
    if (currentCourse.name === name) {
      setCourse({
        name: currentCourse.name,
        price: currentCourse.price,
        duration: currentCourse.duration,
        img: currentCourse.img,
        level: currentCourse.level,
        categories: currentCourse.categories,
        description: currentCourse.description,
        descriptionComplete: currentCourse.descriptionComplete,
        instructor: currentCourse.instructor,
        id: currentCourse.id,
        rating: [],
      });
      setCategoriesSelect(currentCourse.categories.map((item) => item.name));
    }
  }, [currentCourse]);
  if (course.name !== name) {
    return (
      <Box
        height={"100vh"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span className="loader"></span>
      </Box>
    );
  } else if (name) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCourse({ ...course, [name]: value });
    };
    const handleChangeSelect = (event: SelectChangeEvent) => {
      const { name, value } = event.target;
      setCourse({ ...course, [name]: value });
    };
    const handleChangeCategories = (
      event: SelectChangeEvent<typeof categoriesSelect>
    ) => {
      const {
        target: { value },
      } = event;
      setCategoriesSelect(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      dispatch(editCourseAction({ ...course, category: categoriesSelect }));
    };

    return (
      <Box
        mt={13}
        mb={5}
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Box
          component="form"
          sx={{
            background: "rgba(255, 255, 255, 0.81)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(9.8px)",
            WebkitBackdropFilter: "blur(9.8px)",
            minHeight: "550px",
            margin: "0 auto",
            width: { xl: "40%", md: "50%", sm: "80%", xs: "90%" },
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h2" fontSize={"2rem"} textAlign={"center"}>
            Edit Course
          </Typography>
          <Grid container spacing={4}>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                required
                label="Name"
                name="name"
                value={course.name}
                // onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                required
                label="Price"
                name="price"
                value={course.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                required
                label="Time duration"
                name="duration"
                value={course.duration}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                required
                label="Image url"
                name="img"
                value={course.img}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  required
                  name="level"
                  value={course.level}
                  label="Difficulty"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={"beginner"}>Beginner</MenuItem>
                  <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                  <MenuItem value={"advanced"}>Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={categoriesSelect}
                  onChange={handleChangeCategories}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Categories"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.name}
                      value={category.name}
                      style={getStyles(category.name, categoriesSelect, theme)}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                required
                label="Instructor"
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                required
                label="Short Description"
                name="description"
                onChange={handleChange}
                value={course.description}
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <TextField
                name="descriptionComplete"
                required
                label="Body"
                multiline
                rows={4}
                value={course.descriptionComplete}
                maxRows={10}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={status === "loading"}
          >
            Edit course
          </Button>
        </Box>
      </Box>
    );
  } else {
    return <Navigate to={"/"} />;
  }
};
