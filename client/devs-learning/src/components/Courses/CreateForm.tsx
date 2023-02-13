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
import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { createCourseAction } from "../../redux/courses/actions";

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
export const CreateForm = () => {
  const theme = useTheme();
  const [course, setCourse] = useState({
    name: "",
    price: "",
    duration: "",
    img: "",
    level: "",
    category: [],
    description: "",
    descriptionComplete: "",
    instructor: "",
  });
  const [categoriesSelect, setCategoriesSelect] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector((state) => state.courses);

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
    dispatch(createCourseAction({ ...course, category: categoriesSelect }));
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
          Create Course
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
              label="Price"
              name="price"
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
                  <OutlinedInput id="select-multiple-chip" label="Categories" />
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
          <Grid item xs={12} sx={{ "& .MuiTextField-root": { width: "100%" } }}>
            <TextField
              required
              label="Instructor"
              name="instructor"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ "& .MuiTextField-root": { width: "100%" } }}>
            <TextField
              required
              label="Short Description"
              name="description"
              onChange={handleChange}
              value={course.description}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ "& .MuiTextField-root": { width: "100%" } }}>
            <TextField
              name="descriptionComplete"
              required
              label="Body"
              multiline
              rows={4}
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
          Create course
        </Button>
      </Box>
    </Box>
  );
};
