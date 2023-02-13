import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursoBack } from "../../components/Cards/Card";
import { Category } from "../../interfaces/Category";
import { getItem } from '../../utils/localStorage';

interface CoursesState {
  courses: CoursoBack[];
  coursesFiltered: CoursoBack[];
  categories: Category[];
  currentPage: number;
  currentCourse: CoursoBack;
  searched: string;
  cart: CoursoBack[],
}
interface CartAddState {
  id: string | number;
  name: string;
  image: string;
  info: string;
}

interface CartRemoveState {
  id: string | number;
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
  cart: getItem('cart') || [],
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
      state.coursesFiltered = payload.allcourses;
      state.searched = payload.search;
    },
    setFiltered: (state, { payload }) => {
      state.coursesFiltered = payload;
    },
    addToCart: (state, action: PayloadAction<CoursoBack>) => {
      const { id } = action.payload;
      if (
        state.cart.length === 0 ||
        state.cart.filter((item) => item.id === id).length === 0
      ) {
        state.cart.push(action.payload);

      }
    },
    removeToCart: (state, action: PayloadAction<CoursoBack>) => {
      const { id } = action.payload;
      if (state.cart.some((item) => item.id === id)) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id)
        }
      } else {
        return state;
      }
    }
  },
});

export const reducer = courses.actions;
