import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import { courses } from "./courses/slice";
import { userSign } from "./users/slice";

export const store = configureStore({
  reducer: {
    courses: courses.reducer,
    users: userSign.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
