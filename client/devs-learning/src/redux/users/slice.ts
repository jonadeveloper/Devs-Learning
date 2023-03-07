import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";

const initialState: CreateUserInterface = {
  fullname: "",
  password: "",
  rpassword: "",
  email: "",
  rank: "student",
  profileImg: "",
  status: "notLogged",
  courses: [],
};

export const userSign = createSlice({
  name: "users",
  initialState,
  reducers: {
    signUp: (state, { payload }) => {},
    signIn: (state, { payload }) => {
      state.status = "logged";
      state.fullname = payload.fullname;
      state.rank = payload.rank;
    },
    getUser: (state, { payload }) => {
      state.status = payload;
    },
    changeEmail: (state) => {},
    changePass: (state) => {},
    recover: (state) => {},
    logOut: (state) => {
      state.fullname = "";
      state.password = "";
      state.rpassword = "";
      state.email = "";
      state.rank = "student";
      state.profileImg = "";
      state.status = "notLogged";
      state.courses = [];
    },

    setFullName: (state, { payload }) => {
      state.fullname = payload.name;
      state.email = payload.email;
    },
    setBoughtCourses: (state, { payload }) => {
      state.courses = payload;
    },

    getAdmin: (state, { payload }) => {
      state.rank = payload;
    },
  },
});

export const reducer = userSign.actions;
