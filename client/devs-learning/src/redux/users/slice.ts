import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";

const initialState: CreateUserInterface = {
  fullname: "",
  password: "",
  rpassword: "",
  email: "",
  rank: 2,
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
      state.status = payload;
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
      state.rank = 2;
      state.profileImg = "";
      state.status = "notLogged";
    },

    setFullName: (state, { payload }) => {
      state.fullname = payload.name;
      state.email = payload.email;
    },
    setBoughtCourses: (state, {payload}) => {
      state.courses = payload;
    }
  },
});

export const reducer = userSign.actions;
