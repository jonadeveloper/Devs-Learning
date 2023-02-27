import { createSlice } from "@reduxjs/toolkit";
import { CreateUserInterface, AllUsers } from '../../interfaces/CreateUserInterface';

const initialState: AllUsers = {
  users: []
};

export const allUsers = createSlice({
  name: "allUsers",
  initialState,
  reducers: {

    setAllUsers: (state, { payload }) => {
      state.users = payload;
    }
  },
});

export const reducer = allUsers.actions;
