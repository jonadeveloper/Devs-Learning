import { configureStore } from "@reduxjs/toolkit";
import { courses } from "./courses/slice";
import { userSign } from "./users/slice";
import { allUsers } from "./AllUsers/slice";
import { sales } from "./sales/slice";

export const store = configureStore({
  reducer: {
    courses: courses.reducer,
    users: userSign.reducer,
    allUsers: allUsers.reducer,
    sales: sales.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
