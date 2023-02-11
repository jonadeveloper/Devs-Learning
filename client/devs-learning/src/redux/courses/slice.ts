import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursoBack } from "../../components/Cards/Card";

interface CoursesState {
  courses: CoursoBack[];
  coursesFiltered: CoursoBack[];
  categories: Array<unknown>;
  currentPage: number;
  currentCourse: CoursoBack;
}

const initialState: CoursesState = {
  courses: [],
  coursesFiltered: [],
  categories: [],
  currentCourse: {
    description: "",
    id: "",
    level: "",
    name: "",
    price: "",
  },
  currentPage: 1,
};

export const courses = createSlice({
  name: "courses",
  initialState, // defino initial state (state= initialState)
  reducers: {
    allCourses: (state, { payload }) => {
      state.courses = payload;
      state.coursesFiltered = payload;

    },
    allCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setCurrent: (state, { payload }) => {
      state.currentCourse = payload;
    },
    currentCourse: (state, action: PayloadAction<CoursoBack>) => {
      state.currentCourse = action.payload;

    },
    searched: (state, { payload }) => {
      state.coursesFiltered = payload;
    },
  },
});

export const reducer = courses.actions;
