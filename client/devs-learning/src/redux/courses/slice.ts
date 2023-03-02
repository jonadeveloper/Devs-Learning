import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursoBack } from "../../components/Cards/Card";
import { Category } from "../../interfaces/Category";
import { getItem } from "../../utils/localStorage";

interface CoursesState {
  courses: CoursoBack[];
  coursesFiltered: CoursoBack[];
  categories: Category[];
  currentPage: number;
  currentCourse: CoursoBack;
  searched: string;

  cart: CoursoBack[];

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
    rating: [],
    deleted: false,
  },
  currentPage: 1,
  searched: "",

  cart: getItem("cart") || [],

  status: "loading",
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
          cart: state.cart.filter((item) => item.id !== id),
        };
      } else {
        return state;
      }
    },

    createCourse: (state) => {
      state.status = "confirmed";
    },
    setLoading: (state) => {
      state.status = "loading";
    },

    clearSearched: (state) => {
      state.searched = "";
    },
    addRating: (state, { payload }) => {
      state.currentCourse.rating = [
        state.currentCourse.rating.filter(
          (rat: any) => rat.user !== payload.user
        ),
        payload,
      ];
    },

    clearCart: (state) => {
      state.cart = [];
    },

    filterBoughtCart: (state, { payload }) => {
      state.cart = payload;
    },
    DeletedCourses: (state, { payload }) => {
      const { id } = payload[0];

      // console.log("🚀 ~ file: slice.ts:19 ~ id:", payload)

      if (payload.siono) {
        state.courses = state.courses.map((course) => {
          // console.log("🚀 ~ file: slice.ts:31 ~ state.courses=state.courses.map ~ course:", course)
          return course.id === id ? { ...course, deleted: true } : course;
        });
      } else {
        state.courses = state.courses.map((course) => {
          // console.log("🚀 ~ file: slice.ts:31 ~ state.courses=state.courses.map ~ course:", course)
          return course.id === id ? { ...course, deleted: false } : course;
        });
      }
    },
  },
});

export const reducer = courses.actions;
