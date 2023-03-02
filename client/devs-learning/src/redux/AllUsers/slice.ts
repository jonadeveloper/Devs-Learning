import { createSlice } from "@reduxjs/toolkit";
import {
  CreateUserInterface,
  AllUsers,
} from "../../interfaces/CreateUserInterface";

const initialState: AllUsers = {
  users: [],
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
      const { id } = payload[0];

      if (payload.siono) {
        state.users = state.users.map((user) => {
          return user.id === id ? { ...user, banned: true } : user;
        });
      } else {
        state.users = state.users.map((user) => {
          return user.id === id ? { ...user, banned: false } : user;
        });
      }
    },

    // DesBanUsers: (state, { payload }) => {
    //   const { id } = payload[0];
    //   // console.log("🚀 ~ file: slice.ts:27 ~ id:", id)
    //   state.users = state.users.map((user) => {
    //     // console.log("🚀 ~ file: slice.ts:31 ~ state.users=state.users.map ~ user:", user)
    //     return user.id === id ? { ...user, banned: false } : user;
    //   });

    // },

    UpdateAllUsers: (state, { payload }) => {
      state.users = state.users.map((user) => {
        return user.id === payload.id ? { ...user, rank: payload.rank } : user;
      });
    },
  },
});

export const reducer = allUsers.actions;
