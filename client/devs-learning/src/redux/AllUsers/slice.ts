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
      //.filter((user: any) => !user.banned)
    },
    BanUsers: (state, { payload }) => {
      state.users = state.users.map((user) => {
        return  user.id === payload.id ? { ...user, banned: payload.banned } : user;
      });
    },
    
    DesBanUsers: (state, { payload }) => {
      state.users = state.users.map((user) => {
        return  user.id === payload.id ? { ...user, banned: payload.banned } : user;
      });

    },
    
    UpdateAllUsers: (state, { payload }) => {
      state.users = state.users.map((user) => {
        return  user.id === payload.id ? { ...user, rank: payload.rank } : user;
      });
    }

    }
  },
);

export const reducer = allUsers.actions;
