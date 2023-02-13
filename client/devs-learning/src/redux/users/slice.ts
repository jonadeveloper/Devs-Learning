import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";

const initialState: CreateUserInterface = {
  fullname: "",
  password: "",
  rpassword: "",
  email: "",
  rank: 2,
  profileImg: "",
};

export const userSign = createSlice({
  name: "users",
  initialState,
  reducers: {
    signUp: (state, { payload }) => {},
    signIn: (state, { payload }) => {},
  },
});

export const reducer = userSign.actions;
