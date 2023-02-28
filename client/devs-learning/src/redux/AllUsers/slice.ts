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
      state.users = payload.filter((user: any) => !user.banned);

    },
    BanUsers: (state, { payload }) => {
      state.users = state.users.filter((user) => !user.banned && user.id !== payload[0].id);

    }
  },
});

export const reducer = allUsers.actions;
