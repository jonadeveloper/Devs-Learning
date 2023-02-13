import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursoBack } from "../../components/Cards/Card";
import { Category } from "../../interfaces/Category";

interface CoursesState {
  courses: CoursoBack[];
  coursesFiltered: CoursoBack[];
  categories: Category[];
  currentPage: number;
  currentCourse: CoursoBack;
  searched: string;
  status: string;
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
    duration: "",
    categories: [],
    instructor: "",
    descriptionComplete: "",
    img: "",
  },
  currentPage: 1,
  searched: "",
  status: "loading"
};

export const courses = createSlice({
  name: "courses",
  initialState, // defino initial state (state= initialState)
  reducers: {
    allCourses: (state, { payload }) => {
      state.courses = payload;
      state.coursesFiltered = payload;
      state.status = "confirmed";

    },
    allCategories: (state, { payload }) => {
      state.categories = payload;
      state.status = "confirmed";
    },
    setCurrent: (state, { payload }) => {
      state.status = "confirmed";
      state.currentCourse = payload;
    },
    currentCourse: (state, action: PayloadAction<CoursoBack>) => {
      state.currentCourse = action.payload;
      state.status = "confirmed";
    },
    searched: (state, { payload }) => {
      state.coursesFiltered = payload.allcourses;
      state.searched = payload.search;
    },
    setFiltered: (state, { payload }) => {
      state.coursesFiltered = payload;
    },
    setLoading: (state, { payload }) => {
      state.status = "loading";
    },
  },
});

export const reducer = courses.actions;
